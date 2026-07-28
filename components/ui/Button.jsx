"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Spinner from "./Spinner";

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg rounded-[20px]",
};

const variantClasses = {
  primary:
    "bg-[#FF5004] text-[#0A0A0C] hover:bg-[#FF6A28] hover:shadow-[0_0_28px_rgba(255,80,4,0.48),0_0_12px_rgba(255,80,4,0.22)] disabled:opacity-50",
  secondary:
    "bg-[#17171B] text-[#F5F5F7] border border-white/8 hover:border-[#FF5004] hover:shadow-[0_0_24px_rgba(255,80,4,0.18),0_0_8px_rgba(255,80,4,0.06)] disabled:opacity-50",
  outline:
    "bg-transparent text-[#F5F5F7] border border-white/8 hover:text-[#FF5004] hover:border-[#FF5004] hover:shadow-[0_0_24px_rgba(255,80,4,0.18),0_0_8px_rgba(255,80,4,0.06)] disabled:opacity-50",
  ghost:
    "bg-transparent text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5 disabled:opacity-50",
};

/**
 * Reusable Sleek Button Component with Spotlight Hover Glow.
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  loading = false,
  disabled = false,
  type = "button",
  onClick,
  className = "",
  ...props
}) {
  const buttonRef = React.useRef(null);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const base =
    "inline-flex items-center justify-center font-display font-semibold text-center whitespace-nowrap select-none rounded-[12px] cursor-pointer transition-all duration-300 relative overflow-hidden focus-visible:outline-2 focus-visible:outline-[#FF5004] focus-visible:outline-offset-2";

  const classes = [
    base,
    sizeClasses[size] ?? sizeClasses.md,
    variantClasses[variant] ?? variantClasses.primary,
    loading ? "cursor-wait" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {loading && <Spinner size="sm" className="mr-2 shrink-0" />}
      
      {/* Spotlight Hover Glow Overlay */}
      {!disabled && !loading && isHovered && (
        <span
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background: variant === "primary"
              ? `radial-gradient(85px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.28) 0%, transparent 100%)`
              : `radial-gradient(110px circle at ${coords.x}px ${coords.y}px, rgba(255, 80, 4, 0.16) 0%, transparent 100%)`,
          }}
        />
      )}

      <span className={["flex items-center justify-center gap-2 relative z-10", loading ? "opacity-0" : ""].join(" ")}>
        {children}
      </span>
    </>
  );

  const eventHandlers = {
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  if (href) {
    return (
      <Link 
        ref={buttonRef} 
        href={href} 
        className={classes} 
        {...eventHandlers}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={disabled || loading ? {} : { scale: 1.02 }}
      whileTap={disabled || loading ? {} : { scale: 0.98 }}
      {...eventHandlers}
      {...props}
    >
      {content}
    </motion.button>
  );
}
