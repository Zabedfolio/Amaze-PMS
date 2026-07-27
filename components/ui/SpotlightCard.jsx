"use client";

import React, { useRef, useState } from "react";
import styles from "./SpotlightCard.module.scss";

export default function SpotlightCard({ children, className = "", ...props }) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`${styles.spotlightCard} ${className}`}
      style={{
        "--mouse-x": `${position.x}px`,
        "--mouse-y": `${position.y}px`,
        "--spotlight-opacity": opacity,
      }}
      {...props}
    >
      <div className={styles.spotlightGlow} />
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  );
}
