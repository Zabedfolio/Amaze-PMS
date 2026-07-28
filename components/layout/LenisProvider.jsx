"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * LenisProvider Component - Client-side wrapper providing global Lenis smooth scrolling
 * and synchronizing its frame ticker and scroll events with GSAP ScrollTrigger.
 */
export default function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // Direct Lenis scroll events to update GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Synchronize GSAP ticker frame rates with Lenis requests
    const tickHandler = (time) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(tickHandler);

    // Configure GSAP lag smoothing to avoid jumps during scroll syncing
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Clean up listeners on unmount
      lenis.destroy();
      gsap.ticker.remove(tickHandler);
      window.lenis = null;
    };
  }, []);

  return <>{children}</>;
}
