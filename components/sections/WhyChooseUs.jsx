"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, ClipboardCheck, Award, Zap } from "lucide-react";
import SpotlightCard from "../ui/SpotlightCard";

const differentiators = [
  { icon: ShieldCheck,    title: "100% In-House Capacity",      desc: "We directly recruit, train, and manage all facility personnel. Zero subcontracting guarantees absolute accountability, secure background verifications, and quality control.", color: "#FF5004" },
  { icon: ClipboardCheck, title: "Statutory Compliance Shield", desc: "We provide monthly PF, ESIC, and minimum wage bank Challans to client committees before billing clearance. This protects your enterprise from labor compliance liabilities.", color: "#E8A94A" },
  { icon: Award,          title: "Military-Grade Leadership",   desc: "Founded and managed by ex-Indian Navy practitioners and certified security auditors, enforcing strict adherence to disciplined Standard Operating Procedures (SOPs).", color: "#FF5004" },
  { icon: Zap,            title: "24/7 Active Command Center",  desc: "Central escalation desk with real-time tracking, ensuring critical engineering anomalies or security issues are resolved with guaranteed under-2-hour SLA response times.", color: "#E8A94A" },
];

export default function WhyChooseUs() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section ref={containerRef} className="py-28 bg-[#111114] border-b border-white/8">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-start">

          <div className="flex flex-col gap-6 lg:sticky lg:top-28">
            <span className="font-display text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-[#FF5004]">Differentiators</span>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold text-[#F5F5F7] tracking-[-0.02em] leading-[1.1]">
              Why Industry Leaders Partner With Amaze
            </h2>
            <p className="text-[#A1A1AA] text-[1.0625rem] leading-[1.65]">
              We do not act as middleware brokers. We perform and stand behind our own facility service logs.
            </p>
            <div className="flex flex-col gap-3 mt-2">
              {["15,000+ Verified In-House Staff", "ISO 9001:2015 & 14001:2015 Standards", "Digitized SLA Audit Registries"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5004] shadow-[0_0_6px_#FF5004] flex-shrink-0" />
                  <span className="text-[0.9375rem] text-[#A1A1AA]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {differentiators.map((diff, index) => {
              const IconComp = diff.icon;
              return (
                <motion.div key={index} variants={cardVariants}>
                  <SpotlightCard>
                    <div className="p-6 flex flex-col gap-4 h-full">
                      <div
                        className="w-12 h-12 rounded-[12px] flex items-center justify-center border flex-shrink-0"
                        style={{ borderColor: `${diff.color}33` }}
                      >
                        <IconComp size={24} style={{ color: diff.color }} />
                      </div>
                      <h3 className="font-display text-[1.0625rem] font-bold text-[#F5F5F7] tracking-[-0.01em]">{diff.title}</h3>
                      <p className="text-[0.875rem] text-[#A1A1AA] leading-[1.65]">{diff.desc}</p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
