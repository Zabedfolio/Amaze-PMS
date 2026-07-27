"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brush, Wrench, Shield, Bug, Flower2, Droplets } from "lucide-react";
import servicesData from "../../data/services.json";
import styles from "./StickyCardStack.module.scss";

const iconMap = {
  Bucket: Brush,
  Wrench: Wrench,
  Shield: Shield,
  Bugs: Bug,
  Grass: Flower2,
  WaterDrop: Droplets,
};

export default function StickyCardStack() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  // Render the first 6 main services for the interactive stack
  const cards = servicesData.slice(0, 6);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cardsEl = cardsRef.current;
    if (!containerRef.current || cardsEl.length === 0) return;

    // Build unified ScrollTrigger timeline with combined pinning and inertial tracking
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${(cardsEl.length - 1) * 130}%`, // expanded path height for relaxed scrolling velocity
        scrub: 1.2, // scroll damping inertia
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    cardsEl.forEach((card, index) => {
      if (index === 0) return;

      // Card enters from bottom linearly mapped to scroll progression
      tl.fromTo(
        card,
        {
          yPercent: 100,
          scale: 0.96,
          opacity: 0,
        },
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "none", // linear velocity feels much smoother during scroll scrub
        },
        index - 0.75
      );

      // Simultaneously scale and dim the preceding card
      if (index > 0) {
        tl.to(
          cardsEl[index - 1],
          {
            scale: 0.95 - index * 0.01,
            opacity: 0.45,
            yPercent: -10,
            duration: 1,
            ease: "none",
          },
          index - 0.75
        );
      }
    });

    return () => {
      // Reconcile and clean up active triggers
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [cards.length]);

  return (
    <div ref={containerRef} className={styles.stackSection}>
      <div className={`${styles.header} container`}>
        <div className={styles.labelGroup}>
          <span className={styles.dot} />
          <span className={styles.tag}>Capabilities</span>
        </div>
        <h2 className={styles.headline}>Core Service Portfolio</h2>
      </div>

      <div className={`${styles.cardsWrapper} container`}>
        {cards.map((service, index) => {
          const Icon = iconMap[service.icon] || Wrench;
          return (
            <div
              key={service.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={styles.card}
              style={{
                zIndex: index + 1,
                backgroundImage: `linear-gradient(135deg, ${service.gradient[0]}08 0%, #111114 100%)`,
                borderTop: `1px solid ${service.gradient[0]}33`,
              }}
            >
              <div className={styles.cardContent}>
                <div className={styles.leftCol}>
                  <div
                    className={styles.iconBox}
                    style={{
                      background: `linear-gradient(135deg, ${service.gradient[0]} 0%, ${service.gradient[1]} 100%)`,
                      boxShadow: `0 8px 24px ${service.gradient[0]}25`,
                    }}
                  >
                    <Icon size={32} className={styles.icon} />
                  </div>
                  <h3 className={styles.cardTitle}>{service.name}</h3>
                  <p className={styles.cardDesc}>{service.shortDescription}</p>

                  <div className={styles.cardStat}>
                    <span
                      className={styles.statVal}
                      style={{
                        background: `linear-gradient(135deg, ${service.gradient[0]} 0%, #F5F5F7 100%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {service.stat.value}
                    </span>
                    <span className={styles.statLabel}>{service.stat.label}</span>
                  </div>
                </div>

                <div className={styles.rightCol}>
                  <h4 className={styles.highlightsTitle}>Inclusions & Standards</h4>
                  <ul className={styles.highlights}>
                    {service.included.map((item, idx) => (
                      <li key={idx} className={styles.highem}>
                        <span
                          className={styles.bulletDot}
                          style={{
                            backgroundColor: service.gradient[0],
                            boxShadow: `0 0 6px ${service.gradient[0]}`,
                          }}
                        />
                        <span className={styles.highemText}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
