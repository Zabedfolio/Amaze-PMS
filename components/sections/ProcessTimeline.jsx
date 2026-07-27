"use client";

import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, FileSignature, Users, CheckCircle } from "lucide-react";
import TimelineParticles from "../three/TimelineParticles";
import SpotlightCard from "../ui/SpotlightCard";

const steps = [
  {
    num: "01",
    title: "Comprehensive Site Audit",
    desc: "We perform full-load MEP thermal profiling, water chemical audits, and janitorial mapping to trace current operational bottlenecks.",
    icon: ClipboardList,
    color: "#3B82F6", // Blue
    rotation: "-rotate-2 lg:-rotate-[1.5deg]"
  },
  {
    num: "02",
    title: "SLA Customization",
    desc: "We align key performance metrics with your compliance guidelines, drawing up clear service targets with complete legal transparency.",
    icon: FileSignature,
    color: "#8B5CF6", // Purple
    rotation: "rotate-1 lg:rotate-[1.2deg]"
  },
  {
    num: "03",
    title: "In-House Staff Induction",
    desc: "We deploy directly employed, vetted professionals. We handle statutory PF/ESIC registrations directly to secure absolute labor safety.",
    icon: Users,
    color: "#06B6D4", // Cyan
    rotation: "-rotate-1 lg:-rotate-[2deg]"
  },
  {
    num: "04",
    title: "Continuous Audits & KPI Checks",
    desc: "We run monthly energy cost reviews, safety checklists, and SLA evaluations, presenting digital diagnostic dashboard feedback.",
    icon: CheckCircle,
    color: "#FF5004", // Orange (Primary Theme)
    rotation: "rotate-2 lg:rotate-[1.8deg]"
  },
];

// Reusable SVG Glossy Pushpin component matching each card's theme color
function PushPin({ color }) {
  return (
    <svg 
      width="40" 
      height="45" 
      viewBox="0 0 40 45" 
      className="absolute -top-7 left-1/2 -translate-x-1/2 z-30 drop-shadow-md select-none pointer-events-none"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`pinGrad-${color}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={0.6} />
          <stop offset="35%" stopColor={color} />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>
        <linearGradient id="needleGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c7c7c" />
          <stop offset="50%" stopColor="#efefef" />
          <stop offset="100%" stopColor="#494949" />
        </linearGradient>
      </defs>
      
      {/* Pushpin shadow */}
      <ellipse cx="20" cy="38" rx="7" ry="2.5" fill="#000000" opacity="0.6" filter="blur(2px)" />
      
      {/* Pushpin pin needle */}
      <rect x="19" y="24" width="2" height="12" rx="0.5" fill="url(#needleGrad)" />
      
      {/* Lower Grip Block */}
      <path d="M 12 16 L 28 16 L 25 24 L 15 24 Z" fill={`url(#pinGrad-${color})`} stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
      
      {/* Head Cap */}
      <ellipse cx="20" cy="11" rx="9" ry="7" fill={`url(#pinGrad-${color})`} stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
      
      {/* Glass glossy reflection */}
      <circle cx="17" cy="8" r="1.8" fill="#ffffff" opacity="0.7" />
    </svg>
  );
}

export default function ProcessTimeline() {
  // SVG Bezier spline path weaving dynamically between center nodes on desktop
  const cubicBezierPath = "M 25 10 C 25 22.5, 75 22.5, 75 35 C 75 47.5, 25 47.5, 25 60 C 25 72.5, 75 72.5, 75 85";

  return (
    <section className="relative py-32 bg-[#09090B] border-b border-white/5 overflow-hidden">
      {/* 1. Subtle 3D particle background field */}
      <TimelineParticles />

      {/* 2. Technical Lined drafting grid (notebook style) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
          backgroundSize: "100% 48px"
        }}
      />

      {/* 3. Radial center lighting gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,80,4,0.025),transparent_50%)] pointer-events-none z-0" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-28">
          <span className="text-xs font-semibold tracking-widest text-accent uppercase font-display">SLA Roadmap</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-3 mb-6 font-display">
            Our Integration Process
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            Four clear steps to transition your property portfolio into a high-performance, compliant facility model.
          </p>
        </div>

        {/* Roadmap Wrapper */}
        <div className="relative w-full max-w-5xl mx-auto">
          
          {/* Weaving Dashed SVG Path (Desktop Mode only) */}
          <svg 
            className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
          >
            <motion.path
              d={cubicBezierPath}
              fill="none"
              stroke="rgba(255, 255, 255, 0.07)"
              strokeWidth="0.4"
              strokeDasharray="1.5 1.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
          </svg>

          {/* Straight Vertical Connector Line (Mobile/Tablet Mode only) */}
          <div className="lg:hidden absolute left-[31px] top-6 bottom-6 w-[2px] bg-white/5 z-0">
            <motion.div 
              className="w-full h-full bg-gradient-to-b from-blue-500 via-purple-500 via-cyan-500 to-accent origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />
          </div>

          {/* Cards Stack */}
          <div className="flex flex-col gap-24 lg:gap-32">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={index}
                  className={`w-full flex flex-col lg:flex-row items-center relative z-10 ${
                    isEven ? "lg:justify-start" : "lg:justify-end"
                  }`}
                >
                  {/* Outer Motion Wrapper for Entrance & Floating animations */}
                  <motion.div
                    className={`w-full lg:w-[48%] ${step.rotation}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.div
                      animate={{ y: [0, -7, 0] }}
                      transition={{ 
                        duration: 5, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: index * 0.4 
                      }}
                      whileHover={{ 
                        scale: 1.025, 
                        rotate: 0, 
                        y: -12, 
                        transition: { duration: 0.3 } 
                      }}
                      className="relative w-full"
                    >
                      {/* Soft colored glow aura right behind the pushpin base */}
                      <div 
                        className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full blur-xl opacity-60 z-10 pointer-events-none"
                        style={{ backgroundColor: step.color }}
                      />

                      {/* Realistic 3D pushpin mockup on top */}
                      <PushPin color={step.color} />

                      {/* Double-bordered Outer Card with Spotlight mouse hover tracking */}
                      <SpotlightCard className="p-3 lg:p-4 bg-[#141416] border border-white/10 shadow-2xl rounded-[32px]">
                        {/* Nested Inner Container Card (tinted background color match) */}
                        <div 
                          className="w-full h-full p-6 lg:p-8 rounded-[20px] border border-white/[0.02] flex flex-col items-start"
                          style={{
                            background: `linear-gradient(135deg, ${step.color}0c 0%, #0a0a0c 100%)`,
                          }}
                        >
                          <div className="w-full flex items-center justify-between mb-6">
                            {/* Stylish Icon Circle */}
                            <div 
                              className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                              style={{
                                background: `${step.color}0d`,
                                borderColor: `${step.color}26`,
                              }}
                            >
                              <StepIcon size={22} style={{ color: step.color }} />
                            </div>

                            {/* Large Outline Step Indicator Number */}
                            <span 
                              className="text-4xl font-extrabold tracking-tight font-display select-none opacity-45 hover:opacity-100 transition-opacity duration-300"
                              style={{
                                color: step.color,
                                textShadow: `0 0 12px ${step.color}44`
                              }}
                            >
                              {step.num}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-white mb-3 font-display">
                            {step.title}
                          </h3>
                          <p className="text-sm text-zinc-400 leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </SpotlightCard>
                    </motion.div>
                  </motion.div>

                  {/* Central Node visual timeline marker for Mobile view layout */}
                  <div 
                    className="lg:hidden absolute left-[26px] top-6 w-3 h-3 rounded-full border-2 bg-black z-20"
                    style={{ borderColor: step.color }}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
