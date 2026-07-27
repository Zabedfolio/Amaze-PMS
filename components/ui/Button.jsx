"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./Button.module.scss";
import Spinner from "./Spinner";

/**
 * Reusable Sleek Button Component.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content label
 * @param {"primary" | "secondary" | "outline" | "ghost"} [props.variant="primary"] - Visual style
 * @param {"sm" | "md" | "lg"} [props.size="md"] - Vertical padding and font size
 * @param {string} [props.href] - Link destination (turns button into a Next.js Link)
 * @param {boolean} [props.loading=false] - If true, displays a spinner and disables interactions
 * @param {boolean} [props.disabled=false] - Disables interaction and dims appearance
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>["type"]} [props.type="button"] - Form submission type
 * @param {React.MouseEventHandler<HTMLButtonElement>} [props.onClick] - Click handler
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
  const classNames = `${styles.btn} ${styles[variant]} ${styles[size]} ${
    loading ? styles.loading : ""
  } ${className}`;

  const content = (
    <>
      {loading && <Spinner size="sm" className={styles.spinner} />}
      <span className={loading ? styles.textHidden : styles.text}>{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classNames} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      className={classNames}
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
