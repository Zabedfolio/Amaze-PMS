"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Calendar, Maximize2, MapPin } from "lucide-react";
import clientData from "../../data/clients.json";
import servicesData from "../../data/services.json";
import statsData from "../../data/stats.json";
import GlassCard from "../../components/ui/GlassCard";
import CTABanner from "../../components/sections/CTABanner";
import GlobeScene from "../../components/three/GlobeScene";

export default function ClientsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredLogos = activeCategory === "all"
    ? clientData.logos
    : clientData.logos.filter((logo) => logo.category === activeCategory);

  const getService = (id) => {
    return servicesData.find((s) => s.id === id);
  };

  return (
    <div className="bg-[#0A0A0C] min-h-screen">
      {/* Hero Header */}
      <section className="pt-32 pb-16 border-b border-white/8 bg-gradient-to-b from-[#111114] to-[#0A0A0C] relative overflow-hidden">
        <div className="container relative z-10 flex flex-col gap-4">
          <span className="font-display text-xs font-semibold uppercase tracking-wider text-[#FF5004]">Our Portfolio</span>
          <h1 className="font-display text-[clamp(2.25rem,6vw,4rem)] font-extrabold text-[#F5F5F7] tracking-tight leading-tight max-w-4xl">
            Trusted Across 200+ Properties
          </h1>
          <p className="text-[#A1A1AA] text-[clamp(1rem,2.5vw,1.1875rem)] leading-relaxed max-w-2xl">
            From premium Cyberabad commercial towers to sprawling residential townships, we deliver compliance-driven self-performing operations.
          </p>
        </div>
      </section>

      {/* Filterable Logo Grid */}
      <section className="py-20">
        <div className="container">
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 border-b border-white/8 pb-4">
            {clientData.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-display text-sm font-semibold relative transition-colors duration-300 ${
                  activeCategory === cat.id ? "text-[#F5F5F7]" : "text-[#A1A1AA] hover:text-[#F5F5F7]"
                }`}
              >
                {cat.label}
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-[#FF5004]/10 border border-[#FF5004]/30 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Logo Grid */}
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredLogos.map((client) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={client.id}
                  className="bg-white/[0.02] border border-white/8 rounded-xl p-4 flex items-center justify-center hover:border-[#FF5004]/40 hover:bg-white/[0.04] transition-all duration-300 min-h-[90px]"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF5004] shrink-0" />
                    <span className="font-display font-semibold text-sm text-[#F5F5F7] text-center">{client.name}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Featured Case Studies Bento Grid */}
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

      {/* Locations and Geographic breakdown */}
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

      {/* CTABanner */}
      <CTABanner />
    </div>
  );
}
