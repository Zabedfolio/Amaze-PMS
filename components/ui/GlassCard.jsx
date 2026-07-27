"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Reusable Frosted Glass Card Container with scroll entrance animations.
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

  return (
    <Wrapper
      className={[
        // glass base
        "bg-[rgba(23,23,27,0.6)] backdrop-blur-[16px] border border-white/5",
        "rounded-[20px] p-8 text-left relative overflow-hidden",
        "transition-[border-color,box-shadow] duration-300",
        // hover lift
        hoverEffect
          ? "hover:border-[rgba(255,80,4,0.25)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(255,80,4,0.15)] hover:-translate-y-1"
          : "",
        // clickable
        onClick
          ? "bg-[rgba(23,23,27,0.4)] w-full cursor-pointer outline-none font-[inherit] text-inherit hover:bg-[rgba(23,23,27,0.6)] focus-visible:outline-2 focus-visible:outline-[#FF5004] focus-visible:outline-offset-4"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      onClick={onClick}
      {...(onClick ? { type: "button", whileTap: { scale: 0.98 } } : {})}
      {...props}
    >
      {children}
    </Wrapper>
  );
}
