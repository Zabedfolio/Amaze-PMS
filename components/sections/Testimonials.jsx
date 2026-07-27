"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import testimonialsData from "../../data/testimonials.json";
import styles from "./Testimonials.module.scss";

export default function Testimonials() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track the scroll percentage to animate the progress indicator bar
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;
    
    const progress = (container.scrollLeft / maxScroll) * 100;
    setScrollProgress(progress);
  };

  const scroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;
    
    const scrollAmount = 420;
    container.scrollTo({
      left: container.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <section className={styles.testimonialSection}>
      <div className={`${styles.container} container`}>
        {/* Header Block */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.tag}>Testimonials</span>
            <h2 className={styles.headline}>Reviews from Partners</h2>
          </div>
          
          <div className={styles.navControls}>
            <button 
              onClick={() => scroll("left")} 
              className={styles.controlBtn} 
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll("right")} 
              className={styles.controlBtn} 
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Testimonials horizontal scrolling viewports */}
        <div ref={containerRef} className={styles.scrollTrack}>
          <div className={styles.cardsList}>
            {testimonialsData.map((t) => {
              // Extract initials for the fallback avatar
              const initials = t.authorName
                ? t.authorName.split(" ").map((n) => n[0]).join("")
                : "U";

              return (
                <div key={t.id} className={styles.testimonialCard}>
                  {/* Card Glow Background */}
                  <div className={styles.cardGlow} />

                  <div className={styles.cardHeader}>
                    {/* Property Capsule Badge */}
                    <span className={styles.propertyBadge}>{t.propertyType}</span>
                    <div className={styles.rating}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="var(--accent)" stroke="none" />
                      ))}
                    </div>
                  </div>

                  <div className={styles.quoteBlock}>
                    <Quote className={styles.quoteIcon} size={28} />
                    <p className={styles.quoteText}>{t.quoteSummary}</p>
                  </div>

                  <div className={styles.authorRow}>
                    <div className={styles.avatarGradient}>
                      {initials}
                    </div>
                    <div className={styles.meta}>
                      <h4 className={styles.authorName}>{t.authorName}</h4>
                      <p className={styles.authorRole}>{t.authorRole}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className={styles.progressContainer}>
          <motion.div 
            className={styles.progressBar} 
            style={{ width: `${Math.max(4, scrollProgress)}%` }} 
          />
        </div>
      </div>
    </section>
  );
}
