"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import CanvasErrorBoundary from "./CanvasErrorBoundary";

const RADIUS = 2.0;
const LATITUDE = 25.3850; // Hyderabad North
const LONGITUDE = 69.4867 + 95.0; // Hyderabad East + Texture offset

function GlobeModel() {
  const groupRef = useRef();
  const ringRef = useRef();

  // Load public monochrome Earth landmass texture
  const earthTexture = useTexture("https://unpkg.com/three-globe/example/img/earth-dark.jpg");

  // Project latitude/longitude coordinate to Cartesian 3D space
  const { position, quaternion } = useMemo(() => {
    const radLat = (LATITUDE * Math.PI) / 180;
    const radLon = (LONGITUDE * Math.PI) / 180;

    // Standard spherical projection coordinates mapping
    const x = RADIUS * Math.cos(radLat) * Math.sin(radLon);
    const y = RADIUS * Math.sin(radLat);
    const z = RADIUS * Math.cos(radLat) * Math.cos(radLon);

    const pos = [x, y, z];
    const normal = new THREE.Vector3(x, y, z).normalize();
    
    // Quaternion to align local Y-axis (0, 1, 0) with the surface normal vector
    const localUp = new THREE.Vector3(0, 1, 0);
    const q = new THREE.Quaternion().setFromUnitVectors(localUp, normal);

    return {
      position: pos,
      quaternion: q
    };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08; // Slow auto-rotation
    }

    if (ringRef.current) {
      const elapsed = state.clock.getElapsedTime();
      const progress = (elapsed % 1.5) / 1.5; // Pulsing 1.5s loop
      ringRef.current.scale.setScalar(0.2 + progress * 2.2);
      if (ringRef.current.material) {
        ringRef.current.material.opacity = (1 - progress) * 0.85;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Glowing Continent World Globe */}
      <mesh>
        <sphereGeometry args={[RADIUS, 64, 64]} />
        <meshStandardMaterial
          color="#160c07"
          roughness={0.6}
          metalness={0.2}
          emissive="#FF5004"
          emissiveMap={earthTexture}
          emissiveIntensity={4.8}
        />
      </mesh>

      {/* 2. Outer Atmosphere/Faint Grid Overlay */}
      <mesh>
        <sphereGeometry args={[RADIUS + 0.015, 32, 32]} />
        <meshBasicMaterial color="#FF5004" wireframe opacity={0.22} transparent />
      </mesh>

      {/* 3. Hyderabad HQ Interactive Pin with aligned quaternion rotation */}
      <group position={position} quaternion={quaternion}>
        {/* Pulsing Radar Ring (lying flat on X-Z plane, rotated by 90deg on X to lie flat on surface) */}
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.02, 0.18, 32]} />
          <meshBasicMaterial color="#FF5004" transparent depthWrite={false} side={THREE.DoubleSide} />
        </mesh>

        {/* Vertical pointer spike standing straight up along Y-axis */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.4, 4]} />
          <meshBasicMaterial color="#FF5004" opacity={0.5} transparent />
        </mesh>

        {/* Glowing HQ Pin Core */}
        <mesh>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#FF5004" />
        </mesh>
      </group>
    </group>
  );
}

// Fallback sphere shown during texture loading sequence
function GlobeFallback() {
  return (
    <mesh>
      <sphereGeometry args={[RADIUS, 32, 32]} />
      <meshBasicMaterial color="#111114" wireframe opacity={0.2} transparent />
    </mesh>
  );
}

export default function GlobeScene() {
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

  if (!mounted) {
    return <div style={{ width: "100%", height: "100%" }} />;
  }

  return (
    <CanvasErrorBoundary>
      <Canvas
        camera={{ position: [0, 1.0, 4.0], fov: 60 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop="demand"
        onCreated={({ gl }) => { glRef.current = gl; }}
      >
        <ambientLight intensity={0.4} color="#FF5004" />
        <directionalLight position={[5, 5, 2]} intensity={1.5} color="#FF5004" />
        <pointLight position={[0, 0, 4]} intensity={2.2} color="#FF5004" />

        <Suspense fallback={<GlobeFallback />}>
          <GlobeModel />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </CanvasErrorBoundary>
  );
}
