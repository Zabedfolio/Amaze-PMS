"use client";

import React, { useRef, useState } from "react";

export default function InteractiveGrid() {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-transparent"
    >
      
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "center",
          maskImage: "radial-gradient(circle at center, black 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 60%, transparent 100%)",
        }}
      />
      
      <div
        className="absolute inset-0 transition-opacity duration-[600ms]"
        style={{
          opacity,
          background: `radial-gradient(280px circle at ${position.x}px ${position.y}px, rgba(255,80,4,0.12), transparent 80%)`,
        }}
      />
    </div>
  );
}
