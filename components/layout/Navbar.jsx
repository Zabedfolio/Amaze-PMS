"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import navData from "../../data/navigation.json";
import Button from "../ui/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("lenis-stopped");
      if (window.lenis && typeof window.lenis.stop === "function") {
        window.lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("lenis-stopped");
      if (window.lenis && typeof window.lenis.start === "function") {
        window.lenis.start();
      }
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("lenis-stopped");
      if (window.lenis && typeof window.lenis.start === "function") {
        window.lenis.start();
      }
    };
  }, [isOpen]);

  const navVariants = {
    top: {
      backgroundColor: "rgba(10,10,12,0)",
      borderColor: "rgba(255,255,255,0)",
      backdropFilter: "blur(0px)",
      boxShadow: "none",
    },
    scrolled: {
      backgroundColor: "rgba(17,17,20,0.85)",
      borderColor: "rgba(255,255,255,0.06)",
      backdropFilter: "blur(16px)",
      boxShadow: "0 4px 30px rgba(0,0,0,0.5)",
    },
  };

  const backdropVariants = {
    closed: { opacity: 0, backdropFilter: "blur(0px)" },
    open: { opacity: 1, backdropFilter: "blur(8px)", transition: { duration: 0.4 } },
  };

  const drawerVariants = {
    closed: { x: "100%", transition: { type: "tween", duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
    open: { x: 0, transition: { type: "tween", duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  const staggerVariants = {
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 40, transition: { duration: 0.3 } },
    open: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <>
      {/* Global Sticky Header Group */}
      <div className="fixed top-0 left-0 w-full z-[100] flex flex-col pointer-events-none">
        {/* Main Navbar */}
        <motion.nav
          className="w-full h-16 flex items-center border-b border-transparent transition-all pointer-events-auto"
          initial="top"
          animate={isScrolled ? "scrolled" : "top"}
          variants={navVariants}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-6 flex items-center justify-between w-full h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center z-[102] transition-transform hover:scale-1.05 active:scale-0.95 h-full">
            <Image
              src="/images/logo.png"
              alt="Amaze PMS"
              width={70}
              height={70}
              priority
              className="object-contain h-[36px] sm:h-[40px] w-auto"
            />
          </Link>

          {/* Desktop/Tablet Links (Tablet uses larger spacing block hidden on sm) */}
          <div className="hidden lg:flex items-center gap-8 h-full">
            {navData.navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={[
                    "font-display text-[0.9375rem] font-medium relative py-2 transition-colors duration-300",
                    isActive ? "text-[#F5F5F7]" : "text-[#A1A1AA] hover:text-[#F5F5F7]",
                  ].join(" ")}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF5004] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-4 z-[102] h-full">
            {/* Mobile/Tablet visible Book Audit button */}
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent("open-proposal", { detail: { tab: "book" } }))}
              className="lg:hidden flex items-center gap-1.5 font-display text-xs font-semibold text-[#FF5004] bg-[#FF5004]/10 hover:bg-[#FF5004] hover:text-white border border-[#FF5004]/30 px-3.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
            >
              <span>Book Audit</span>
            </button>

            <div className="hidden lg:flex items-center gap-5 h-full">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent("open-proposal", { detail: { tab: "book" } }))}
                className="font-display text-[0.875rem] font-semibold text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors cursor-pointer"
              >
                Book Audit
              </button>
              <div className="flex items-center h-full">
                <Button 
                  onClick={() => window.dispatchEvent(new CustomEvent("open-proposal", { detail: { tab: "rfp" } }))} 
                  variant="primary" 
                  size="sm"
                >
                  Request Proposal
                </Button>
              </div>
            </div>

            {/* Custom Hamburger Button with animated lines and border glow */}
            <button
              className="lg:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 cursor-pointer relative"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <div className="w-5 h-4 flex flex-col justify-between relative">
                <span
                  className={[
                    "w-full h-[2px] bg-[#F5F5F7] rounded-full transition-all duration-300 transform origin-left",
                    isOpen ? "rotate-[42deg] translate-y-[-1px] w-[21px]" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "w-full h-[2px] bg-[#F5F5F7] rounded-full transition-all duration-200",
                    isOpen ? "opacity-0 scale-0" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "w-full h-[2px] bg-[#F5F5F7] rounded-full transition-all duration-300 transform origin-left",
                    isOpen ? "-rotate-[42deg] translate-y-[1px] w-[21px]" : "",
                  ].join(" ")}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>
    </div>

      {/* Mobile & Tablet Premium Slide Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-[98]"
              initial="closed"
              animate="open"
              exit="closed"
              variants={backdropVariants}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              data-lenis-prevent="true"
              className="fixed top-0 right-0 h-full max-h-screen w-full sm:w-[480px] bg-[#0E0E12] border-l border-white/[0.06] z-[99] shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between"
              initial="closed"
              animate="open"
              exit="closed"
              variants={drawerVariants}
            >
              {/* Decorative top lights */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#FF5004] opacity-[0.04] blur-[80px] pointer-events-none rounded-full" />

              {/* Top empty block to offset fixed Navbar header */}
              <div className="h-16 flex-shrink-0" />

              {/* Main Content Area */}
              <div 
                data-lenis-prevent="true"
                className="flex-1 overflow-y-auto overscroll-contain px-6 sm:px-12 py-6 flex flex-col justify-between gap-10"
              >
                {/* Navigation Links list (Redesigned for Premium Corporate Look) */}
                <motion.div className="flex flex-col gap-3" variants={staggerVariants}>
                  {navData.navLinks.map((link, index) => {
                    const isActive = pathname === link.path;
                    const indexStr = String(index + 1).padStart(2, "0");
                    return (
                      <motion.div key={link.path} variants={itemVariants}>
                        <Link
                          href={link.path}
                          onClick={() => setIsOpen(false)}
                          className={[
                            "group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 relative overflow-hidden",
                            isActive 
                              ? "bg-[#FF5004]/10 border-[#FF5004]/30 shadow-[0_4px_20px_rgba(255,80,4,0.1)]" 
                              : "bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04] hover:border-white/10"
                          ].join(" ")}
                        >
                          <div className="flex items-center gap-4 relative z-10">
                            <span
                              className={[
                                "font-mono text-[10px] font-bold px-2 py-0.5 rounded-md border",
                                isActive 
                                  ? "bg-[#FF5004] text-[#0A0A0C] border-transparent" 
                                  : "bg-white/[0.04] text-[#A1A1AA] border-white/[0.06]"
                              ].join(" ")}
                            >
                              {indexStr}
                            </span>
                            <span
                              className={[
                                "font-display text-sm sm:text-base font-bold tracking-tight transition-colors duration-300",
                                isActive ? "text-[#F5F5F7]" : "text-[#A1A1AA] group-hover:text-[#F5F5F7]"
                              ].join(" ")}
                            >
                              {link.label}
                            </span>
                          </div>
                          
                          <ArrowRight 
                            size={15} 
                            className={[
                              "transition-all duration-300 relative z-10",
                              isActive 
                                ? "text-[#FF5004] translate-x-0" 
                                : "text-[#44444F] group-hover:text-[#FF5004] group-hover:translate-x-1"
                            ].join(" ")}
                          />

                          {/* Subtle hover gradient background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-[#FF5004]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Contact / Office details on bottom */}
                <motion.div
                  className="pt-8 border-t border-white/[0.05] flex flex-col gap-5 text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.4 } }}
                >
                  <span className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#525262]">
                    Operations Headquarters
                  </span>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-[#9A9AA4]">
                      <MapPin size={16} className="text-[#FF5004]" />
                      <span className="leading-relaxed text-xs">Action Group, New Delhi / Hyderabad, India</span>
                    </div>

                    <a href="tel:+919988776655" className="flex items-center gap-3 text-[#9A9AA4] hover:text-[#F5F5F7] transition-colors w-max text-xs font-semibold">
                      <Phone size={16} className="text-[#FF5004]" />
                      <span>+91 99887 76655 (Mobile)</span>
                    </a>

                    <a href="tel:+914045678900" className="flex items-center gap-3 text-[#9A9AA4] hover:text-[#F5F5F7] transition-colors w-max text-xs">
                      <Phone size={16} className="text-[#FF5004]" />
                      <span>+91 40 4567 8900 (Landline)</span>
                    </a>

                    <a href="mailto:info@amazepms.com" className="flex items-center gap-3 text-[#9A9AA4] hover:text-[#F5F5F7] transition-colors w-max text-xs font-semibold">
                      <Mail size={16} className="text-[#FF5004]" />
                      <span>info@amazepms.com</span>
                    </a>

                    <a href="mailto:operations@amazepms.com" className="flex items-center gap-3 text-[#9A9AA4] hover:text-[#F5F5F7] transition-colors w-max text-xs">
                      <Mail size={16} className="text-[#FF5004]" />
                      <span>operations@amazepms.com</span>
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Bottom CTA Block: Quick contact actions + Triggers global proposal request */}
              <div className="p-6 sm:p-10 bg-white/[0.015] border-t border-white/[0.04] relative z-10 flex-shrink-0 flex flex-col gap-3">
                {/* Dedicated Call & Email Action Buttons inside Hamburger Menu */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="tel:+919988776655"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#FF5004]/10 border border-[#FF5004]/30 text-[#FF5004] hover:bg-[#FF5004] hover:text-[#F5F5F7] transition-all duration-300 text-xs font-bold active:scale-95"
                  >
                    <Phone size={14} />
                    <span>Call Us</span>
                  </a>
                  <a
                    href="mailto:info@amazepms.com"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-[#F5F5F7] hover:border-[#FF5004]/50 hover:text-[#FF5004] transition-all duration-300 text-xs font-bold active:scale-95"
                  >
                    <Mail size={14} />
                    <span>Email Us</span>
                  </a>
                </div>

                <Button
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => {
                      window.dispatchEvent(new CustomEvent("open-proposal"));
                    }, 300);
                  }}
                  variant="primary"
                  size="lg"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <span>Request Facility Proposal</span>
                  <ArrowRight size={16} />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Call/Email Widgets (Only visible when mobile drawer is closed) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-[99] flex flex-col gap-3">
          {/* Mobile-Friendly Call Button */}
          <a
            href="tel:+919988776655"
            className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#0A0A0C]/90 backdrop-blur-md border border-[#FF5004]/50 text-[#FF5004] hover:bg-[#FF5004] hover:text-[#F5F5F7] shadow-[0_4px_20px_rgba(255,80,4,0.3)] hover:shadow-[0_8px_30px_rgba(255,80,4,0.5)] transition-all duration-300 active:scale-95 cursor-pointer pointer-events-auto"
            aria-label="Call Mobile Support"
          >
            <Phone size={18} />
            {/* Desktop Hover Tooltip */}
            <span className="absolute right-14 bg-[#0A0A0C]/95 backdrop-blur-sm border border-white/10 text-[#F5F5F7] text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-2xl opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              Call Mobile: +91 99887 76655
            </span>
          </a>

          {/* Mobile-Friendly Email Button */}
          <a
            href="mailto:info@amazepms.com"
            className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#0A0A0C]/90 backdrop-blur-md border border-[#FF5004]/50 text-[#FF5004] hover:bg-[#FF5004] hover:text-[#F5F5F7] shadow-[0_4px_20px_rgba(255,80,4,0.3)] hover:shadow-[0_8px_30px_rgba(255,80,4,0.5)] transition-all duration-300 active:scale-95 cursor-pointer pointer-events-auto"
            aria-label="Email Support"
          >
            <Mail size={18} />
            {/* Desktop Hover Tooltip */}
            <span className="absolute right-14 bg-[#0A0A0C]/95 backdrop-blur-sm border border-white/10 text-[#F5F5F7] text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-2xl opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              Email Us: info@amazepms.com
            </span>
          </a>
        </div>
      )}
    </>
  );
}
