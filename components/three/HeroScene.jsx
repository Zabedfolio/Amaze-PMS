"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CanvasErrorBoundary from "./CanvasErrorBoundary";

// ─── Deterministic seeded RNG (avoids re-render variance) ────────────────────
function seededRand(seed) {
  let s = seed >>> 0;
  return () => {
    s = Math.imul(s ^ (s >>> 15), s | 1);
    s ^= s + Math.imul(s ^ (s >>> 7), s | 61);
    return ((s ^ (s >>> 14)) >>> 0) / 0x100000000;
  };
}

// ─── Single Building — uses EdgesGeometry for crisp wireframe ────────────────
function Building({ x, z, w, d, h, color, opacity }) {
  const edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)),
    [w, h, d]
  );
  const fill = useMemo(() => new THREE.BoxGeometry(w, h, d), [w, h, d]);

  return (
    <group position={[x, h * 0.5, z]}>
      {/* Crisp edge lines */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={color} opacity={opacity} transparent />
      </lineSegments>
      {/* Very faint solid interior for depth */}
      <mesh geometry={fill}>
        <meshBasicMaterial color={color} opacity={0.018} transparent />
      </mesh>
    </group>
  );
}

// ─── Curved Roads — rings + radial arterials + organic cross-streets ───────────
function CurvedRoads() {
  // Build all THREE.Line objects once in useMemo
  const roads = useMemo(() => {
    const result = [];

    // Helper — create a THREE.Line from an array of THREE.Vector3
    const makeLine = (points, opacity, color = "#FF5004") => {
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      const mat  = new THREE.LineBasicMaterial({ color, opacity, transparent: true });
      return new THREE.Line(geom, mat);
    };

    // ── 1. Concentric ring boulevards ─────────────────────────────────────────
    // Three rings: CBD loop, midtown ring, outer beltway
    const rings = [
      { r: 3.0,  segments: 80, opacity: 0.50, color: "#FF5004" },
      { r: 6.8,  segments: 96, opacity: 0.32, color: "#FF6B2B" },
      { r: 11.4, segments: 112, opacity: 0.18, color: "#CC4400" },
    ];
    rings.forEach(({ r, segments, opacity, color }) => {
      const pts = [];
      for (let j = 0; j <= segments; j++) {
        const a = (j / segments) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * r, 0.015, Math.sin(a) * r));
      }
      result.push(makeLine(pts, opacity, color));
    });

    // ── 2. Curved radial arterials (S-curve from CBD ring to city edge) ────────
    const NUM_RADIALS = 10;
    for (let i = 0; i < NUM_RADIALS; i++) {
      const a = (i / NUM_RADIALS) * Math.PI * 2;
      const bendDir = i % 2 === 0 ? 1 : -1;   // alternate left/right sweep
      const bend = bendDir * 0.22;             // angular bend per control point

      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(Math.cos(a) * 3.0, 0.015, Math.sin(a) * 3.0),
        new THREE.Vector3(Math.cos(a + bend) * 5.5, 0.015, Math.sin(a + bend) * 5.5),
        new THREE.Vector3(Math.cos(a - bend * 0.6) * 9.0, 0.015, Math.sin(a - bend * 0.6) * 9.0),
        new THREE.Vector3(Math.cos(a) * 12.5, 0.015, Math.sin(a) * 12.5)
      );
      result.push(makeLine(curve.getPoints(56), 0.30, "#FF6B2B"));
    }

    // ── 3. Organic cross-city streets (CatmullRomCurve3) ──────────────────────
    // Each array is a list of [x, z] waypoints that snake through the grid
    const crossStreetWaypoints = [
      // East–West diagonals
      [[-12,-6],[-8,-3],[-3,-1],[2, 1],[7,-1],[12,-4]],
      [[-12, 4],[-7, 6],[-2, 3],[2, 5],[7, 2],[12, 6]],
      [[-11,-9],[-6,-5],[-1,-2],[3, 0],[8, 3],[12, 1]],
      // North–South diagonals
      [[-5,-12],[-3,-7],[-1,-2],[1, 3],[2, 8],[0,12]],
      [[ 5,-12],[ 6,-7],[ 4,-2],[3, 3],[4, 8],[5,12]],
      [[-8,-12],[-9,-7],[-6,-2],[-5, 4],[-7, 8],[-8,12]],
      // Inner swirl cross streets
      [[-6, 0],[-3, 2],[0, 1],[3,-1],[6, 0]],
      [[ 0,-6],[1,-3],[0, 0],[-1, 3],[0, 6]],
    ];

    crossStreetWaypoints.forEach((wps, idx) => {
      const curve = new THREE.CatmullRomCurve3(
        wps.map(([x, z]) => new THREE.Vector3(x, 0.015, z)),
        false, "catmullrom", 0.5
      );
      const opacity = idx < 3 ? 0.22 : idx < 6 ? 0.18 : 0.14;
      result.push(makeLine(curve.getPoints(52), opacity, "#CC4400"));
    });

    return result;
  }, []);

  return (
    <>
      {roads.map((lineObj, i) => (
        <primitive key={i} object={lineObj} />
      ))}
    </>
  );
}

// ─── City Grid — all buildings + road mesh ────────────────────────────────────
function CityGrid() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Smooth continuous Y-axis rotation
    groupRef.current.rotation.y += delta * 0.09;
    // Very subtle breathing tilt
    groupRef.current.rotation.x =
      -0.08 + Math.sin(state.clock.getElapsedTime() * 0.1) * 0.012;
  });

  // ── Procedural city layout
  const buildings = useMemo(() => {
    const rand = seededRand(0xdeadbeef);
    const list = [];

    const COLS = 14;           // blocks per axis
    const BLOCK = 1.6;         // block footprint
    const GAP = 0.55;          // road gap
    const STEP = BLOCK + GAP;
    const HALF = (COLS * STEP) / 2;

    for (let xi = 0; xi < COLS; xi++) {
      for (let zi = 0; zi < COLS; zi++) {
        // 10% of blocks are open plazas / parks
        if (rand() < 0.10) continue;

        const cx = xi * STEP - HALF + BLOCK * 0.5;
        const cz = zi * STEP - HALF + BLOCK * 0.5;
        const dist = Math.sqrt(cx * cx + cz * cz);
        const maxDist = HALF * 1.15;
        const t = Math.min(dist / maxDist, 1); // 0=downtown, 1=suburb edge

        // Building count per block
        const numB = t < 0.18 ? rand() * 2 + 2 | 0 : t < 0.45 ? rand() * 1.5 + 1 | 0 : 1;

        for (let b = 0; b < numB; b++) {
          const inset = BLOCK * 0.22;
          const bx = cx + (rand() - 0.5) * (BLOCK - inset * 2);
          const bz = cz + (rand() - 0.5) * (BLOCK - inset * 2);

          // Footprint size (taller buildings are narrower, skyscrapers more slender)
          const slender = t < 0.25 && rand() > 0.5;
          const bw = slender ? 0.22 + rand() * 0.35 : 0.35 + rand() * 0.65;
          const bd = slender ? 0.22 + rand() * 0.35 : 0.35 + rand() * 0.65;

          // Height curve — downtown peaks at ~9, suburb bottoms at ~0.5
          const h = t < 0.15
            ? 5.0 + rand() * 4.5           // CBD skyscrapers
            : t < 0.30
              ? 2.8 + rand() * 3.2          // midtown offices
              : t < 0.55
                ? 1.2 + rand() * 1.8        // inner suburbs
                : 0.4 + rand() * 0.9;       // outer low-rise

          // Color — bright orange for tallest, darker toward edge
          const color =
            h > 6    ? "#FF5004"
            : h > 3.5 ? "#FF6B2B"
            : h > 1.5 ? "#CC4400"
                       : "#8B2E00";

          // Opacity — prominent downtown, subtle at edge
          const opacity = Math.max(0.25, 0.9 - t * 0.7);

          list.push({ key: `${xi}-${zi}-${b}`, x: bx, z: bz, w: bw, d: bd, h, color, opacity });
        }
      }
    }
    return list;
  }, []);

  // ── Road grid as a single merged LineSegments geometry
  const roadGeom = useMemo(() => {
    const COLS = 14;
    const BLOCK = 1.6;
    const GAP = 0.55;
    const STEP = BLOCK + GAP;
    const HALF = (COLS * STEP) / 2;
    const EXT = HALF + GAP;

    const pts = [];
    for (let i = 0; i <= COLS; i++) {
      const v = i * STEP - HALF;
      // Along X
      pts.push(new THREE.Vector3(-EXT, 0, v), new THREE.Vector3(EXT, 0, v));
      // Along Z
      pts.push(new THREE.Vector3(v, 0, -EXT), new THREE.Vector3(v, 0, EXT));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  // ── Central landmark tower (distinct)
  const landmarkEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.55, 11, 0.55)),
    []
  );
  const spireEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.ConeGeometry(0.3, 1.8, 4)),
    []
  );

  return (
    <group ref={groupRef} position={[6, 0, 0]}>
      {/* Road grid */}
      <lineSegments geometry={roadGeom}>
        <lineBasicMaterial color="#FF5004" opacity={0.10} transparent />
      </lineSegments>

      {/* Ground base plate — subtle dot grid look */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]}>
        <planeGeometry args={[38, 38, 36, 36]} />
        <meshBasicMaterial color="#FF5004" wireframe opacity={0.025} transparent />
      </mesh>

      {/* All city buildings */}
      {buildings.map(({ key, ...props }) => (
        <Building key={key} {...props} />
      ))}

      {/* Central landmark tower */}
      <group position={[0, 5.5, 0]}>
        <lineSegments geometry={landmarkEdges}>
          <lineBasicMaterial color="#FF5004" opacity={0.9} transparent />
        </lineSegments>
      </group>
      {/* Landmark spire */}
      <group position={[0, 11.9, 0]}>
        <lineSegments geometry={spireEdges}>
          <lineBasicMaterial color="#FF5004" opacity={0.7} transparent />
        </lineSegments>
      </group>

      {/* Pulsing ground ring at base of landmark */}
      <PulsingRing />

      {/* Curved road network — rings, arterials, cross-streets */}
      <CurvedRoads />
    </group>
  );
}

// ─── Animated pulsing ring around the central tower ──────────────────────────
function PulsingRing() {
  const ringRef = useRef();
  useFrame((state) => {
    if (!ringRef.current) return;
    const t = (state.clock.getElapsedTime() % 2.4) / 2.4;
    ringRef.current.scale.setScalar(0.3 + t * 3.5);
    ringRef.current.material.opacity = (1 - t) * 0.6;
  });

  const geom = useMemo(
    () => new THREE.EdgesGeometry(new THREE.RingGeometry(0.8, 1.0, 32)),
    []
  );

  return (
    <group position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <lineSegments ref={ringRef} geometry={geom}>
        <lineBasicMaterial color="#FF5004" opacity={0.6} transparent />
      </lineSegments>
    </group>
  );
}

// ─── Floating ambient particles ───────────────────────────────────────────────
function CityParticles({ count = 220 }) {
  const ref = useRef();

  const geom = useMemo(() => {
    const rand = seededRand(0xc0ffee);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Scatter around city volume, mostly above ground
      arr[i * 3]     = (rand() - 0.5) * 44;
      arr[i * 3 + 1] = rand() * 18 - 1;
      arr[i * 3 + 2] = (rand() - 0.5) * 44;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.022;
  });

  return (
    <points ref={ref} geometry={geom}>
      <pointsMaterial
        color="#FF5004"
        size={0.07}
        sizeAttenuation
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function HeroScene() {
  const [mounted, setMounted] = React.useState(false);
  const glRef = React.useRef(null);

  React.useEffect(() => {
    setMounted(true);
    return () => {
      try {
        if (glRef.current) {
          glRef.current.dispose?.();
          glRef.current.forceContextLoss?.();
        }
      } catch (_) {}
    };
  }, []);

  if (!mounted) return <div style={{ width: "100%", height: "100%" }} />;

  return (
    <CanvasErrorBoundary>
      <Canvas
        camera={{ position: [10, 18, 14], fov: 40, near: 0.1, far: 120 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop="always"
        onCreated={({ gl, scene }) => {
          glRef.current = gl;
          gl.setClearColor(0x000000, 0);
          // Repoint camera to track the right-shifted city center
          camera.lookAt(6, 0, 0);
          // Exponential fog — far buildings fade into darkness
          scene.fog = new THREE.FogExp2(0x080300, 0.042);
        }}
      >
        {/* Warm overhead fill */}
        <ambientLight intensity={0.25} color="#FF5004" />
        {/* Strong centre point — illuminates downtown */}
        <pointLight position={[0, 14, 0]} intensity={2.5} color="#FF5004" distance={50} decay={1.5} />
        {/* Side rim lights */}
        <pointLight position={[12, 8, 6]}  intensity={0.8} color="#FF7733" distance={30} decay={2} />
        <pointLight position={[-10, 6, -8]} intensity={0.5} color="#CC4000" distance={25} decay={2} />

        <CityGrid />
        <CityParticles count={220} />
      </Canvas>
    </CanvasErrorBoundary>
  );
}
