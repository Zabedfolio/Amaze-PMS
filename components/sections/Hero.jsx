"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Button from "../ui/Button";

const HeroScene = dynamic(() => import("../three/HeroScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />,
});

export default function Hero() {
  const words = "Facility Management, Reimagined".split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 } },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#0A0A0C] pt-16">
      
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none bg-black/28" />

      <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-r from-[#0A0A0C] via-[#0A0A0C]/30 to-transparent" />

      <div className="container relative z-[3]">
        <motion.div
          className="max-w-[600px] flex flex-col gap-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          
          <motion.div variants={fadeUpVariants} className="w-max">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md text-xs font-semibold text-[#F5F5F7] shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5004] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5004]" />
              </span>
              <span className="font-mono uppercase tracking-wider text-[11px] text-[#A1A1AA]">
                Pan-India Self-Performing IFM Platform
              </span>
            </div>
          </motion.div>

          <h1 className="font-display font-extrabold text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1.08] tracking-[-0.02em] text-[#F5F5F7] flex flex-wrap gap-y-1">
            <span className="inline-block overflow-hidden mr-3">
              <motion.span variants={wordVariants} className="inline-block">
                Facility
              </motion.span>
            </span>
            <span className="inline-block overflow-hidden">
              <motion.span variants={wordVariants} className="inline-block">
                Management,
              </motion.span>
            </span>
            <div className="w-full h-0" aria-hidden="true" />
            <span className="inline-block overflow-hidden">
              <motion.span variants={wordVariants} className="inline-block text-[#FF5004]">
                Reimagined
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="text-[#A1A1AA] text-[clamp(1rem,2vw,1.125rem)] leading-[1.65] max-w-[520px]"
            variants={fadeUpVariants}
          >
            Pan-India self-performing facility services. Powered by 15,000+ directly employed professionals maintaining over 20 Million sq ft of premium corporate, industrial, and luxury residential real estate.
          </motion.p>

          <motion.div className="flex items-center gap-4 flex-wrap" variants={fadeUpVariants}>
            <Button 
              onClick={() => window.dispatchEvent(new CustomEvent("open-proposal", { detail: { tab: "rfp" } }))} 
              variant="primary" 
              size="lg"
            >
              Get a Free Quote
            </Button>
            <Button href="/services" variant="outline" size="lg">Explore Services</Button>
          </motion.div>

          <motion.div 
            variants={fadeUpVariants}
            className="flex items-center gap-3 flex-wrap pt-2 border-t border-white/[0.06] mt-2"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-[#FF5004]/30 hover:bg-white/[0.04] transition-all duration-300">
              <span className="font-mono text-xs font-bold text-[#FF5004]">25M+</span>
              <span className="text-[11px] font-medium text-[#A1A1AA]">Sq. Ft. Managed</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-[#FF5004]/30 hover:bg-white/[0.04] transition-all duration-300">
              <span className="font-mono text-xs font-bold text-[#FF5004]">100%</span>
              <span className="text-[11px] font-medium text-[#A1A1AA]">Statutory Compliance</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-[#FF5004]/30 hover:bg-white/[0.04] transition-all duration-300">
              <span className="font-mono text-xs font-bold text-[#FF5004]">3,500+</span>
              <span className="text-[11px] font-medium text-[#A1A1AA]">Active Staff</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]">
        <motion.div
          className="w-6 h-10 rounded-[14px] border-2 border-white/20 flex justify-center pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-white/40"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
