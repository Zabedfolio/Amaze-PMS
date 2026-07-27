"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Building, Award } from "lucide-react";
import SpotlightCard from "../ui/SpotlightCard";

export default function FeatureCards() {
  const [toggleActive, setToggleActive] = useState(true);

  // SVG wave paths
  // Rising curve (Ends high: near Y=10)
  const risingPath = "M0,90 C60,95 120,60 180,85 C240,110 300,50 360,25 C400,10 420,-5 450,-30";
  // Falling curve (Ends low: near Y=90)
  const fallingPath = "M0,25 C60,20 120,40 180,32 C240,15 300,55 360,60 C400,75 420,85 450,110";
  
  const greenCurvePath = "M0,90 Q45,30 90,75 T180,50 T270,32 T360,20 L360,180 L0,180 Z";
  const orangeCurvePath = "M0,110 Q45,70 90,95 T180,82 T270,68 T360,40 L360,180 L0,180 Z";

  return (
    <section className="py-24 bg-black border-b border-white/5 relative overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-accent/5 to-transparent pointer-events-none blur-3xl" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-semibold tracking-wider text-accent uppercase font-display">Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-2 mb-4 font-display">
            Smarter Facility Orchestration
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
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
            <SpotlightCard className="h-full bg-[#0d0d10] border border-white/5 rounded-3xl overflow-hidden p-8 flex flex-col justify-between">
              {/* Graphic Container */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent flex items-center justify-center mb-8 border border-white/[0.03]">
                {/* Dynamic colored background aura behind the glass container */}
                <div 
                  className={`absolute w-36 h-20 rounded-full blur-2xl opacity-25 transition-colors duration-500 ${
                    toggleActive ? "bg-emerald-500" : "bg-accent"
                  }`} 
                />

                {/* SVG Sparkline Background with smooth dynamic path rendering */}
                <svg className="absolute bottom-0 w-full h-24 overflow-visible" viewBox="0 0 450 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="sparklineGradGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="sparklineGradOrange" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF5004" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#FF5004" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  
                  {/* Dynamic fill under the curve */}
                  <motion.path 
                    d={toggleActive ? `${risingPath} L450,100 L0,100 Z` : `${fallingPath} L450,100 L0,100 Z`}
                    fill={toggleActive ? "url(#sparklineGradGreen)" : "url(#sparklineGradOrange)"}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                  {/* Dynamic stroke path */}
                  <motion.path 
                    d={toggleActive ? risingPath : fallingPath}
                    fill="none" 
                    stroke={toggleActive ? "#10B981" : "#FF5004"} 
                    strokeWidth={3} 
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </svg>

                {/* Floating Glassmorphic Toggle Box */}
                <motion.div 
                  className="absolute z-10 px-5 py-3 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-4 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setToggleActive(!toggleActive)}
                >
                  <span className="text-sm font-medium text-zinc-300">
                    Turn on <span className="text-accent font-semibold">Growth</span>
                  </span>
                  <div className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 ${toggleActive ? "bg-accent" : "bg-zinc-700"}`}>
                    <div 
                      className="w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300"
                      style={{ transform: `translateX(${toggleActive ? "20px" : "0px"})` }}
                    />
                  </div>
                </motion.div>

                {/* Micro badge indicator (dynamic green up / orange down) */}
                <div 
                  className={`absolute top-4 right-4 px-2.5 py-1 rounded-full border text-[10px] font-bold flex items-center gap-1 transition-all duration-300 ${
                    toggleActive 
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                      : "bg-accent/10 border-accent/20 text-accent"
                  }`}
                >
                  {toggleActive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {toggleActive ? "+$254K" : "-$154K"}
                </div>
              </div>

              {/* Text Info */}
              <div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">Success as a Service</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  We transform traditional facilities by deploying automated escalations, active tracking grids, and remote diagnostics to drive enterprise efficiency.
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Card 2: Conversion-Focused SLA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SpotlightCard className="h-full bg-[#0d0d10] border border-white/5 rounded-3xl overflow-hidden p-8 flex flex-col justify-between">
              {/* Graphic Container */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent flex items-center justify-center mb-8 border border-white/[0.03]">
                {/* Visual grid mockup overlay */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />

                {/* Floating Progress Bar Panel */}
                <motion.div 
                  className="w-10/12 p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col items-center"
                  initial={{ scale: 0.95 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-3xl font-extrabold text-white tracking-tight font-display">99.8%</span>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">SLA Compliance Rate</span>
                  
                  {/* Glowing Orange Progress Bar */}
                  <div className="w-full h-2.5 bg-white/10 rounded-full mt-4 overflow-hidden relative">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-accent to-orange-400 rounded-full shadow-[0_0_12px_rgba(255,80,4,0.6)]"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "99.8%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Text Info */}
              <div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">SLA-Driven Dispatch</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Websites and operational portals so responsive that they increase team performance indices, decrease unresolved tickets, and optimize tenant engagement.
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Card 3: Stats Speak for Themselves */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SpotlightCard className="h-full bg-[#0d0d10] border border-white/5 rounded-3xl overflow-hidden p-8 flex flex-col justify-between">
              {/* Graphic Container */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent flex flex-col justify-end p-4 mb-8 border border-white/[0.03]">
                {/* SVG Area overlapping curves */}
                <svg className="w-full h-32 overflow-visible" viewBox="0 0 360 180" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="greenFillGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="orangeFillGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF5004" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#FF5004" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  
                  {/* Bottom Orange Area */}
                  <path d={orangeCurvePath} fill="url(#orangeFillGrad)" />
                  <path d="M0,110 Q45,70 90,95 T180,82 T270,68 T360,40" fill="none" stroke="#FF5004" strokeWidth={2.5} />
                  
                  {/* Top Green Area */}
                  <path d={greenCurvePath} fill="url(#greenFillGrad)" />
                  <path d="M0,90 Q45,30 90,75 T180,50 T270,32 T360,20" fill="none" stroke="#10B981" strokeWidth={2.5} />
                </svg>

                {/* Month labels footer */}
                <div className="flex justify-between text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-2 px-1">
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
                <h3 className="text-xl font-bold text-white mb-3 font-display">Telemetry Dashboard</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
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
