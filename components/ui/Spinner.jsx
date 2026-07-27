import React from "react";
import styles from "./Spinner.module.scss";

/**
 * Spinner Component - Rendered on buttons and load state overlays.
 * @param {Object} props
 * @param {string} [props.size="sm"] - Size of the spinner: "sm" (16px) or "md" (24px) or "lg" (36px)
 * @param {string} [props.className=""] - Optional extra CSS classes
 */
export default function Spinner({ size = "sm", className = "" }) {
  return (
    <div
      className={`${styles.spinner} ${styles[size]} ${className}`}
      role="status"
      aria-label="loading"
    >
      <span className={styles.srOnly}>Loading...</span>
    </div>
  );
}
