"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, ClipboardCheck, Award, Zap } from "lucide-react";
import SpotlightCard from "../ui/SpotlightCard";
import styles from "./WhyChooseUs.module.scss";

const differentiators = [
  {
    icon: ShieldCheck,
    title: "100% In-House Capacity",
    desc: "We directly recruit, train, and manage all facility personnel. Zero subcontracting guarantees absolute accountability, secure background verifications, and quality control.",
    color: "#FF5004",
  },
  {
    icon: ClipboardCheck,
    title: "Statutory Compliance Shield",
    desc: "We provide monthly PF, ESIC, and minimum wage bank Challans to client committees before billing clearance. This protects your enterprise from labor compliance liabilities.",
    color: "#E8A94A",
  },
  {
    icon: Award,
    title: "Military-Grade Leadership",
    desc: "Founded and managed by ex-Indian Navy practitioners and certified security auditors, enforcing strict adherence to disciplined Standard Operating Procedures (SOPs).",
    color: "#FF5004",
  },
  {
    icon: Zap,
    title: "24/7 Active Command Center",
    desc: "Central escalation desk with real-time tracking, ensuring critical engineering anomalies or security issues are resolved with guaranteed under-2-hour SLA response times.",
    color: "#E8A94A",
  },
];

export default function WhyChooseUs() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section ref={containerRef} className={styles.whySection}>
      <div className={`${styles.container} container`}>
        <div className={styles.grid}>
          {/* Left Column: Title Block */}
          <div className={styles.leftCol}>
            <span className={styles.tag}>Differentiators</span>
            <h2 className={styles.headline}>Why Industry Leaders Partner With Amaze</h2>
            <p className={styles.subtitle}>
              We do not act as middleware brokers. We perform and stand behind our own facility service logs.
            </p>
            
            <div className={styles.bulletsList}>
              <div className={styles.bulletItem}>
                <span className={styles.bulletCheck} />
                <span>15,000+ Verified In-House Staff</span>
              </div>
              <div className={styles.bulletItem}>
                <span className={styles.bulletCheck} />
                <span>ISO 9001:2015 & 14001:2015 Standards</span>
              </div>
              <div className={styles.bulletItem}>
                <span className={styles.bulletCheck} />
                <span>Digitized SLA Audit Registries</span>
              </div>
            </div>
          </div>

          {/* Right Column: Grid Cards */}
          <motion.div 
            className={styles.rightCol}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {differentiators.map((diff, index) => {
              const IconComp = diff.icon;
              return (
                <motion.div 
                  key={index} 
                  variants={cardVariants}
                  className={styles.cardWrapper}
                >
                  <SpotlightCard>
                    <div className={styles.diffCard}>
                      <div className={styles.iconBox} style={{ borderColor: `${diff.color}33` }}>
                        <IconComp size={24} style={{ color: diff.color }} />
                      </div>
                      <h3 className={styles.cardTitle}>{diff.title}</h3>
                      <p className={styles.cardDesc}>{diff.desc}</p>
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
