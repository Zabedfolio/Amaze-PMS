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
    <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-[#0A0A0C]">
      {/* 3D canvas — fills right half */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Gradient fade protecting left text */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-[#0A0A0C] via-[#0A0A0C]/80 to-transparent" />

      <div className="container relative z-[2]">
        <motion.div
          className="max-w-[600px] flex flex-col gap-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Headline — line 1: "Facility Management," | line 2: "Reimagined" */}
          <h1 className="font-display font-extrabold text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1.08] tracking-[-0.02em]">
            <span className="block overflow-hidden whitespace-nowrap">
              {["Facility", "Management,"].map((word, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block text-[#F5F5F7] mr-3 last:mr-0">
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={wordVariants} className="inline-block text-[#FF5004]">
                Reimagined
              </motion.span>
            </span>
          </h1>

          {/* Description */}
          <motion.p
            className="text-[#A1A1AA] text-[clamp(1rem,2vw,1.125rem)] leading-[1.65] max-w-[520px]"
            variants={fadeUpVariants}
          >
            Pan-India self-performing facility services. Powered by 15,000+ directly employed professionals maintaining over 20 Million sq ft of premium corporate, industrial, and luxury residential real estate.
          </motion.p>

          {/* CTAs */}
          <motion.div className="flex items-center gap-4 flex-wrap" variants={fadeUpVariants}>
            <Button href="/contact" variant="primary" size="lg">Get a Free Quote</Button>
            <Button href="/services" variant="outline" size="lg">Explore Services</Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
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
