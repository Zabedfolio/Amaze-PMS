"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import styles from "./Hero.module.scss";

// Lazy load the 3D canvas scene with SSR disabled to optimize page speeds
const HeroScene = dynamic(() => import("../three/HeroScene"), {
  ssr: false,
  loading: () => <div className={styles.canvasFallback} />,
});

export default function Hero() {
  const words = "Facility Management, Reimagined".split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.8,
      },
    },
  };

  return (
    <section className={styles.heroSection}>
      {/* 3D Wireframe Scene background */}
      <div className={styles.sceneContainer}>
        <HeroScene />
      </div>

      <div className={`${styles.container} container`}>
        <motion.div
          className={styles.content}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Main Headline Reveal */}
          <h1 className={styles.headline}>
            {words.map((word, index) => (
              <span key={index} className={styles.wordWrapper}>
                <motion.span
                  variants={wordVariants}
                  className={word === "Reimagined" ? styles.highlightedWord : styles.word}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Description */}
          <motion.p className={styles.subheadline} variants={fadeUpVariants}>
            Pan-India self-performing facility services. Powered by 15,000+ directly employed professionals maintaining over 20 Million sq ft of premium corporate, industrial, and luxury residential real estate.
          </motion.p>

          {/* Action CTAs */}
          <motion.div className={styles.actions} variants={fadeUpVariants}>
            <Button href="/contact" variant="primary" size="lg">
              Get a Free Quote
            </Button>
            <Button href="/services" variant="outline" size="lg">
              Explore Services
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator cue */}
      <div className={styles.scrollIndicator}>
        <motion.div
          className={styles.mouse}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            className={styles.wheel}
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
