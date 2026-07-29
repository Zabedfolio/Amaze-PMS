"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickHandler = (time) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(tickHandler);

    gsap.ticker.lagSmoothing(0);

    return () => {
      
      lenis.destroy();
      gsap.ticker.remove(tickHandler);
      window.lenis = null;
    };
  }, []);

  return <>{children}</>;
}
