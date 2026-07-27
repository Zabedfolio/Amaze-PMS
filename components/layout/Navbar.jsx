"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import navData from "../../data/navigation.json";
import Button from "../ui/Button";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Track window scroll coordinates to toggle solid style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navVariants = {
    top: {
      backgroundColor: "rgba(10, 10, 12, 0)",
      borderColor: "rgba(255, 255, 255, 0)",
      backdropFilter: "blur(0px)",
      boxShadow: "none",
    },
    scrolled: {
      backgroundColor: "rgba(17, 17, 20, 0.75)",
      borderColor: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(12px)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.4)",
    },
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <>
      <motion.nav
        className={styles.navbar}
        initial="top"
        animate={isScrolled ? "scrolled" : "top"}
        variants={navVariants}
        transition={{ duration: 0.3 }}
      >
        <div className={`${styles.navContainer} container`}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <span className={styles.logoMain}>AMAZE</span>
            <span className={styles.logoSub}>PMS</span>
          </Link>

          {/* Desktop Nav Items */}
          <div className={styles.desktopLinks}>
            {navData.navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className={styles.indicator}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action CTA */}
          <div className={styles.navActions}>
            <Button
              href={navData.ctaButton.path}
              variant="primary"
              size="sm"
              className={styles.ctaButton}
            >
              {navData.ctaButton.label}
            </Button>

            {/* Hamburger Button */}
            <button
              className={styles.menuToggle}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className={styles.mobileMenuContent}>
              <div className={styles.mobileLinks}>
                {navData.navLinks.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.div key={link.path} variants={linkVariants}>
                      <Link
                        href={link.path}
                        className={`${styles.mobileNavLink} ${
                          isActive ? styles.mobileActive : ""
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div variants={linkVariants} className={styles.mobileCtaWrap}>
                  <Button
                    href={navData.ctaButton.path}
                    variant="primary"
                    size="lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {navData.ctaButton.label}
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
