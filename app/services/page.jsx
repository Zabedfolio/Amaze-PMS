"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brush,
  Wrench,
  Shield,
  Bug,
  Flower2,
  Droplets,
  Grid,
  Sparkles,
  FileText,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import servicesData from "../../data/services.json";
import Button from "../../components/ui/Button";
import CTABanner from "../../components/sections/CTABanner";
import InteractiveGrid from "../../components/ui/InteractiveGrid";

const iconMap = {
  Bucket: Brush,
  Wrench: Wrench,
  Shield: Shield,
  Bugs: Bug,
  Grass: Flower2,
  WaterDrop: Droplets,
  LayoutGrid: Grid,
  Broom: Brush,
  FileText: FileText,
  Sparkles: Sparkles,
};

function ServiceAccordion({ items, color }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/8 rounded-xl bg-white/[0.005] mb-7 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 bg-none border-none flex justify-between items-center text-[#F5F5F7] font-display text-sm font-semibold cursor-pointer outline-none hover:bg-white/[0.02] transition-colors"
        style={{
          borderBottom: `1px solid ${isOpen ? color + "44" : "rgba(255,255,255,0.06)"}`,
        }}
      >
        <span>View Full Inclusions Checklist</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={18} style={{ color }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="p-5 bg-black/10 overflow-hidden"
          >
            <ul className="list-none flex flex-col gap-3">
              {items.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0 shadow-[0_0_4px_currentColor]" style={{ backgroundColor: color }} />
                  <span className="text-sm text-[#A1A1AA] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="bg-[#0A0A0C] min-h-screen">
      
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#111114] to-[#0A0A0C] border-b border-white/8">
        <InteractiveGrid />
        <div className="container relative z-10 flex flex-col gap-4">
          <span className="font-display text-xs font-semibold uppercase tracking-wider text-[#FF5004]">What We Do</span>
          <h1 className="font-display text-[clamp(2.25rem,6vw,4rem)] font-extrabold text-[#F5F5F7] tracking-tight leading-tight max-w-4xl">
            Comprehensive, In-House Facility Services
          </h1>
          <p className="text-[#A1A1AA] text-[clamp(1rem,2.5vw,1.1875rem)] leading-relaxed max-w-2xl">
            A single point of accountability. We recruit, train, and deploy our own personnel—covering critical security, engineering, and hygiene mandates.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="flex flex-col gap-28 md:gap-32">
            {servicesData.map((service, index) => {
              const IconComp = iconMap[service.icon] || Wrench;
              const isEven = index % 2 === 0;

              const slideVariants = {
                hidden: { opacity: 0, x: isEven ? -60 : 60 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                },
              };

              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={slideVariants}
                >
                  
                  <div className="w-full lg:w-[44%] shrink-0">
                    <div
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group/image"
                      style={{
                        border: `1px solid ${service.gradient[0]}33`,
                      }}
                    >
                      <Image
                        src={service.cardImage}
                        alt={service.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover/image:scale-110"
                        sizes="(max-width: 1024px) 100vw, 44vw"
                        priority={index < 2}
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/90 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover/image:opacity-40" />
                      
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-[3px]"
                        style={{
                          background: `linear-gradient(90deg, ${service.gradient[0]}, ${service.gradient[1]})`
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="font-display text-xl font-extrabold text-[#FF5004]">0{index + 1}</span>
                      <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-[#F5F5F7] tracking-tight">{service.name}</h2>
                    </div>

                    <p className="text-[#A1A1AA] text-base leading-relaxed mb-6">{service.shortDescription}</p>

                    <div className="flex flex-col mb-6">
                      <span className="font-display text-2xl font-extrabold leading-none" style={{ color: service.gradient[0] }}>
                        {service.stat.value}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mt-1">{service.stat.label}</span>
                    </div>

                    <ServiceAccordion items={service.included} color={service.gradient[0]} />

                    <div className="flex">
                      <Button
                        onClick={() => window.dispatchEvent(new CustomEvent("open-proposal", { detail: { service: service.name } }))}
                        variant="secondary"
                        size="md"
                        className="inline-flex items-center gap-2 group"
                      >
                        <span>Request Service Proposal</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
