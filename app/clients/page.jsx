"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Calendar, Maximize2, MapPin, BarChart3, Users, Building2, HelpCircle } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import clientData from "../../data/clients.json";
import servicesData from "../../data/services.json";
import statsData from "../../data/stats.json";
import GlassCard from "../../components/ui/GlassCard";
import CTABanner from "../../components/sections/CTABanner";
import GlobeScene from "../../components/three/GlobeScene";
import AnimatedCounter from "../../components/ui/AnimatedCounter";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#0A0A0C]/96 border border-white/10 backdrop-blur-md px-4 py-3 rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.8)] border-[#FF5004]/25">
        <p className="font-display text-xs font-extrabold text-[#F5F5F7] tracking-wide mb-1.5 uppercase">{data.name}</p>
        <div className="h-px bg-white/5 w-full my-1.5" />
        <p className="font-sans text-[11px] font-semibold text-[#FF5004] tracking-wide">
          MANAGED SHARE: <span className="text-[#F5F5F7] font-mono text-xs">{data.value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.04,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 10, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

export default function ClientsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getService = (id) => {
    return servicesData.find((s) => s.id === id);
  };

  const getClientsByCategory = (catId) => {
    return clientData.fullClientList[catId] || [];
  };

  return (
    <div className="bg-[#0A0A0C] min-h-screen">
      
      <section className="pt-32 pb-16 border-b border-white/8 bg-gradient-to-b from-[#111114] to-[#0A0A0C] relative overflow-hidden">
        
        <span className="absolute top-0 right-[20%] w-[450px] h-[450px] rounded-full bg-[#FF5004] blur-[160px] opacity-[0.04] pointer-events-none" />

        <div className="container relative z-10 flex flex-col gap-4">
          <span className="font-display text-xs font-semibold uppercase tracking-wider text-[#FF5004]">Our Clients</span>
          <h1 className="font-display text-[clamp(2.25rem,6vw,4rem)] font-extrabold text-[#F5F5F7] tracking-tight leading-tight max-w-4xl">
            Trusted Portfolios & Partnerships
          </h1>
          <p className="text-[#A1A1AA] text-[clamp(1rem,2.5vw,1.1875rem)] leading-relaxed max-w-2xl">
            From large corporate tech parks to luxury housing complexes, Amaze PMS delivers reliable, self-performing property management services.
          </p>
        </div>
      </section>

      <section className="py-20 border-b border-white/5 relative bg-[#0D0D10]/40">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            <div className="lg:col-span-5 flex flex-col justify-between gap-8">
              <div>
                <span className="font-display text-xs font-semibold uppercase tracking-wider text-[#FF5004]">Market Distribution</span>
                <h2 className="font-display text-3xl font-extrabold text-[#F5F5F7] tracking-tight mt-2 mb-4">Action Group Portfolio Division</h2>
                <p className="text-[#A1A1AA] text-[15px] leading-relaxed mb-6">
                  Amaze PMS supports major industrial sectors across India, providing integrated housekeeping, security, and complex MEP services. The chart represents the current division of action properties managed under our operational network.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white/[0.015] border border-white/5 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[#FF5004]">
                    <Building2 size={16} />
                    <span className="font-display text-[10px] font-bold uppercase tracking-wider text-[#A1A1AA]">Managed Properties</span>
                  </div>
                  <span className="font-display text-3xl font-black text-[#F5F5F7] tracking-tight">
                    <AnimatedCounter value={200} suffix="+" />
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.015] border border-white/5 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[#FF5004]">
                    <Users size={16} />
                    <span className="font-display text-[10px] font-bold uppercase tracking-wider text-[#A1A1AA]">Direct Workforce</span>
                  </div>
                  <span className="font-display text-3xl font-black text-[#F5F5F7] tracking-tight">
                    <AnimatedCounter value={15000} suffix="+" />
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <GlassCard className="p-6 md:p-8 flex flex-col justify-center h-full relative" hoverEffect={false}>
                
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5004]/2 to-transparent opacity-30 rounded-2xl pointer-events-none" />
                
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#F5F5F7] mb-6 text-center border-b border-white/5 pb-4">
                  Operations Breakdown by Sector Share
                </h3>

                <div className="w-full h-[320px] flex items-center justify-center">
                  {mounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={clientData.distribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={65}
                          outerRadius={105}
                          paddingAngle={3}
                          dataKey="value"
                          animationDuration={800}
                        >
                          {clientData.distribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="#111114" strokeWidth={2.5} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend 
                          verticalAlign="middle" 
                          align="right" 
                          layout="vertical"
                          iconType="circle"
                          iconSize={8}
                          wrapperStyle={{
                            paddingLeft: "15px",
                            fontFamily: "var(--font-display)",
                            fontSize: "11px",
                            fontWeight: "500",
                            color: "#A1A1AA"
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-6 h-6 border-2 border-[#FF5004]/10 border-t-[#FF5004] rounded-full animate-spin" />
                      <span className="text-xs text-[#A1A1AA] font-mono">Initializing graph...</span>
                    </div>
                  )}
                </div>
              </GlassCard>
            </div>

          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <span className="font-display text-xs font-semibold uppercase tracking-wider text-[#FF5004]">Client Directory</span>
            <h2 className="font-display text-3xl font-extrabold text-[#F5F5F7] tracking-tight mt-2 mb-3">Enterprise Properties Directory</h2>
            <p className="text-[#A1A1AA] text-base leading-relaxed">
              Explore some of the prominent corporate structures, commercial parks, residential communities, and pharma operations managed under our self-performing model.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-start gap-2.5 mb-14 border-b border-white/5 pb-6">
            {clientData.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-display text-xs font-bold uppercase tracking-wider relative transition-colors duration-300 ${
                  activeCategory === cat.id ? "text-[#F5F5F7]" : "text-[#A1A1AA] hover:text-[#F5F5F7]"
                }`}
              >
                {cat.label}
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeDirectoryTabIndicator"
                    className="absolute inset-0 bg-[#FF5004]/10 border border-[#FF5004]/30 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-12"
              >
                
                {activeCategory === "all" ? (
                  clientData.categories
                    .filter((cat) => cat.id !== "all")
                    .map((cat) => {
                      const clients = getClientsByCategory(cat.id);
                      if (clients.length === 0) return null;
                      return (
                        <div key={cat.id} className="border-b border-white/5 pb-10 last:border-b-0 last:pb-0">
                          <h3 className="font-display text-xl font-extrabold text-[#F5F5F7] tracking-tight mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-6 rounded-full bg-[#FF5004]" />
                            <span>{cat.label}</span>
                            <span className="text-xs text-[#A1A1AA] font-mono font-medium">({clients.length} Properties)</span>
                          </h3>

                          <motion.div
                            variants={listContainerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2"
                          >
                            {clients.map((client, index) => (
                              <motion.div
                                key={index}
                                variants={listItemVariants}
                                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                                className="flex items-center gap-3 py-2 px-2.5 rounded-lg hover:bg-white/[0.03] border border-transparent hover:border-white/[0.06] transition-colors duration-200 group cursor-default"
                              >
                                <span className="font-mono text-xs font-semibold text-[#FF5004]/50 group-hover:text-[#FF5004] group-hover:font-bold transition-all duration-200 w-5 text-right shrink-0">
                                  {index + 1}.
                                </span>
                                <span className="font-display text-[13.5px] font-medium text-[#A1A1AA] group-hover:text-[#F5F5F7] transition-colors duration-200 leading-tight">
                                  {client}
                                </span>
                              </motion.div>
                            ))}
                          </motion.div>
                        </div>
                      );
                    })
                ) : (
                  
                  <div>
                    <h3 className="font-display text-2xl font-extrabold text-[#F5F5F7] tracking-tight mb-8 flex items-center gap-3.5">
                      <span className="w-2 h-7 rounded-full bg-[#FF5004]" />
                      <span>{clientData.categories.find(c => c.id === activeCategory)?.label}</span>
                      <span className="text-sm text-[#A1A1AA] font-mono font-medium">
                        ({getClientsByCategory(activeCategory).length} Managed Assets)
                      </span>
                    </h3>

                    <motion.div
                      variants={listContainerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3"
                    >
                      {getClientsByCategory(activeCategory).map((client, index) => (
                        <motion.div
                          key={index}
                          variants={listItemVariants}
                          whileHover={{ x: 4, scale: 1.01, transition: { duration: 0.2 } }}
                          className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.015] border border-white/5 hover:border-[#FF5004]/35 hover:bg-[#FF5004]/[0.03] hover:shadow-[0_4px_20px_rgba(255,80,4,0.06)] transition-all duration-200 group cursor-default"
                        >
                          <span className="font-mono text-xs font-bold text-[#FF5004] bg-[#FF5004]/10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#FF5004] group-hover:text-[#F5F5F7] transition-colors duration-200">
                            {index + 1}
                          </span>
                          <span className="font-display text-[14px] font-semibold text-[#A1A1AA] group-hover:text-[#F5F5F7] transition-colors duration-200 leading-tight">
                            {client}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111114] border-t border-b border-white/8">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <span className="font-display text-xs font-semibold uppercase tracking-wider text-[#FF5004]">Impact Studies</span>
            <h2 className="font-display text-3xl font-extrabold text-[#F5F5F7] tracking-tight mt-2 mb-3">Featured Operational Outcomes</h2>
            <p className="text-[#A1A1AA] text-base leading-relaxed">How we optimize costs, ensure regulatory compliance, and reduce energy loads on sites.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clientData.caseStudies.map((study) => (
              <GlassCard key={study.id} className="p-8 flex flex-col justify-between" hoverEffect>
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-display text-lg font-bold text-[#F5F5F7]">{study.propertyName}</h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/8 text-xs text-[#A1A1AA] font-mono shrink-0">
                      <Maximize2 size={12} />
                      <span>{study.sqft}</span>
                    </span>
                  </div>

                  <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                    <strong className="text-[#F5F5F7]">Outcome:</strong> {study.outcome}
                  </p>
                </div>

                <div className="border-t border-white/8 pt-4 mt-4">
                  <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-3">Services Deployed:</h4>
                  <div className="flex flex-wrap gap-2">
                    {study.servicesProvided.map((serviceId) => {
                      const service = getService(serviceId);
                      return service ? (
                        <span key={serviceId} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/8 text-xs text-[#F5F5F7]">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: service.gradient[0] }}
                          />
                          {service.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="bg-[#17171B] border border-white/8 rounded-2xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <MapPin size={24} className="text-teal-400" />
                <h3 className="font-display text-2xl font-bold text-[#F5F5F7]">Pan-India Regional Operations</h3>
              </div>
              <p className="text-[#A1A1AA] text-base leading-relaxed">
                Action Group coordinates regional facility services from our HITEC City HQ. We self-perform in all major business corridors using directly managed regional teams, auditing offices daily.
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                {statsData.regionalPresence.map((loc, idx) => (
                  <div key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/8 text-xs text-[#F5F5F7]">
                    <span className={loc.isHQ ? "w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_6px_#2dd4bf]" : "w-2 h-2 rounded-full bg-[#A1A1AA]"} />
                    <span>{loc.location}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full h-[320px] rounded-xl overflow-hidden relative">
              <GlobeScene />
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
