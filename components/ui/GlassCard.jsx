"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./GlassCard.module.scss";

/**
 * Reusable Frosted Glass Card Container with scroll entrance animations.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card child elements
 * @param {string} [props.className=""] - Extra CSS classes
 * @param {boolean} [props.hoverEffect=true] - Add transform and border glows on hover
 * @param {number} [props.delay=0] - Scroll entrance delay in seconds
 * @param {React.MouseEventHandler<HTMLDivElement>} [props.onClick] - Optional click handler (transforms container semantics)
 */
export default function GlassCard({
  children,
  className = "",
  hoverEffect = true,
  delay = 0,
  onClick,
  ...props
}) {
  const Wrapper = onClick ? motion.button : motion.div;
  const interactiveProps = onClick
    ? {
        type: "button",
        whileTap: { scale: 0.98 },
      }
    : {};

  return (
    <Wrapper
      className={`${styles.glassCard} ${hoverEffect ? styles.hoverable : ""} ${
        onClick ? styles.clickable : ""
      } ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      onClick={onClick}
      {...interactiveProps}
      {...props}
    >
      {children}
    </Wrapper>
  );
}
