"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  { question: "What is Amaze PMS's self-performance commitment?", answer: "Unlike agencies that subcontract roles to unverified third parties, Amaze PMS recruits, trains, and manages 100% of our janitorial, engineering, and security personnel in-house. This gives clients a single point of accountability and guarantees quality controls." },
  { question: "How does Amaze guarantee statutory compliance?", answer: "We ensure 100% compliance with PF, ESIC, minimum wage acts, and state labor regulations. We provide digital audit registries and proof of statutory bank transfers to client committees monthly, shielding clients from co-employer liabilities." },
  { question: "What regions do you perform facility operations in?", answer: "Headquartered in HITEC City, Cyberabad, we manage properties across major commercial corridors in Telangana, Andhra Pradesh, Karnataka, Tamil Nadu, Maharashtra, and NCR. All branches operate under direct regional headquarters oversight." },
  { question: "Do you provide specialized energy and water audits?", answer: "Yes. Our ex-navy engineering heads conduct comprehensive MEP load assessments, thermography tests, and STP/WTP water-reclamation efficiency audits to optimize costs and minimize resource wastage for commercial sites." },
  { question: "How are emergency escalations handled?", answer: "Our Command Center operates 24/7. Client portals offer real-time ticketing with guaranteed SLA response times under 2 hours for critical engineering anomalies, backed by regional mobile support units." },
];

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className={`border rounded-[16px] overflow-hidden transition-colors duration-300 ${isOpen ? "border-[rgba(255,80,4,0.3)] bg-[rgba(255,80,4,0.03)]" : "border-white/8 bg-transparent"}`}>
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left outline-none"
        onClick={onToggle}
      >
        <span className={`font-display text-[0.9375rem] font-semibold leading-[1.4] transition-colors duration-300 ${isOpen ? "text-[#F5F5F7]" : "text-[#A1A1AA]"}`}>
          {question}
        </span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${isOpen ? "bg-[#FF5004] border-[#FF5004] text-[#0A0A0C]" : "border-white/10 text-[#A1A1AA]"}`}>
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-[0.9375rem] text-[#A1A1AA] leading-[1.65]">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 bg-[#0A0A0C] border-b border-white/8">
      <div className="container">
        {/* Header */}
        <div className="max-w-[600px] mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-white/8 bg-white/[0.03]">
            <HelpCircle size={13} className="text-[#FF5004]" />
            <span className="font-display text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">Information</span>
          </div>
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-[#F5F5F7] tracking-[-0.02em] mb-4">
            Frequently Answered Questions
          </h2>
          <p className="text-[#A1A1AA] text-[1.0625rem] leading-[1.6]">
            Clear, compliance-backed answers on our operational standards, staffing contracts, and billing audits.
          </p>
        </div>

        {/* FAQ list */}
        <div className="max-w-[780px] mx-auto flex flex-col gap-3">
          {faqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
