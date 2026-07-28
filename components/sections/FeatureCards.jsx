"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Phone, Mail } from "lucide-react";
import SpotlightCard from "../ui/SpotlightCard";

export default function FeatureCards() {
  const [toggleActive, setToggleActive] = useState(true);

  // SVG wave paths for Success as a Service
  const risingPath = "M0,75 C80,85 160,35 240,55 C320,75 380,25 450,15";
  const fallingPath = "M0,45 C80,35 160,75 240,65 C320,55 380,85 450,90";

  // SVG paths for Telemetry curves
  const telemetryLineA = "M0,110 Q50,75 100,98 T200,85 T300,55 T380,35";
  const telemetryLineB = "M0,90 Q50,45 100,82 T200,60 T300,42 T380,18";

  return (
    <section className="py-24 bg-[#0A0A0C] border-b border-white/5 relative overflow-hidden">
      {/* Background radial gradient mesh */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FF5004] blur-[180px] opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-bold tracking-[0.2em] text-[#FF5004] uppercase font-display">Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#F5F5F7] tracking-tight mt-2.5 mb-4 font-display">
            Smarter Facility Orchestration
          </h2>
          <p className="text-base text-[#A1A1AA] leading-relaxed">
            We integrate modern telemetry and digitized audit registries to make operational transparency absolute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Success as a Service */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <SpotlightCard className="h-full bg-[#0E0E12] border border-white/5 rounded-3xl overflow-hidden p-8 flex flex-col justify-between hover:border-white/10 transition-colors">
              {/* Graphic Container */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.015] to-transparent flex items-center justify-center mb-8 border border-white/[0.04] shadow-inner">
                {/* Visual grid pattern */}
                <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />

                {/* Ambient glow behind curve */}
                <div 
                  className={`absolute w-44 h-16 rounded-full blur-2xl opacity-20 transition-colors duration-500 ${
                    toggleActive ? "bg-[#FF5004]" : "bg-zinc-600"
                  }`} 
                />

                {/* SVG Sparkline Area & Paths */}
                <svg className="absolute bottom-0 w-full h-28 overflow-visible" viewBox="0 0 450 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="sparklineOrangeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF5004" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#FF5004" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="sparklineGreyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#71717A" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#71717A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  
                  {/* Fill */}
                  <motion.path 
                    d={toggleActive ? `${risingPath} L450,100 L0,100 Z` : `${fallingPath} L450,100 L0,100 Z`}
                    fill={toggleActive ? "url(#sparklineOrangeGrad)" : "url(#sparklineGreyGrad)"}
                    transition={{ duration: 0.55, ease: "easeInOut" }}
                  />
                  {/* Stroke */}
                  <motion.path 
                    d={toggleActive ? risingPath : fallingPath}
                    fill="none" 
                    stroke={toggleActive ? "#FF5004" : "#71717A"} 
                    strokeWidth={2.5} 
                    strokeLinecap="round"
                    transition={{ duration: 0.55, ease: "easeInOut" }}
                  />

                  {/* Pulsing indicator node at the end of the sparkline */}
                  {toggleActive ? (
                    <g>
                      <motion.circle 
                        cx="450" 
                        cy="15" 
                        r="8" 
                        fill="#FF5004" 
                        opacity="0.5"
                        animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                        style={{ transformOrigin: "450px 15px" }}
                      />
                      <circle 
                        cx="450" 
                        cy="15" 
                        r="4" 
                        fill="#FF5004" 
                        stroke="#0E0E12"
                        strokeWidth="1.5"
                      />
                    </g>
                  ) : (
                    <circle 
                      cx="450" 
                      cy="90" 
                      r="4" 
                      fill="#71717A" 
                      stroke="#0E0E12"
                      strokeWidth="1.5"
                    />
                  )}
                </svg>

                {/* Premium Glassmorphic Switch */}
                <motion.div 
                  className="absolute z-10 px-4 py-2.5 rounded-2xl bg-[#0A0A0C]/80 backdrop-blur-md border border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex items-center gap-3.5 cursor-pointer select-none"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setToggleActive(!toggleActive)}
                >
                  <span className="text-xs font-semibold text-zinc-300">
                    Turn on <span className="text-[#FF5004] font-bold">Growth</span>
                  </span>
                  <div className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-300 flex items-center ${toggleActive ? "bg-[#FF5004]" : "bg-zinc-800 border border-white/5"}`}>
                    <motion.div 
                      className="w-4.5 h-4.5 rounded-full bg-white shadow-md"
                      animate={{ x: toggleActive ? 18 : 0 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  </div>
                </motion.div>

                {/* Floating Metric Badge */}
                <div 
                  className={`absolute top-4 right-4 px-2.5 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1.5 transition-all duration-300 ${
                    toggleActive 
                      ? "bg-[#FF5004]/10 border-[#FF5004]/25 text-[#FF5004] shadow-[0_2px_10px_rgba(255,80,4,0.1)]" 
                      : "bg-zinc-800/20 border-zinc-700/20 text-zinc-500"
                  }`}
                >
                  {toggleActive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {toggleActive ? "+$254K Growth" : "Baseline"}
                </div>
              </div>

              {/* Text Info */}
              <div>
                <h3 className="text-xl font-bold text-[#F5F5F7] mb-3 font-display">Success as a Service</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  We transform traditional facilities by deploying automated escalations, active tracking grids, and remote diagnostics to drive enterprise efficiency.
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Card 2: SLA-Driven Dispatch */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SpotlightCard className="h-full bg-[#0E0E12] border border-white/5 rounded-3xl overflow-hidden p-8 flex flex-col justify-between hover:border-white/10 transition-colors">
              {/* Graphic Container - Radial Speedometer Dial */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.015] to-transparent flex items-center justify-center mb-8 border border-white/[0.04] shadow-inner">
                {/* Grid backdrop */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:14px_20px]" />

                {/* Glowing radial backdrop */}
                <div className="absolute w-44 h-44 rounded-full bg-[#FF5004] blur-3xl opacity-[0.08]" />

                {/* Speedometer Gauge SVG */}
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 160 160">
                    {/* Background track circle */}
                    <circle cx="80" cy="80" r="65" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="6.5" />
                    {/* Track progress circle */}
                    <motion.circle
                      cx="80"
                      cy="80"
                      r="65"
                      fill="none"
                      stroke="#FF5004"
                      strokeWidth="6.5"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 65}
                      initial={{ strokeDashoffset: 2 * Math.PI * 65 }}
                      whileInView={{ strokeDashoffset: 2 * Math.PI * 65 * (1 - 0.998) }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
                      className="drop-shadow-[0_0_10px_rgba(255,80,4,0.5)]"
                    />
                    {/* Dashboard rotating outer dashes ring */}
                    <circle
                      cx="80"
                      cy="80"
                      r="74"
                      fill="none"
                      stroke="rgba(255, 80, 4, 0.15)"
                      strokeWidth="1.2"
                      strokeDasharray="4, 8"
                      className="animate-[spin_40s_linear_infinite]"
                    />
                  </svg>

                  {/* Absolute Center Text */}
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="font-display text-3xl font-black text-[#F5F5F7] tracking-tight">99.8%</span>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-1">SLA Compliance</span>
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div>
                <h3 className="text-xl font-bold text-[#F5F5F7] mb-3 font-display">SLA-Driven Dispatch</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Websites and operational portals so responsive that they increase team performance indices, decrease unresolved tickets, and optimize tenant engagement.
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Card 3: Telemetry Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SpotlightCard className="h-full bg-[#0E0E12] border border-white/5 rounded-3xl overflow-hidden p-8 flex flex-col justify-between hover:border-white/10 transition-colors">
              {/* Graphic Container - Scanning Grid with Dual Lines */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.015] to-transparent flex flex-col justify-end p-4 mb-8 border border-white/[0.04] shadow-inner">
                {/* Background telemetry grid */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />

                {/* Animated horizontal scanner bar */}
                <motion.div
                  className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#FF5004] to-transparent shadow-[0_0_12px_#FF5004] z-10 pointer-events-none"
                  animate={{ left: ["5%", "95%", "5%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />

                {/* Scanning float tooltip overlay */}
                <motion.div
                  className="absolute bg-[#0A0A0C]/95 border border-white/15 backdrop-blur-md px-2.5 py-1.5 rounded-lg shadow-xl text-[9px] font-bold text-[#FF5004] flex flex-col gap-0.5 z-20 pointer-events-none"
                  animate={{ 
                    left: ["8%", "66%", "8%"],
                    top: ["28%", "22%", "28%"]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  <span className="text-[#F5F5F7] text-[10px] tracking-wide">TELEMETRY</span>
                  <div className="h-px bg-white/5 w-full my-0.5" />
                  <span>SLA: 99.8%</span>
                  <span className="text-white">MEP: Stable</span>
                </motion.div>

                {/* SVG double lines chart */}
                <svg className="w-full h-32 overflow-visible" viewBox="0 0 380 180" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="curveAOrangeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF5004" stopOpacity={0.16} />
                      <stop offset="100%" stopColor="#FF5004" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="curveBAmberGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.1} />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  
                  {/* Fill Area A */}
                  <path d={`${telemetryLineA} L380,180 L0,180 Z`} fill="url(#curveAOrangeGrad)" />
                  {/* Stroke Line A */}
                  <path d={telemetryLineA} fill="none" stroke="#FF5004" strokeWidth={2} strokeLinecap="round" />
                  
                  {/* Fill Area B */}
                  <path d={`${telemetryLineB} L380,180 L0,180 Z`} fill="url(#curveBAmberGrad)" />
                  {/* Stroke Line B */}
                  <path d={telemetryLineB} fill="none" stroke="#F59E0B" strokeWidth={1.5} strokeDasharray="3, 3" strokeLinecap="round" />
                </svg>

                {/* Month labels footer */}
                <div className="flex justify-between text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-2 px-1 relative z-20">
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                </div>
              </div>

              {/* Text Info */}
              <div>
                <h3 className="text-xl font-bold text-[#F5F5F7] mb-3 font-display">Telemetry Dashboard</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Interactive compliance reporting and live charts make your metrics clear. Real-time data displays prove statutory compliance and active SLA closures instantly.
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
