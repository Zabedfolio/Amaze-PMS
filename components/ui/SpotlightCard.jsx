"use client";

import React, { useRef, useState } from "react";

export default function SpotlightCard({ children, className = "", ...props }) {
  const cardRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={[
        "relative bg-[#17171B] border border-white/8 rounded-[20px] overflow-hidden w-full h-full",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-[rgba(255,80,4,0.25)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.45)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        "--mouse-x": `${pos.x}px`,
        "--mouse-y": `${pos.y}px`,
        "--spotlight-opacity": opacity,
      }}
      {...props}
    >
      
      <div
        className="absolute inset-0 z-[1] pointer-events-none transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(320px circle at ${pos.x}px ${pos.y}px, rgba(255,80,4,0.09), transparent 80%)`,
        }}
      />
      
      <div className="relative z-[2] w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
