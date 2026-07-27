"use client";

import React from "react";
import Image from "next/image";
import clientData from "../../data/clients.json";

export default function ClientLogos() {
  const { logos } = clientData;
  // Triple the list so the marquee loop is seamless
  const tripleLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-8 relative bg-[#0A0A0C] overflow-hidden">
      {/* Top fade border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {/* Bottom fade border */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Section label */}
      <div className="container mx-auto px-6 mb-10 text-center">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[#606060] mb-5">
          Trusted by India&rsquo;s Leading Enterprises &amp; Real Estate Groups
        </p>
      </div>

      {/* Scrolling marquee */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
        }}
      >
        <div
          className="flex items-center gap-8 w-max"
          style={{ animation: "logo-marquee 36s linear infinite" }}
        >
          {tripleLogos.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex-shrink-0 flex items-center justify-center h-[72px] px-8 rounded-xl border border-white/[0.06] bg-white/[0.025] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300 group"
              style={{ minWidth: 160 }}
            >
              <div className="relative w-[130px] h-[44px] flex items-center justify-center">
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  sizes="130px"
                  className="object-contain opacity-50 group-hover:opacity-80 transition-opacity duration-300"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes logo-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}
