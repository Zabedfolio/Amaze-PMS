"use client";

import React, { useRef, useState } from "react";
import styles from "./InteractiveGrid.module.scss";

export default function InteractiveGrid() {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={styles.gridContainer}
      style={{
        "--mouse-x": `${position.x}px`,
        "--mouse-y": `${position.y}px`,
        "--grid-opacity": opacity,
      }}
    >
      <div className={styles.dotGrid} />
      <div className={styles.spotlight} />
    </div>
  );
}
