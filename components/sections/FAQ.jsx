"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import styles from "./FAQ.module.scss";

const faqs = [
  {
    question: "What is Amaze PMS's self-performance commitment?",
    answer: "Unlike agencies that subcontract roles to unverified third parties, Amaze PMS recruits, trains, and manages 100% of our janitorial, engineering, and security personnel in-house. This gives clients a single point of accountability and guarantees quality controls.",
  },
  {
    question: "How does Amaze guarantee statutory compliance?",
    answer: "We ensure 100% compliance with PF, ESIC, minimum wage acts, and state labor regulations. We provide digital audit registries and proof of statutory bank transfers to client committees monthly, shielding clients from co-employer liabilities.",
  },
  {
    question: "What regions do you perform facility operations in?",
    answer: "Headquartered in HITEC City, Cyberabad, we manage properties across major commercial corridors in Telangana, Andhra Pradesh, Karnataka, Tamil Nadu, Maharashtra, and NCR. All branches operate under direct regional headquarters oversight.",
  },
  {
    question: "Do you provide specialized energy and water audits?",
    answer: "Yes. Our ex-navy engineering heads conduct comprehensive MEP load assessments, thermography tests, and STP/WTP water-reclamation efficiency audits to optimize costs and minimize resource wastage for commercial sites.",
  },
  {
    question: "How are emergency escalations handled?",
    answer: "Our Command Center operates 24/7. Client portals offer real-time ticketing with guaranteed SLA response times under 2 hours for critical engineering anomalies, backed by regional mobile support units.",
  },
];

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.open : ""}`}>
      <button className={styles.questionButton} onClick={onToggle}>
        <span className={styles.questionText}>{question}</span>
        <span className={styles.iconBox}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={styles.answerWrapper}
          >
            <p className={styles.answerText}>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <div className={styles.tagGroup}>
            <HelpCircle size={14} className={styles.tagIcon} />
            <span className={styles.tag}>Information</span>
          </div>
          <h2 className={styles.title}>Frequently Answered Questions</h2>
          <p className={styles.subtitle}>
            Clear, compliance-backed answers on our operational standards, staffing contracts, and billing audits.
          </p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
