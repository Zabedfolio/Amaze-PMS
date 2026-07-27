"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Award, HeartHandshake, Eye } from "lucide-react";
import companyData from "../../data/company.json";
import statsData from "../../data/stats.json";
import CTABanner from "../../components/sections/CTABanner";
import InteractiveGrid from "../../components/ui/InteractiveGrid";
import AmbientAura from "../../components/ui/AmbientAura";
import styles from "./About.module.scss";

// Map value icons dynamically
const iconMap = {
  "100% In-House Capability": HeartHandshake,
  "Absolute Statutory Compliance": ShieldCheck,
  "Technical Innovation": Award,
  "Certified Security Mindset": Eye,
};

export default function AboutPage() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const milestoneRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const line = lineRef.current;
    if (!line || !containerRef.current) return;

    // Animate the milestone vertical connector line drawing
    const lineAnim = gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: line.parentElement,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 1,
        },
      }
    );

    // Fade-in milestones sequentially
    const milestoneAnims = [];
    milestoneRefs.current.forEach((el, index) => {
      if (!el) return;
      const anim = gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
      milestoneAnims.push(anim);
    });

    return () => {
      lineAnim.kill();
      milestoneAnims.forEach((anim) => anim.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.aboutPage}>
      {/* Short Hero Header */}
      <section className={styles.heroSection}>
        <InteractiveGrid />
        <div className={`${styles.heroContainer} container`}>
          <span className={styles.tag}>Our Story</span>
          <h1 className={styles.headline}>Founded on Precise Operations & Compliance</h1>
          <p className={styles.subheadline}>
            Founded in 2001 by military veteran Subhani Abdul, Amaze PMS operates under a unified self-performance commitment.
          </p>
        </div>
      </section>

      {/* Founder Pullquote Block */}
      <section className={styles.founderSection}>
        <AmbientAura />
        <div className={`${styles.founderContainer} container`}>
          <div className={styles.founderCard}>
            <div className={styles.founderLeft}>
              <div className={styles.founderAvatar}>
                {companyData.founder.name.charAt(0)}
              </div>
              <h3 className={styles.founderName}>{companyData.founder.name}</h3>
              <p className={styles.founderRole}>{companyData.founder.role}</p>
              <span className={styles.founderTag}>{companyData.founder.background}</span>
            </div>
            
            <div className={styles.founderRight}>
              <blockquote className={styles.blockquote}>
                "{companyData.founder.quote}"
              </blockquote>
              <p className={styles.founderBio}>{companyData.founder.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Milestones Timeline */}
      <section className={styles.timelineSection}>
        <div className={`${styles.timelineContainer} container`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Expansion Chronology</h2>
            <p className={styles.sectionSub}>A look back at how we grew to manage 20M+ sq ft across India.</p>
          </div>

          <div className={styles.timelineWrapper}>
            <div className={styles.timelineTrack}>
              <div ref={lineRef} className={styles.timelineFill} />
            </div>

            <div className={styles.milestoneList}>
              {companyData.milestones.map((milestone, idx) => (
                <div
                  key={idx}
                  ref={(el) => (milestoneRefs.current[idx] = el)}
                  className={`${styles.milestoneItem} ${idx % 2 === 0 ? styles.even : styles.odd}`}
                >
                  <div className={styles.milestoneCard}>
                    <span className={styles.milestoneYear}>{milestone.year}</span>
                    <h4 className={styles.milestoneTitle}>{milestone.title}</h4>
                    <p className={styles.milestoneDesc}>{milestone.description}</p>
                  </div>
                  <div className={styles.markerDot} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Bento Grid */}
      <section className={styles.valuesSection}>
        <div className={`${styles.valuesContainer} container`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Operational Pillars</h2>
            <p className={styles.sectionSub}>Core values that guide our 15,000+ professionals every single day.</p>
          </div>

          <div className={styles.valuesGrid}>
            {companyData.values.map((val, idx) => {
              const IconComp = iconMap[val.title] || ShieldCheck;
              return (
                <div key={idx} className={styles.valueCard}>
                  <div className={styles.valueIconBox}>
                    <IconComp size={24} className={styles.valueIcon} />
                  </div>
                  <h3 className={styles.valueTitle}>{val.title}</h3>
                  <p className={styles.valueDesc}>{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTABanner Callout */}
      <CTABanner />
    </div>
  );
}
