"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import styles from "./CTABanner.module.scss";

export default function CTABanner() {
  return (
    <section className={styles.ctaSection}>
      <div className={`${styles.container} container`}>
        <motion.div
          className={styles.bannerCard}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated decorative grid background */}
          <div className={styles.decorGrid} />
          <div className={styles.accentGlow} />

          <div className={styles.content}>
            <h2 className={styles.title}>
              Ready to Re-engineer Your Property Operations?
            </h2>
            <p className={styles.desc}>
              Schedule a comprehensive facility audit with our ex-navy practitioners. We will evaluate your MEP loads, STP compliance, and security frameworks with zero cost.
            </p>
            <div className={styles.actions}>
              <Button href="/contact" variant="primary" size="lg">
                Request a Custom Audit
              </Button>
              <Button href="/services" variant="outline" size="lg" className={styles.secondaryBtn}>
                Learn About Services
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
