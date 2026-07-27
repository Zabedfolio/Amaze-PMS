"use client";

import React, { useState } from "react";
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
import styles from "./Services.module.scss";

const iconMap = {
  Bucket: Brush,
  Wrench: Wrench,
  Shield: Shield,
  Bugs: Bug,
  Grass: Flower2,
  WaterDrop: Droplets,
  LayoutGrid: Grid,
  Broom: Brush, // Swimming Pool
  FileText: FileText,
  Sparkles: Sparkles, // Deep Cleaning
};

// Expandable Accordion component for detailed service inclusions
function ServiceAccordion({ items, color }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.accordion}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.accordionHeader}
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
            className={styles.accordionContent}
          >
            <ul className={styles.checkList}>
              {items.map((item, i) => (
                <li key={i} className={styles.checkItem}>
                  <span className={styles.checkBullet} style={{ backgroundColor: color }} />
                  <span className={styles.checkText}>{item}</span>
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
    <div className={styles.servicesPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <InteractiveGrid />
        <div className={`${styles.heroContainer} container`}>
          <span className={styles.tag}>What We Do</span>
          <h1 className={styles.headline}>Comprehensive, In-House Facility Services</h1>
          <p className={styles.subheadline}>
            A single point of accountability. We recruit, train, and deploy our own personnel—covering critical security, engineering, and hygiene mandates.
          </p>
        </div>
      </section>

      {/* Services List alternating */}
      <section className={styles.listSection}>
        <div className="container">
          <div className={styles.servicesList}>
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
                  className={`${styles.serviceRow} ${isEven ? styles.rowNormal : styles.rowReverse}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={slideVariants}
                >
                  {/* Left: Graphic gradient card representing service */}
                  <div className={styles.visualCol}>
                    <div
                      className={styles.glowBox}
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${service.gradient[0]}15 0%, #17171B 100%)`,
                        border: `1px solid ${service.gradient[0]}33`,
                      }}
                    >
                      <div
                        className={styles.graphicIcon}
                        style={{
                          background: `linear-gradient(135deg, ${service.gradient[0]} 0%, ${service.gradient[1]} 100%)`,
                          boxShadow: `0 8px 30px ${service.gradient[0]}33`,
                        }}
                      >
                        <IconComp size={48} className={styles.mainIcon} />
                      </div>
                      <div className={styles.decorGrid} />
                    </div>
                  </div>

                  {/* Right: Detailed Content */}
                  <div className={styles.contentCol}>
                    <div className={styles.titleGroup}>
                      <span className={styles.orderLabel}>0{index + 1}</span>
                      <h2 className={styles.serviceName}>{service.name}</h2>
                    </div>

                    <p className={styles.serviceDesc}>{service.shortDescription}</p>

                    <div className={styles.statBox}>
                      <span className={styles.statVal} style={{ color: service.gradient[0] }}>
                        {service.stat.value}
                      </span>
                      <span className={styles.statLabel}>{service.stat.label}</span>
                    </div>

                    {/* Accordion List Inclusions */}
                    <ServiceAccordion items={service.included} color={service.gradient[0]} />

                    {/* Request CTA deep-link */}
                    <div className={styles.actionRow}>
                      <Button
                        href={`/contact?service=${service.id}`}
                        variant="secondary"
                        size="md"
                        className={styles.inlineCta}
                      >
                        <span>Request Service Proposal</span>
                        <ArrowRight size={16} className={styles.arrow} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTABanner */}
      <CTABanner />
    </div>
  );
}
