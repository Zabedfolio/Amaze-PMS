"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";
import Button from "../components/ui/Button";

// Load 3D scene dynamically to disable SSR rendering
const NotFoundScene = dynamic(() => import("../components/three/NotFoundScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-[#FF5004] animate-spin" />
    </div>
  ),
});

export default function NotFound() {
  return (
    <div className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#0A0A0C] pt-16">
      {/* 3D canvas — fills full screen background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <NotFoundScene />
      </div>

      {/* Gradient fade protecting left text, making the background 3D scene show on the right */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-[#0A0A0C] via-[#0A0A0C]/85 sm:via-[#0A0A0C]/70 to-transparent" />

      {/* Text Content */}
      <div className="container mx-auto px-6 py-12 relative z-10 w-full">
        <div className="flex flex-col items-start text-left gap-6 max-w-[600px]">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] px-3.5 py-1 rounded-full border border-[#FF5004]/35 bg-[#FF5004]/10 text-[#FF5004]">
            Error Code 404
          </span>

          <h1 className="font-display font-extrabold text-[clamp(2.25rem,6vw,4rem)] leading-[1.1] text-[#F5F5F7] tracking-[-0.03em]">
            Lost in the <span className="text-[#FF5004]">Void</span>.
          </h1>

          <p className="text-[#A1A1AA] text-[clamp(0.95rem,2vw,1.1rem)] leading-relaxed">
            The property resource or layout directory you requested is unavailable. This asset either does not exist or has been relocated under a different registry.
          </p>

          <div className="h-2" />

          <Button
            href="/"
            variant="primary"
            size="lg"
            className="flex items-center gap-3 group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>Return to Base</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
