"use client";

import { useEffect } from "react";

// Silently suppresses WebGL/R3F DOM unmount race-condition errors that
// occur when Next.js removes route nodes before the Canvas cleanup finishes.
const SUPPRESSED = [
  "removeChild",
  "NotFoundError",
  "The node to be removed is not a child",
  "Cannot read properties of null",
  "Cannot set properties of null",
];

export default function GlobalErrorSuppressor() {
  useEffect(() => {
    const handler = (event) => {
      const msg = event?.error?.message || event?.message || "";
      if (SUPPRESSED.some((s) => msg.includes(s))) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };

    window.addEventListener("error", handler, true);
    return () => window.removeEventListener("error", handler, true);
  }, []);

  return null;
}
