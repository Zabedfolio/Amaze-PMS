"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Shield, Building, Globe, Award, MapPin } from "lucide-react";
import statsData from "../../data/stats.json";
import SpotlightCard from "../ui/SpotlightCard";
import styles from "./BentoStats.module.scss";

// Client-side CountUp utility linked to scroll viewport triggers
function Counter({ end, duration = 1.5, suffix = "" }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const inView = useInView(elementRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(animate);
      }
    };

    window.requestAnimationFrame(animate);
  }, [end, duration, inView]);

  return <span ref={elementRef}>{count.toLocaleString()}{suffix}</span>;
}

export default function BentoStats() {
  const [isMounted, setIsMounted] = useState(false);
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-40px" });

  // Safeguard Recharts rendering to prevent SSR hydration errors in Next.js
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className={styles.statsSection}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className={styles.tag}>Metrics</span>
          <h2 className={styles.headline}>Amaze at a Glance</h2>
          <p className={styles.subtext}>
            Precision operations, audited compliance, and continuous growth across India's premium portfolios.
          </p>
        </div>

        <motion.div
          ref={gridRef}
          className={styles.bentoGrid}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* 1. Main Huge Stat Card */}
          <motion.div className={styles.colSpan8} variants={itemVariants}>
            <SpotlightCard className={styles.mainCell}>
              <div className={styles.bentoCell}>
                <div className={styles.cellHeader}>
                  <div className={styles.iconCircle}><Shield size={20} className={styles.teal} /></div>
                  <span className={styles.cellLabel}>Operational Force</span>
                </div>
                <div className={styles.mainStatVal}>
                  <Counter end={15000} suffix="+" />
                </div>
                <h3 className={styles.cellTitle}>Directly Employed Professionals</h3>
                <p className={styles.cellDesc}>
                  Our personnel are 100% in-house. We do not subcontract. Every housekeeper, MEP technician, and guard is directly audited, compliant, and fully insured.
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* 2. Recharts Area Chart Card */}
          <motion.div className={styles.colSpan4} variants={itemVariants}>
            <SpotlightCard className={styles.chartCell}>
              <div className={styles.bentoCell}>
                <div className={styles.cellHeader}>
                  <div className={styles.iconCircle}><Building size={20} className={styles.orange} /></div>
                  <span className={styles.cellLabel}>Managed Footprint Growth</span>
                </div>
                <div className={styles.chartTitleRow}>
                  <span className={styles.chartTitleVal}><Counter end={20} suffix="M+" /></span>
                  <span className={styles.chartTitleLabel}>Sq. Ft. Area</span>
                </div>
                
                <div className={styles.chartContainer}>
                  {isMounted && gridInView && (
                    <ResponsiveContainer width="100%" height={120}>
                      <AreaChart data={statsData.growthChart} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <defs>
                          <linearGradient id="colorSqft" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF5004" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#FF5004" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="year" stroke="#A1A1AA" fontSize={10} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{ background: "#17171B", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px" }}
                          labelStyle={{ color: "#A1A1AA", fontSize: 11 }}
                          itemStyle={{ color: "#FF5004", fontSize: 12, fontWeight: "bold" }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="sqft" 
                          name="Sqft (Millions)" 
                          stroke="#FF5004" 
                          strokeWidth={2} 
                          fillOpacity={1} 
                          fill="url(#colorSqft)"
                          isAnimationActive={true}
                          animationDuration={1800}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* 3. Pie Chart / Service Mix Card */}
          <motion.div className={styles.colSpan4} variants={itemVariants}>
            <SpotlightCard className={styles.mixCell}>
              <div className={styles.bentoCell}>
                <div className={styles.cellHeader}>
                  <div className={styles.iconCircle}><Award size={20} className={styles.pink} /></div>
                  <span className={styles.cellLabel}>Service Mix Breakdown</span>
                </div>

                <div className={styles.mixWrapper}>
                  <div className={styles.pieContainer}>
                    {isMounted && gridInView && (
                      <ResponsiveContainer width="100%" height={110}>
                        <PieChart>
                          <Pie
                            data={statsData.serviceMix}
                            innerRadius={35}
                            outerRadius={50}
                            paddingAngle={3}
                            dataKey="value"
                            isAnimationActive={true}
                            animationDuration={1500}
                          >
                            {statsData.serviceMix.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                  <div className={styles.mixLegend}>
                    {statsData.serviceMix.slice(0, 4).map((entry, index) => (
                      <div key={index} className={styles.legendItem}>
                        <span className={styles.legendDot} style={{ backgroundColor: entry.color }} />
                        <span className={styles.legendLabel}>{entry.name} ({entry.value}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* 4. Regional Presence Map / Locations Card */}
          <motion.div className={styles.colSpan8} variants={itemVariants}>
            <SpotlightCard className={styles.geoCell}>
              <div className={styles.bentoCell}>
                <div className={styles.cellHeader}>
                  <div className={styles.iconCircle}><Globe size={20} className={styles.blue} /></div>
                  <span className={styles.cellLabel}>Pan-India Footprint</span>
                </div>

                <div className={styles.geoContent}>
                  <div className={styles.geoLeft}>
                    <h3 className={styles.cellTitle}>HQ: Cyberabad, Hyderabad</h3>
                    <p className={styles.cellDesc}>
                      We operate fully staffed regional divisions in key metros, allowing us to deploy and oversee property service audits nationwide with zero subcontracts.
                    </p>
                    <div className={styles.activeClientsWrap}>
                      <span className={styles.clientsCount}><Counter end={200} suffix="+" /></span>
                      <span className={styles.clientsLabel}>Active Portfolios Cared For</span>
                    </div>
                  </div>

                  <div className={styles.locationsList}>
                    {statsData.regionalPresence.map((loc, i) => (
                      <div key={i} className={styles.locationTag}>
                        <MapPin size={14} className={loc.isHQ ? styles.teal : styles.mutedPin} />
                        <span className={styles.locationName}>{loc.location}</span>
                        {loc.isHQ && <span className={styles.hqBadge}>HQ</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
