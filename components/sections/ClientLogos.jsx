"use client";

import React from "react";
import clientData from "../../data/clients.json";
import styles from "./ClientLogos.module.scss";

export default function ClientLogos() {
  const { logos } = clientData;

  // Duplicate the logos list to allow seamless, infinite marquee transitions
  const doubleLogos = [...logos, ...logos, ...logos];

  return (
    <section className={styles.marqueeSection}>
      <div className={styles.container}>
        <p className={styles.title}>
          Trusted by India's Leading Tech Parks & Enterprises
        </p>

        <div className={styles.marquee}>
          <div className={styles.track}>
            {doubleLogos.map((item, index) => (
              <div key={`${item.id}-${index}`} className={styles.logoCard}>
                {/* Fallback to stylized vector branding badge representing logos */}
                <div className={styles.logoBadge}>
                  <span className={styles.logoDot} />
                  <span className={styles.logoName}>{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
