"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Award, HeartHandshake, Eye } from "lucide-react";
import companyData from "../../data/company.json";
import CTABanner from "../../components/sections/CTABanner";
import InteractiveGrid from "../../components/ui/InteractiveGrid";
import AmbientAura from "../../components/ui/AmbientAura";
import GlassCard from "../../components/ui/GlassCard";

const iconMap = {
  "100% In-House Capability": HeartHandshake,
  "Absolute Statutory Compliance": ShieldCheck,
  "Technical Innovation": Award,
  "Certified Security Mindset": Eye,
};

export default function AboutPage() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const milestoneRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const line = lineRef.current;
    if (!line || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: line.parentElement,
            start: "top 70%",
            end: "bottom 70%",
            scrub: 1,
          },
        }
      );

      milestoneRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-[#0A0A0C] min-h-screen">
      {/* Short Hero Header */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#111114] to-[#0A0A0C] border-b border-white/8">
        <InteractiveGrid />
        <div className="container relative z-10 flex flex-col gap-4">
          <span className="font-display text-xs font-semibold uppercase tracking-wider text-[#FF5004]">Our Story</span>
          <h1 className="font-display text-[clamp(2.25rem,6vw,4rem)] font-extrabold text-[#F5F5F7] tracking-tight leading-tight max-w-4xl">
            Founded on Precise Operations &amp; Compliance
          </h1>
          <p className="text-[#A1A1AA] text-[clamp(1rem,2.5vw,1.1875rem)] leading-relaxed max-w-2xl">
            Founded in 2001 by military veteran Subhani Abdul, Amaze PMS operates under a unified self-performance commitment.
          </p>
        </div>
      </section>

      {/* Founder Pullquote Block */}
      <section className="py-24 relative overflow-hidden bg-[#0A0A0C]">
        <AmbientAura />
        <div className="container relative z-10">
          <div className="bg-[#17171B] border border-white/8 rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center shadow-2xl">
            <div className="flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-white/8 pb-6 md:pb-0 md:pr-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF5004] to-[#FF6A28] text-[#0A0A0C] font-display font-extrabold text-3xl flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(255,80,4,0.3)]">
                {companyData.founder.name.charAt(0)}
              </div>
              <h3 className="font-display text-xl font-bold text-[#F5F5F7]">{companyData.founder.name}</h3>
              <p className="text-xs text-[#A1A1AA] font-medium mt-0.5">{companyData.founder.role}</p>
              <span className="inline-block mt-3 px-3 py-1 rounded-full bg-[#FF5004]/10 border border-[#FF5004]/20 text-[#FF5004] text-[10px] font-bold uppercase tracking-wider">
                {companyData.founder.background}
              </span>
            </div>
            
            <div className="md:col-span-2 flex flex-col gap-4">
              <blockquote className="font-display text-lg md:text-xl font-semibold text-[#F5F5F7] italic leading-relaxed">
                "{companyData.founder.quote}"
              </blockquote>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">{companyData.founder.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Milestones Timeline */}
      <section className="py-24 bg-[#111114] border-t border-b border-white/8">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl font-extrabold text-[#F5F5F7] tracking-tight mb-3">Our Expansion Chronology</h2>
            <p className="text-[#A1A1AA] text-base leading-relaxed">A look back at how we grew to manage 20M+ sq ft across India.</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline center line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-white/10 hidden md:block">
              <div ref={lineRef} className="w-full h-full bg-[#FF5004] origin-top" />
            </div>

            <div className="flex flex-col gap-12">
              {companyData.milestones.map((milestone, idx) => (
                <div
                  key={idx}
                  ref={(el) => (milestoneRefs.current[idx] = el)}
                  className={`flex flex-col md:flex-row items-center gap-8 relative ${
                    idx % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-full md:w-1/2">
                    <GlassCard className="p-6 transition-all duration-300 hover:border-[#FF5004]/30" hoverEffect>
                      <span className="font-display text-sm font-extrabold text-[#FF5004] block mb-1">{milestone.year}</span>
                      <h4 className="font-display text-lg font-bold text-[#F5F5F7] mb-2">{milestone.title}</h4>
                      <p className="text-sm text-[#A1A1AA] leading-relaxed">{milestone.description}</p>
                    </GlassCard>
                  </div>
                  {/* Center Dot */}
                  <div className="w-4 h-4 rounded-full bg-[#0A0A0C] border-2 border-[#FF5004] absolute left-1/2 -translate-x-1/2 z-10 hidden md:block" />
                  <div className="w-full md:w-1/2 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Bento Grid */}
      <section className="py-24 bg-[#0A0A0C]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl font-extrabold text-[#F5F5F7] tracking-tight mb-3">Our Operational Pillars</h2>
            <p className="text-[#A1A1AA] text-base leading-relaxed">Core values that guide our 15,000+ professionals every single day.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyData.values.map((val, idx) => {
              const IconComp = iconMap[val.title] || ShieldCheck;
              return (
                <GlassCard key={idx} className="p-6 flex flex-col gap-4" hoverEffect>
                  <div className="w-12 h-12 rounded-lg bg-[#FF5004]/10 border border-[#FF5004]/20 flex items-center justify-center text-[#FF5004]">
                    <IconComp size={24} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#F5F5F7]">{val.title}</h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{val.description}</p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTABanner Callout */}
      <CTABanner />
    </div>
  );
}
