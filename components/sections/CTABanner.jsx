"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

export default function CTABanner() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#0A0A0C]">
      <div className="container">
        <motion.div
          className="relative rounded-[24px] overflow-hidden border border-white/8 bg-[#111114] p-12 md:p-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-[#FF5004] to-transparent opacity-60 pointer-events-none" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[rgba(255,80,4,0.06)] blur-[90px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-[720px] mx-auto">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5004]/10 border border-[#FF5004]/30 backdrop-blur-md text-xs font-semibold text-[#FF5004]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5004]" />
              <span className="font-mono uppercase tracking-wider text-[11px]">
                Ex-Navy Leadership & Zero-Cost Audits
              </span>
            </div>

            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold text-[#F5F5F7] leading-[1.1] tracking-[-0.02em]">
              Ready to Re-engineer Your Property Operations?
            </h2>
            <p className="text-[#A1A1AA] text-[clamp(1rem,2vw,1.0625rem)] leading-[1.65] max-w-[560px]">
              Schedule a comprehensive facility audit with our ex-navy practitioners. We will evaluate your MEP loads, STP compliance, and security frameworks with zero obligation.
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center mt-2">
              <Button 
                onClick={() => window.dispatchEvent(new CustomEvent("open-proposal", { detail: { tab: "rfp" } }))} 
                variant="primary" 
                size="lg"
              >
                Request Custom Proposal
              </Button>
              <Button 
                onClick={() => window.dispatchEvent(new CustomEvent("open-proposal", { detail: { tab: "book" } }))} 
                variant="outline" 
                size="lg"
              >
                Book Virtual Audit
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
