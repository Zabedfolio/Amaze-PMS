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
    "bg-[#FF5004] text-[#0A0A0C] hover:bg-[#FF6A28] hover:shadow-[0_0_20px_rgba(255,80,4,0.4)] disabled:opacity-50",
  secondary:
    "bg-[#17171B] text-[#F5F5F7] border border-white/8 hover:border-[#FF5004] hover:shadow-[0_0_15px_rgba(255,80,4,0.15)] disabled:opacity-50",
  outline:
    "bg-transparent text-[#F5F5F7] border border-white/8 hover:text-[#FF5004] hover:border-[#FF5004] hover:shadow-[0_0_15px_rgba(255,80,4,0.15)] disabled:opacity-50",
  ghost:
    "bg-transparent text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5 disabled:opacity-50",
};

/**
 * Reusable Sleek Button Component.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content label
 * @param {"primary"|"secondary"|"outline"|"ghost"} [props.variant="primary"] - Visual style
 * @param {"sm"|"md"|"lg"} [props.size="md"] - Vertical padding and font size
 * @param {string} [props.href] - Link destination (turns button into a Next.js Link)
 * @param {boolean} [props.loading=false] - If true, displays a spinner and disables interactions
 * @param {boolean} [props.disabled=false] - Disables interaction and dims appearance
 * @param {string} [props.className=""] - Extra CSS class
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
      <span className={loading ? "opacity-0" : ""}>{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={disabled || loading ? {} : { scale: 1.02 }}
      whileTap={disabled || loading ? {} : { scale: 0.98 }}
      {...props}
    >
      {content}
    </motion.button>
  );
}
