"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styles from "./AmbientAura.module.scss";

export default function AmbientAura() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Apply spring damping physics for smooth, lag-based tracking
  const springConfig = { damping: 45, stiffness: 180, mass: 1.2 };
  const auraX = useSpring(mouseX, springConfig);
  const auraY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Offset by half of orb size (e.g., 250px) to center it on cursor
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className={styles.auraContainer}>
      <motion.div
        className={styles.glowOrb}
        style={{
          x: auraX,
          y: auraY,
        }}
      />
    </div>
  );
}
