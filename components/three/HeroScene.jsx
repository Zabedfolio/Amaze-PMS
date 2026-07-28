"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";
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

function BeaconLight() {
  const lightRef = useRef();
  useFrame((state) => {
    if (!lightRef.current) return;
    const val = Math.sin(state.clock.elapsedTime * 6.5) * 0.5 + 0.5;
    lightRef.current.opacity = val > 0.65 ? 1.0 : 0.2;
  });

  return (
    <mesh position={[0, 0.6, 0]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial ref={lightRef} color="#FF3333" transparent />
    </mesh>
  );
}

// ─── Single Building — Outline Wireframe Style ─────────────────────────────────
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
        <lineBasicMaterial color="#FF5004" opacity={opacity} transparent />
      </lineSegments>
      {/* Semi-translucent interior for solid volume presence */}
      <mesh geometry={fill}>
        <meshBasicMaterial color="#FF5004" opacity={0.16} transparent />
      </mesh>
    </group>
  );
}

// ─── AMAZE PMS HQ Skyscraper with Rotating Callout Tag ─────────────────────────
function AmazeBuilding() {
  const height = 2.5;
  const w = 0.52;
  const d = 0.52;

  const edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(w, height, d)),
    [w, height, d]
  );
  const fill = useMemo(() => new THREE.BoxGeometry(w, height, d), [w, height, d]);

  return (
    <group position={[4.3, height * 0.5, 4.3]}>
      {/* Crisp edge lines */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#FF5004" opacity={0.8} transparent />
      </lineSegments>
      {/* Semi-translucent interior */}
      <mesh geometry={fill}>
        <meshBasicMaterial color="#FF5004" opacity={0.16} transparent />
      </mesh>

      {/* Pointer line and AMAZE PMS HQ Tag */}
      <group position={[0, height * 0.5 + 0.6, 0]}>
        {/* Sleek, Enlarged HTML Tag */}
        <Html center distanceFactor={11}>
          <div style={{
            background: "rgba(10, 10, 12, 0.94)",
            backdropFilter: "blur(8px)",
            border: "2px solid #FF5004",
            borderRadius: "8px",
            padding: "6px 14px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            boxShadow: "0 0 20px rgba(255, 80, 4, 0.55)",
            fontFamily: "var(--font-display), sans-serif",
            userSelect: "none"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#FF5004",
                boxShadow: "0 0 8px #FF5004"
              }} />
              <span style={{ color: "#F5F5F7", fontSize: "12px", fontWeight: "800", letterSpacing: "0.05em" }}>
                AMAZE PMS HQ
              </span>
            </div>
            <span style={{ color: "#FF5004", fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Hyderabad
            </span>
          </div>
        </Html>
      </group>
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
    // Smooth continuous Y-axis rotation (slowed down for cinematic experience)
    groupRef.current.rotation.y += delta * 0.038;
    // Very subtle breathing tilt
    groupRef.current.rotation.x =
      -0.08 + Math.sin(state.clock.elapsedTime * 0.1) * 0.012;
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

        // Skip HQ building block to prevent overlap
        if (Math.abs(cx - 4.3) < 0.1 && Math.abs(cz - 4.3) < 0.1) {
          continue;
        }

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

          // Color — all buildings matching the brand accent color
          const color = "#FF5004";

          // Opacity — high visibility wireframe edge line opacity
          const opacity = Math.max(0.70, 1.0 - t * 0.30);

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

  // ── Physical asphalt road strips
  const physicalRoads = useMemo(() => {
    const COLS = 14;
    const BLOCK = 1.6;
    const GAP = 0.55;
    const STEP = BLOCK + GAP;
    const HALF = (COLS * STEP) / 2;
    const EXT = HALF + GAP;
    
    const roads = [];
    const width = 0.20; // asphalt road width
    
    for (let i = 0; i <= COLS; i++) {
      const v = i * STEP - HALF;
      // Z-parallel roads
      roads.push({
        position: [v, 0.002, 0],
        args: [width, EXT * 2],
        rotation: [-Math.PI / 2, 0, 0]
      });
      // X-parallel roads
      roads.push({
        position: [0, 0.002, v],
        args: [EXT * 2, width],
        rotation: [-Math.PI / 2, 0, 0]
      });
    }
    return roads;
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
      {/* Physical dark asphalt road strips */}
      {physicalRoads.map((road, i) => (
        <mesh key={`rd-${i}`} position={road.position} rotation={road.rotation}>
          <planeGeometry args={road.args} />
          <meshBasicMaterial color="#111115" />
        </mesh>
      ))}

      {/* Road grid lines — dimmed to look like subtle glowing lanes */}
      <lineSegments geometry={roadGeom}>
        <lineBasicMaterial color="#FF5004" opacity={0.05} transparent />
      </lineSegments>

      {/* Ground base plate — reflective dark metallic surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]}>
        <planeGeometry args={[42, 42]} />
        <meshStandardMaterial color="#08080B" roughness={0.45} metalness={0.7} />
      </mesh>

      {/* All city buildings */}
      {buildings.map(({ key, ...props }) => (
        <Building key={key} {...props} />
      ))}

      {/* Dedicated Amaze Building with rotating HQ tag */}
      <AmazeBuilding />

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
    const t = (state.clock.elapsedTime % 2.4) / 2.4;
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

// ─── Moving Vehicles / Traffic System (Headlights & Taillights) ───────────────
function TrafficSystem() {
  const ring1Refs = useRef([]);
  const ring2Refs = useRef([]);
  const radialRefs = useRef([]);

  // Curves defined for traffic paths
  const radialCurves = useMemo(() => {
    const list = [];
    const NUM_RADIALS = 10;
    // Animate traffic on half of the arterials to optimize performance
    for (let i = 0; i < NUM_RADIALS; i += 2) {
      const a = (i / NUM_RADIALS) * Math.PI * 2;
      const bendDir = i % 2 === 0 ? 1 : -1;
      const bend = bendDir * 0.22;
      
      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(Math.cos(a) * 3.0, 0.025, Math.sin(a) * 3.0),
        new THREE.Vector3(Math.cos(a + bend) * 5.5, 0.025, Math.sin(a + bend) * 5.5),
        new THREE.Vector3(Math.cos(a - bend * 0.6) * 9.0, 0.025, Math.sin(a - bend * 0.6) * 9.0),
        new THREE.Vector3(Math.cos(a) * 12.5, 0.025, Math.sin(a) * 12.5)
      );
      list.push(curve);
    }
    return list;
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;

    // 1. Ring 1 Traffic (Orbiting inner loop, radius = 3.0)
    ring1Refs.current.forEach((mesh, index) => {
      if (!mesh) return;
      const speed = 0.32;
      const angle = (elapsed * speed + (index / 6)) * Math.PI * 2;
      mesh.position.set(Math.cos(angle) * 3.0, 0.035, Math.sin(angle) * 3.0);
    });

    // 2. Ring 2 Traffic (Orbiting midtown loop, radius = 6.8)
    ring2Refs.current.forEach((mesh, index) => {
      if (!mesh) return;
      const speed = -0.20; // Orbit reverse direction
      const angle = (elapsed * speed + (index / 10)) * Math.PI * 2;
      mesh.position.set(Math.cos(angle) * 6.8, 0.035, Math.sin(angle) * 6.8);
    });

    // 3. Radial Arterials Traffic
    radialRefs.current.forEach((mesh, idx) => {
      if (!mesh) return;
      const curveIdx = Math.floor(idx / 3); // 3 cars per curve
      const carOffset = (idx % 3) / 3;
      const progress = (elapsed * 0.15 + carOffset) % 1.0;
      
      const curve = radialCurves[curveIdx];
      if (curve) {
        const pos = curve.getPointAt(progress);
        mesh.position.copy(pos);
      }
    });
  });

  return (
    <group position={[6, 0, 0]}>
      {/* Spawn Ring 1 Vehicles (White headlights & Red taillights) */}
      {Array.from({ length: 6 }).map((_, idx) => (
        <mesh key={`r1-${idx}`} ref={(el) => (ring1Refs.current[idx] = el)}>
          <boxGeometry args={[0.08, 0.04, 0.05]} />
          <meshBasicMaterial color={idx % 2 === 0 ? "#FFFFFF" : "#FF1E00"} />
        </mesh>
      ))}

      {/* Spawn Ring 2 Vehicles */}
      {Array.from({ length: 10 }).map((_, idx) => (
        <mesh key={`r2-${idx}`} ref={(el) => (ring2Refs.current[idx] = el)}>
          <boxGeometry args={[0.10, 0.04, 0.06]} />
          <meshBasicMaterial color={idx % 2 === 0 ? "#FFFFFF" : "#FF1E00"} />
        </mesh>
      ))}

      {/* Spawn Radial Vehicles */}
      {Array.from({ length: radialCurves.length * 3 }).map((_, idx) => (
        <mesh key={`rad-${idx}`} ref={(el) => (radialRefs.current[idx] = el)}>
          <boxGeometry args={[0.10, 0.04, 0.06]} />
          <meshBasicMaterial color={idx % 2 === 0 ? "#FFD700" : "#FF1E00"} />
        </mesh>
      ))}
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
      glRef.current = null;
    };
  }, []);

  if (!mounted) return <div style={{ width: "100%", height: "100%" }} />;

  return (
    <CanvasErrorBoundary>
      <Canvas
        camera={{ position: [8, 12, 11], fov: 38, near: 0.1, far: 120 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop="always"
        onCreated={({ gl, scene, camera }) => {
          glRef.current = gl;
          gl.domElement?.addEventListener("webglcontextlost", (e) => e.preventDefault(), false);
          gl.setClearColor(0x000000, 0);
          camera.lookAt(6, 1.2, 0);
          // Reduced fog density to make outer details more visible
          scene.fog = new THREE.FogExp2(0x000000, 0.012);
        }}
      >
        {/* Warm brand-orange ambient fill */}
        <ambientLight intensity={0.7} color="#FF5004" />
        {/* Specular highlighting source for building contours - aligned with theme color */}
        <directionalLight position={[12, 18, 10]} intensity={3.0} color="#FF5004" />
        {/* Strong overhead centre — illuminates downtown in brand orange */}
        <pointLight position={[0,  16,  0]}  intensity={12}   color="#FF5004" distance={70} decay={1.2} />
        {/* Warm gold rim light for shiny specular reflections */}
        <pointLight position={[14,  10,  8]}  intensity={4}   color="#FFAA00" distance={50} decay={1.5} />
        {/* Deep red accent from behind */}
        <pointLight position={[-12,  8, -10]} intensity={4}   color="#FF1E00" distance={45} decay={1.5} />
        {/* Neutral white fill from left for specular highlights */}
        <pointLight position={[-6,   5,  12]} intensity={1.8} color="#FFFFFF" distance={40} decay={2} />
        {/* Warm fill from right */}
        <pointLight position={[18,   4,  -4]} intensity={3.0}   color="#FF5004" distance={40} decay={2} />

        <CityGrid />
        <TrafficSystem />
        <CityParticles count={220} />
      </Canvas>
    </CanvasErrorBoundary>
  );
}
