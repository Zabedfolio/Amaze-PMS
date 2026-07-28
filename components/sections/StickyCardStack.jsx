"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brush, Wrench, Shield, Bug, Flower2, Droplets, Check, ArrowRight } from "lucide-react";
import servicesData from "../../data/services.json";

const iconMap = {
  Bucket: Brush, Wrench: Wrench, Shield: Shield,
  Bugs: Bug, Grass: Flower2, WaterDrop: Droplets,
};

export default function StickyCardStack() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const cards = servicesData.slice(0, 6);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cardsEl = cardsRef.current;
    if (!containerRef.current || cardsEl.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${(cardsEl.length - 1) * 130}%`,
          scrub: 1.2,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      cardsEl.forEach((card, index) => {
        if (index === 0) return;
        tl.fromTo(
          card,
          { yPercent: 100, scale: 0.97, opacity: 0 },
          { yPercent: 0, scale: 1, opacity: 1, duration: 1, ease: "none" },
          index - 0.75
        );
        tl.to(
          cardsEl[index - 1],
          { scale: 0.94 - index * 0.01, opacity: 0.4, yPercent: -8, duration: 1, ease: "none" },
          index - 0.75
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [cards.length]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0A0A0C] border-b border-white/8 overflow-hidden">
      {/* Section header */}
      <div className="container pt-28 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-2 h-2 rounded-full bg-[#FF5004] shadow-[0_0_8px_#FF5004] mt-10" />
          <span className="font-display text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[#FF5004] mt-10">Capabilities</span>
        </div>
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold text-[#F5F5F7] tracking-[-0.02em] my-10">
          Core Service Portfolio
        </h2>
      </div>

      {/* Stacked cards */}
      <div className="container relative h-[780px] sm:h-[640px] md:h-[580px] lg:h-[60vh] lg:max-h-[600px]">
        {cards.map((service, index) => {
          const Icon = iconMap[service.icon] || Wrench;
          const cardNum = String(index + 1).padStart(2, "0");
          const totalNum = String(cards.length).padStart(2, "0");

          return (
            <div
              key={service.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="absolute inset-0 rounded-[20px] overflow-hidden"
              style={{ zIndex: index + 1 }}
            >
              {/* Card shell */}
              <div
                className="relative w-full h-full flex flex-col lg:flex-row"
                style={{
                  background: "linear-gradient(160deg, #16161A 0%, #111114 100%)",
                  boxShadow: `0 0 0 1px ${service.gradient[0]}20, 0 40px 80px rgba(0,0,0,0.55)`,
                }}
              >
                {/* ── Left/Top accent strip ── */}
                <div
                  className="w-full h-[3px] lg:w-[3px] lg:h-full flex-shrink-0 rounded-t-[20px] lg:rounded-tr-none lg:rounded-l-[20px]"
                  style={{
                    background: `linear-gradient(90deg, ${service.gradient[0]} 0%, ${service.gradient[1]}40 100%)`,
                  }}
                />

                {/* ── LEFT COLUMN ── */}
                <div className="relative flex flex-col justify-between p-5 sm:p-8 lg:p-10 w-full lg:w-[44%] overflow-hidden">
                  {/* Giant watermark number */}
                  <span
                    className="absolute -top-6 -left-3 font-display font-extrabold select-none pointer-events-none leading-none"
                    style={{
                      fontSize: "clamp(6rem, 15vw, 11rem)",
                      color: service.gradient[0],
                      opacity: 0.045,
                      lineHeight: 1,
                    }}
                  >
                    {cardNum}
                  </span>

                  {/* TOP: icon + counter badge */}
                  <div className="relative z-10 flex items-start justify-between">
                    <div
                      className="w-[48px] h-[48px] lg:w-[60px] lg:h-[60px] rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${service.gradient[0]} 0%, ${service.gradient[1]} 100%)`,
                        boxShadow: `0 8px 24px ${service.gradient[0]}30`,
                      }}
                    >
                      <Icon size={22} color="#fff" strokeWidth={2} className="lg:hidden" />
                      <Icon size={26} color="#fff" strokeWidth={2} className="hidden lg:block" />
                    </div>

                    <span
                      className="font-mono text-[0.65rem] lg:text-[0.7rem] font-bold tracking-[0.12em] px-2.5 py-0.5 lg:px-3 lg:py-1 rounded-full flex-shrink-0"
                      style={{
                        color: service.gradient[0],
                        border: `1px solid ${service.gradient[0]}35`,
                        background: `${service.gradient[0]}0D`,
                      }}
                    >
                      {cardNum}&nbsp;/&nbsp;{totalNum}
                    </span>
                  </div>

                  {/* MIDDLE: name + description */}
                  <div className="relative z-10 flex flex-col gap-2 lg:gap-3 mt-4 lg:mt-5">
                    <h3 className="font-display text-[clamp(1.1rem,2vw,1.55rem)] font-extrabold text-[#F0F0F2] tracking-[-0.02em] leading-[1.18]">
                      {service.name}
                    </h3>
                    <p className="text-[#6A6A76] text-[0.8rem] lg:text-[0.865rem] leading-[1.6] lg:leading-[1.72] max-w-full">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* BOTTOM: stat metric block */}
                  <div
                    className="relative z-10 mt-4 lg:mt-6 rounded-[12px] lg:rounded-[14px] p-3 lg:p-4 flex items-center gap-3 lg:gap-4"
                    style={{
                      background: `linear-gradient(135deg, ${service.gradient[0]}10 0%, transparent 100%)`,
                      border: `1px solid ${service.gradient[0]}22`,
                    }}
                  >
                    {/* colour bar */}
                    <div
                      className="w-[3px] self-stretch rounded-full flex-shrink-0"
                      style={{
                        background: `linear-gradient(180deg, ${service.gradient[0]}, ${service.gradient[1]})`,
                      }}
                    />
                    <div>
                      <span
                        className="font-display font-extrabold leading-none block"
                        style={{
                          fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
                          background: `linear-gradient(90deg, ${service.gradient[0]} 0%, #F5F5F7 120%)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {service.stat.value}
                      </span>
                      <span className="text-[0.6rem] lg:text-[0.68rem] font-semibold uppercase tracking-[0.11em] text-[#52525E] mt-0.5 lg:mt-1 block">
                        {service.stat.label}
                      </span>
                    </div>
                  </div>

                  {/* Proposal Action Button */}
                  <div className="relative z-10 mt-4 lg:mt-5">
                    <button
                      onClick={() => window.dispatchEvent(new CustomEvent("open-proposal", { detail: { service: service.name } }))}
                      className="w-full font-display text-[0.8rem] lg:text-[0.875rem] font-bold px-4 py-2.5 rounded-lg border text-[#F5F5F7] transition-all duration-300 flex items-center justify-center gap-2"
                      style={{
                        background: `${service.gradient[0]}0D`,
                        borderColor: `${service.gradient[0]}35`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = service.gradient[0];
                        e.currentTarget.style.borderColor = "transparent";
                        e.currentTarget.style.color = "#0A0A0C";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `${service.gradient[0]}0D`;
                        e.currentTarget.style.borderColor = `${service.gradient[0]}35`;
                        e.currentTarget.style.color = "#F5F5F7";
                      }}
                    >
                      <span>Request Service Proposal</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* ── Divider ── */}
                <div
                  className="h-px w-[90%] mx-auto lg:w-px lg:h-auto lg:self-stretch lg:my-8 lg:mx-0 flex-shrink-0"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${service.gradient[0]}28 35%, ${service.gradient[0]}28 65%, transparent)`,
                  }}
                />

                {/* ── RIGHT COLUMN ── */}
                <div className="relative flex flex-col p-5 sm:p-8 lg:p-10 flex-1 overflow-hidden">
                  {/* Subtle dot-grid texture */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
                      backgroundSize: "22px 22px",
                    }}
                  />

                  {/* Section label with decorative lines */}
                  <div className="relative z-10 flex items-center gap-3 mb-4 lg:mb-6">
                    <div
                      className="h-px flex-shrink-0 w-8 rounded-full"
                      style={{ background: `linear-gradient(to right, ${service.gradient[0]}70, transparent)` }}
                    />
                    <span className="text-[0.62rem] lg:text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#44444E] whitespace-nowrap">
                      Inclusions &amp; Standards
                    </span>
                    <div className="h-px flex-1 rounded-full bg-white/[0.04]" />
                  </div>

                  {/* Inclusion items */}
                  <ul className="relative z-10 flex flex-col">
                    {service.included.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 lg:gap-4 py-[8px] lg:py-[11px] border-b border-white/[0.045] last:border-0"
                      >
                        {/* Check icon badge */}
                        <span
                          className="w-[18px] h-[18px] lg:w-[22px] lg:h-[22px] rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `${service.gradient[0]}15`,
                            border: `1px solid ${service.gradient[0]}30`,
                          }}
                        >
                          <Check size={9} strokeWidth={2.8} style={{ color: service.gradient[0] }} className="lg:hidden" />
                          <Check size={11} strokeWidth={2.8} style={{ color: service.gradient[0] }} className="hidden lg:block" />
                        </span>
                        <span className="text-[0.78rem] lg:text-[0.875rem] text-[#9A9AA4] leading-[1.4] lg:leading-[1.5] font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
