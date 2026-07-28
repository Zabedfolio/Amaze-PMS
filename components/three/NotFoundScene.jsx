"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CanvasErrorBoundary from "./CanvasErrorBoundary";

function LostPortal() {
  const meshRef = useRef();
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.25;
      meshRef.current.rotation.y += delta * 0.15;
    }

    if (groupRef.current) {
      // Shift to the right (x = 1.6) on desktop (> 1024px width) and center (x = 0) on mobile/tablet
      const isDesktop = state.size.width > 1024;
      const targetX = isDesktop ? 1.6 : 0;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);

      // Gentle floating animation
      const elapsed = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(elapsed * 1.5) * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Pinned central geometric lost shape */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.75, 0.48, 120, 16, 2, 3]} />
        <meshBasicMaterial
          color="#FF5004"
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Internal core glow point */}
      <mesh>
        <sphereGeometry args={[0.58, 16, 16]} />
        <meshBasicMaterial color="#FF7A35" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function LostPackets({ count = 250 }) {
  const pointsRef = useRef();

  // Generate random positions and speeds for the lost packet particles
  const [positions, speeds, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const phs = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute in a spherical shell around the center
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const dist = 2.5 + Math.random() * 2.8;

      pos[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = dist * Math.cos(phi);

      spd[i] = 0.2 + Math.random() * 0.6;
      phs[i] = Math.random() * Math.PI * 2;
    }

    return [pos, spd, phs];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const geo = pointsRef.current.geometry;
    const posArr = geo.attributes.position.array;
    const elapsed = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Orbit around Y-axis
      const x = posArr[idx];
      const z = posArr[idx + 2];
      const angle = delta * speeds[i] * 0.7;

      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      // Rotate coordinates
      posArr[idx] = x * cos - z * sin;
      posArr[idx + 2] = x * sin + z * cos;

      // Vertical wiggle
      posArr[idx + 1] += Math.sin(elapsed * speeds[i] + phases[i]) * 0.003;
    }

    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#FF6B2B"
        size={0.065}
        sizeAttenuation
        transparent
        opacity={0.65}
      />
    </points>
  );
}

function LostSceneContainer() {
  useFrame((state) => {
    // Parallax camera movement based on mouse pointer
    const xTarget = state.pointer.x * 2.8;
    const yTarget = state.pointer.y * 2.8;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, xTarget, 0.045);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, yTarget, 0.045);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#FF5004" />
      <LostPortal />
      <LostPackets />
    </>
  );
}

export default function NotFoundScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <CanvasErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <LostSceneContainer />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
