"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CanvasErrorBoundary from "./CanvasErrorBoundary";

function FloatingPoints() {
  const pointsRef = useRef();
  const count = 90;

  // Generate randomized positions and slow velocities
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Scale to cover the layout volume
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;

      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return [pos, vel];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const points = pointsRef.current;
    const positionsAttr = points.geometry.attributes.position;
    
    // Slow drifting animation
    for (let i = 0; i < count; i++) {
      positionsAttr.array[i * 3] += velocities[i * 3] * 12 * delta;
      positionsAttr.array[i * 3 + 1] += velocities[i * 3 + 1] * 12 * delta;
      positionsAttr.array[i * 3 + 2] += velocities[i * 3 + 2] * 12 * delta;

      // Wrap-around boundary resets
      if (Math.abs(positionsAttr.array[i * 3]) > 5) positionsAttr.array[i * 3] *= -0.95;
      if (Math.abs(positionsAttr.array[i * 3 + 1]) > 4) positionsAttr.array[i * 3 + 1] *= -0.95;
    }
    positionsAttr.needsUpdate = true;
    
    // Slow rotation
    points.rotation.y += delta * 0.015;
    points.rotation.x += delta * 0.008;
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
        color="#FF5004"
        size={0.038}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function TimelineParticles() {
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

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <CanvasErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 3] }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          frameloop="demand"
          onCreated={({ gl }) => { glRef.current = gl; }}
        >
          <ambientLight intensity={0.4} />
          <FloatingPoints />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
