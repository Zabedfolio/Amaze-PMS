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
import styles from "./Clients.module.scss";

export default function ClientsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredLogos = activeCategory === "all"
    ? clientData.logos
    : clientData.logos.filter((logo) => logo.category === activeCategory);

  // Map service ID to service details helper
  const getService = (id) => {
    return servicesData.find((s) => s.id === id);
  };

  return (
    <div className={styles.clientsPage}>
      {/* Hero Header */}
      <section className={styles.heroSection}>
        <div className={`${styles.heroContainer} container`}>
          <span className={styles.tag}>Our Portfolio</span>
          <h1 className={styles.headline}>Trusted Across 200+ Properties</h1>
          <p className={styles.subheadline}>
            From premium Cyberabad commercial towers to sprawling residential townships, we deliver compliance-driven self-performing operations.
          </p>
        </div>
      </section>

      {/* Filterable Logo Grid */}
      <section className={styles.logosSection}>
        <div className={`${styles.logosContainer} container`}>
          {/* Tabs */}
          <div className={styles.tabsList}>
            {clientData.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`${styles.tabBtn} ${activeCategory === cat.id ? styles.activeTab : ""}`}
              >
                {cat.label}
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className={styles.tabIndicator}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Logo Grid */}
          <motion.div layout className={styles.logoGrid}>
            <AnimatePresence mode="popLayout">
              {filteredLogos.map((client) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={client.id}
                  className={styles.logoCard}
                >
                  <div className={styles.logoBadge}>
                    <span className={styles.badgeDot} />
                    <span className={styles.badgeName}>{client.name}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Featured Case Studies Bento Grid */}
      <section className={styles.casesSection}>
        <div className={`${styles.casesContainer} container`}>
          <div className={styles.sectionHeader}>
            <span className={styles.secTag}>Impact Studies</span>
            <h2 className={styles.sectionTitle}>Featured Operational Outcomes</h2>
            <p className={styles.sectionSub}>How we optimize costs, ensure regulatory compliance, and reduce energy loads on sites.</p>
          </div>

          <div className={styles.casesGrid}>
            {clientData.caseStudies.map((study) => (
              <GlassCard key={study.id} className={styles.caseCard} hoverEffect>
                <div className={styles.cardHeader}>
                  <h3 className={styles.propertyName}>{study.propertyName}</h3>
                  <span className={styles.sqftTag}>
                    <Maximize2 size={12} />
                    <span>{study.sqft}</span>
                  </span>
                </div>

                <p className={styles.outcomeText}>
                  <strong>Outcome:</strong> {study.outcome}
                </p>

                <div className={styles.servicesWrap}>
                  <h4 className={styles.servicesTitle}>Services Deployed:</h4>
                  <div className={styles.servicesGrid}>
                    {study.servicesProvided.map((serviceId) => {
                      const service = getService(serviceId);
                      return service ? (
                        <span key={serviceId} className={styles.servicePill}>
                          <span
                            className={styles.serviceColorDot}
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
      <section className={styles.geoSection}>
        <div className={`${styles.geoContainer} container`}>
          <div className={styles.geoCard}>
            <div className={styles.geoLeft}>
              <div className={styles.geoHeader}>
                <MapPin size={24} className={styles.teal} />
                <h3 className={styles.geoTitle}>Pan-India Regional Operations</h3>
              </div>
              <p className={styles.geoDesc}>
                Action Group coordinates regional facility services from our HITEC City HQ. We self-perform in all major business corridors using directly managed regional teams, auditing offices daily.
              </p>
              <div className={styles.geoPoints}>
                {statsData.regionalPresence.map((loc, idx) => (
                  <div key={idx} className={styles.point}>
                    <span className={loc.isHQ ? styles.hqDot : styles.regularDot} />
                    <span className={styles.pointName}>{loc.location}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.geoRight}>
              <div className={styles.mapCanvas}>
                <GlobeScene />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTABanner */}
      <CTABanner />
    </div>
  );
}
