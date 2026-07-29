"use client";

import React from "react";

const SUPPRESSED_MESSAGES = [
  "removeChild",
  "NotFoundError",
  "The node to be removed",
  "is not a child",
  "Cannot read properties of null",
  "Cannot set properties of null",
  "R3F",
  "THREE.Clock",
  "Context Lost",
  "loseContext",
];

function isSuppressedError(error) {
  if (!error) return false;
  const msg = error.message || String(error);
  return SUPPRESSED_MESSAGES.some((s) => msg.includes(s));
}

export default class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    
    if (isSuppressedError(error)) {
      return { hasError: true };
    }
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (!isSuppressedError(error)) {
      console.warn("R3F Canvas error:", error?.message);
    }
    
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div style={{ width: "100%", height: "100%" }} />;
    }
    return this.props.children;
  }
}
