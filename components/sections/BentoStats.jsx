"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Shield, Building, Globe, Award, MapPin } from "lucide-react";
import statsData from "../../data/stats.json";
import SpotlightCard from "../ui/SpotlightCard";

function Counter({ end, duration = 1.5, suffix = "" }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const inView = useInView(elementRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(animate);
      }
    };

    window.requestAnimationFrame(animate);
  }, [end, duration, inView]);

  return <span ref={elementRef}>{count.toLocaleString()}{suffix}</span>;
}

export default function BentoStats() {
  const [isMounted, setIsMounted] = useState(false);
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-40px" });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="py-28 bg-[#0A0A0C] border-b border-white/8 relative">
      <div className="container">
        <div className="max-w-[600px] mx-auto text-center mb-14">
          <span className="font-display text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-[#FF5004]">Metrics</span>
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-extrabold text-[#F5F5F7] tracking-[-0.02em] mt-2 mb-4">Amaze at a Glance</h2>
          <p className="text-[#A1A1AA] text-base leading-relaxed">
            Precision operations, audited compliance, and continuous growth across India's premium portfolios.
          </p>
        </div>

        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* 1. Main Huge Stat Card */}
          <motion.div className="md:col-span-8" variants={itemVariants}>
            <SpotlightCard className="min-h-[320px]">
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                    <Shield size={20} className="text-teal-400" />
                  </div>
                  <span className="font-display text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Operational Force</span>
                </div>
                <div className="font-display text-[clamp(2.5rem,6vw,4rem)] font-extrabold text-[#F5F5F7] leading-none mb-3">
                  <Counter end={15000} suffix="+" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#F5F5F7] mb-2">Directly Employed Professionals</h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed max-w-xl">
                  Our personnel are 100% in-house. We do not subcontract. Every housekeeper, MEP technician, and guard is directly audited, compliant, and fully insured.
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* 2. Recharts Area Chart Card */}
          <motion.div className="md:col-span-4" variants={itemVariants}>
            <SpotlightCard className="min-h-[320px]">
              <div className="p-8 flex flex-col h-full justify-between">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                    <Building size={20} className="text-[#FF5004]" />
                  </div>
                  <span className="font-display text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Managed Footprint Growth</span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-display text-3xl font-extrabold text-[#F5F5F7]"><Counter end={20} suffix="M+" /></span>
                  <span className="text-xs font-medium text-[#A1A1AA]">Sq. Ft. Area</span>
                </div>
                
                <div className="w-full h-[120px] mt-auto">
                  {isMounted && gridInView && (
                    <ResponsiveContainer width="100%" height={120}>
                      <AreaChart data={statsData.growthChart} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <defs>
                          <linearGradient id="colorSqft" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF5004" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#FF5004" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="year" stroke="#A1A1AA" fontSize={10} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{ background: "#17171B", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px" }}
                          labelStyle={{ color: "#A1A1AA", fontSize: 11 }}
                          itemStyle={{ color: "#FF5004", fontSize: 12, fontWeight: "bold" }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="sqft" 
                          name="Sqft (Millions)" 
                          stroke="#FF5004" 
                          strokeWidth={2} 
                          fillOpacity={1} 
                          fill="url(#colorSqft)"
                          isAnimationActive={true}
                          animationDuration={1800}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* 3. Pie Chart / Service Mix Card */}
          <motion.div className="md:col-span-4" variants={itemVariants}>
            <SpotlightCard className="min-h-[320px]">
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                    <Award size={20} className="text-pink-400" />
                  </div>
                  <span className="font-display text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Service Mix Breakdown</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 my-auto">
                  <div className="w-full sm:w-1/2 h-[110px]">
                    {isMounted && gridInView && (
                      <ResponsiveContainer width="100%" height={110}>
                        <PieChart>
                          <Pie
                            data={statsData.serviceMix}
                            innerRadius={35}
                            outerRadius={50}
                            paddingAngle={3}
                            dataKey="value"
                            isAnimationActive={true}
                            animationDuration={1500}
                          >
                            {statsData.serviceMix.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full sm:w-1/2">
                    {statsData.serviceMix.slice(0, 4).map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                        <span className="text-xs text-[#A1A1AA] truncate">{entry.name} ({entry.value}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* 4. Regional Presence Map / Locations Card */}
          <motion.div className="md:col-span-8" variants={itemVariants}>
            <SpotlightCard className="min-h-[320px]">
              <div className="p-8 flex flex-col h-full justify-between">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Globe size={20} className="text-blue-400" />
                  </div>
                  <span className="font-display text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Pan-India Footprint</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-lg font-bold text-[#F5F5F7]">HQ: Cyberabad, Hyderabad</h3>
                    <p className="text-[#A1A1AA] text-sm leading-relaxed">
                      We operate fully staffed regional divisions in key metros, allowing us to deploy and oversee property service audits nationwide with zero subcontracts.
                    </p>
                    <div className="flex flex-col mt-2">
                      <span className="font-display text-2xl font-extrabold text-[#F5F5F7]"><Counter end={200} suffix="+" /></span>
                      <span className="text-xs uppercase tracking-wider text-[#A1A1AA]">Active Portfolios Cared For</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {statsData.regionalPresence.map((loc, i) => (
                      <div key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/8 text-xs text-[#F5F5F7]">
                        <MapPin size={14} className={loc.isHQ ? "text-teal-400" : "text-[#A1A1AA]"} />
                        <span>{loc.location}</span>
                        {loc.isHQ && <span className="text-[10px] font-bold uppercase px-1 py-0.5 rounded bg-teal-500/20 text-teal-300">HQ</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
