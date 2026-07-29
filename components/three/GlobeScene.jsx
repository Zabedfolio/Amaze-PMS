"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture, Stars } from "@react-three/drei";
import * as THREE from "three";
import CanvasErrorBoundary from "./CanvasErrorBoundary";

const RADIUS = 2.0;
const LATITUDE = 25.3850; 
const LONGITUDE = 69.4867 + 95.0; 

function GlobeModel() {
  const groupRef = useRef();
  const ringRef = useRef();

  const earthTexture = useTexture("https://unpkg.com/three-globe/example/img/earth-dark.jpg");

  const { position, quaternion } = useMemo(() => {
    const radLat = (LATITUDE * Math.PI) / 180;
    const radLon = (LONGITUDE * Math.PI) / 180;

    const x = RADIUS * Math.cos(radLat) * Math.sin(radLon);
    const y = RADIUS * Math.sin(radLat);
    const z = RADIUS * Math.cos(radLat) * Math.cos(radLon);

    const pos = [x, y, z];
    const normal = new THREE.Vector3(x, y, z).normalize();
    
    const localUp = new THREE.Vector3(0, 1, 0);
    const q = new THREE.Quaternion().setFromUnitVectors(localUp, normal);

    return {
      position: pos,
      quaternion: q
    };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08; 
    }

    if (ringRef.current) {
      const elapsed = state.clock.elapsedTime;
      const progress = (elapsed % 1.5) / 1.5; 
      ringRef.current.scale.setScalar(0.2 + progress * 2.2);
      if (ringRef.current.material) {
        ringRef.current.material.opacity = (1 - progress) * 0.85;
      }
    }
  });

  return (
    <group ref={groupRef}>
      
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

      <mesh>
        <sphereGeometry args={[RADIUS + 0.015, 32, 32]} />
        <meshBasicMaterial color="#FF5004" wireframe opacity={0.22} transparent />
      </mesh>

      <group position={position} quaternion={quaternion}>
        
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.02, 0.18, 32]} />
          <meshBasicMaterial color="#FF5004" transparent depthWrite={false} side={THREE.DoubleSide} />
        </mesh>

        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.4, 4]} />
          <meshBasicMaterial color="#FF5004" opacity={0.5} transparent />
        </mesh>

        <mesh>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#FF5004" />
        </mesh>
      </group>
    </group>
  );
}

function GlobeFallback() {
  return (
    <mesh>
      <sphereGeometry args={[RADIUS, 32, 32]} />
      <meshBasicMaterial color="#111114" wireframe opacity={0.2} transparent />
    </mesh>
  );
}

function CelestialBackground() {
  const saturnGroupRef = useRef();

  useFrame((state, delta) => {
    if (saturnGroupRef.current) {
      saturnGroupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group>
      
      <Stars radius={80} depth={40} count={1000} factor={5} saturation={0.5} fade speed={1.2} />

      <mesh position={[10, 5, -15]}>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>
      
      <mesh position={[10, 5, -15]}>
        <sphereGeometry args={[2.2, 16, 16]} />
        <meshBasicMaterial color="#FF5004" transparent opacity={0.12} />
      </mesh>

      <mesh position={[-3.0, 1.2, -2.5]}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshStandardMaterial color="#8E8E93" roughness={0.8} metalness={0.1} />
      </mesh>

      <group ref={saturnGroupRef} position={[-7.5, -2, -14]}>
        <mesh>
          <sphereGeometry args={[0.75, 32, 32]} />
          <meshStandardMaterial color="#4A8C55" roughness={0.7} />
        </mesh>
        
        <mesh rotation={[Math.PI / 2.6, 0, 0]}>
          <ringGeometry args={[1.0, 1.6, 64]} />
          <meshBasicMaterial color="#559960" transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <mesh position={[5.5, -3.5, -9]}>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshStandardMaterial color="#C83E0A" roughness={0.75} />
      </mesh>
    </group>
  );
}

export default function GlobeScene() {
  const [mounted, setMounted] = React.useState(false);
  const glRef = React.useRef(null);

  React.useEffect(() => {
    setMounted(true);
    return () => {
      glRef.current = null;
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
        frameloop="always"
        onCreated={({ gl }) => {
          glRef.current = gl;
          gl.domElement?.addEventListener("webglcontextlost", (e) => e.preventDefault(), false);
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 8, 5]} intensity={1.8} color="#FFD700" />
        <pointLight position={[0, 0, 4]} intensity={2.5} color="#FF5004" />

        <Suspense fallback={<GlobeFallback />}>
          <GlobeModel />
          <CelestialBackground />
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
