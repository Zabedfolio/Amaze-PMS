"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import testimonialsData from "../../data/testimonials.json";

export default function Testimonials() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;
    setScrollProgress((container.scrollLeft / maxScroll) * 100);
  };

  const scroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;
    const scrollAmount = 420;
    container.scrollTo({
      left: container.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <section className="py-28 relative overflow-hidden bg-[#0A0A0C] border-b border-white/8">
      <div className="container">
        {/* Header Block */}
        <div className="flex justify-between items-end mb-14 flex-col sm:flex-row sm:items-end gap-5">
          <div className="flex flex-col gap-2">
            <span className="font-display text-[0.75rem] font-semibold tracking-[0.05em] uppercase text-[#FF5004]">
              Testimonials
            </span>
            <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-extrabold text-[#F5F5F7] tracking-[-0.02em] leading-[1.15]">
              Reviews from Partners
            </h2>
          </div>

          <div className="flex gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full bg-white/[0.015] border border-white/8 text-[#F5F5F7] flex items-center justify-center cursor-pointer transition-all duration-300 hover:text-[#0A0A0C] hover:bg-[#FF5004] hover:border-[#FF5004] hover:shadow-[0_0_12px_rgba(255,80,4,0.4)] outline-none"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full bg-white/[0.015] border border-white/8 text-[#F5F5F7] flex items-center justify-center cursor-pointer transition-all duration-300 hover:text-[#0A0A0C] hover:bg-[#FF5004] hover:border-[#FF5004] hover:shadow-[0_0_12px_rgba(255,80,4,0.4)] outline-none"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scroll Track */}
        <div
          ref={containerRef}
          className="w-full overflow-x-auto cursor-grab py-2.5 pb-8 scroll-smooth no-scrollbar"
          style={{
            maskImage: "linear-gradient(to right, transparent, #000 3%, #000 97%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, #000 3%, #000 97%, transparent)",
          }}
        >
          <div className="flex gap-8 w-max">
            {testimonialsData.map((t) => {
              const initials = t.authorName
                ? t.authorName.split(" ").map((n) => n[0]).join("")
                : "U";

              return (
                <div
                  key={t.id}
                  className="relative w-[320px] sm:w-[420px] bg-[#17171B] border border-white/8 rounded-[20px] p-6 sm:p-10 flex flex-col justify-between min-h-[290px] sm:min-h-[330px] overflow-hidden transition-all duration-300 hover:border-[rgba(255,80,4,0.35)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.45),0_0_15px_rgba(255,80,4,0.15)]"
                >
                  {/* Card Glow Top Border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF5004] to-transparent opacity-45 pointer-events-none" />

                  <div className="flex justify-between items-center mb-6 gap-3">
                    <span className="bg-[rgba(255,80,4,0.05)] border border-[rgba(255,80,4,0.2)] text-[#FF5004] font-display font-bold text-[0.75rem] px-3 py-1 rounded-full uppercase tracking-[0.02em] whitespace-nowrap overflow-hidden text-ellipsis max-w-[240px]">
                      {t.propertyType}
                    </span>
                    <div className="flex gap-1 shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="#FF5004" stroke="none" />
                      ))}
                    </div>
                  </div>

                  <div className="relative mb-8">
                    <Quote className="text-[#FF5004] opacity-10 absolute -top-3 -left-3 z-[1]" size={28} />
                    <p className="relative z-[2] text-sm sm:text-base text-[#F5F5F7] leading-relaxed italic font-normal">
                      {t.quoteSummary}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 border-t border-white/8 pt-6 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF5004] to-[#FF6A28] text-[#0A0A0C] flex items-center justify-center font-display font-extrabold text-lg shadow-[0_4px_12px_rgba(255,80,4,0.15)] shrink-0">
                      {initials}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <h4 className="font-display text-[0.9375rem] font-bold text-[#F5F5F7]">{t.authorName}</h4>
                      <p className="text-[0.75rem] text-[#A1A1AA] font-medium">{t.authorRole}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="w-full h-1 bg-white/[0.03] rounded-full overflow-hidden mt-2.5">
          <motion.div
            className="h-full bg-[#FF5004] rounded-full transition-all duration-100 shadow-[0_0_8px_#FF5004]"
            style={{ width: `${Math.max(4, scrollProgress)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
