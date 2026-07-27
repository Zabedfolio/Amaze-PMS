"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import navData from "../../data/navigation.json";
import Button from "../ui/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navVariants = {
    top:      { backgroundColor: "rgba(10,10,12,0)",    borderColor: "rgba(255,255,255,0)",    backdropFilter: "blur(0px)",  boxShadow: "none" },
    scrolled: { backgroundColor: "rgba(17,17,20,0.75)", borderColor: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", boxShadow: "0 4px 30px rgba(0,0,0,0.4)" },
  };

  const menuVariants = {
    closed: { opacity: 0, y: "-100%", transition: { duration: 0.5, ease: [0.16,1,0.3,1], when: "afterChildren",  staggerChildren: 0.05, staggerDirection: -1 } },
    open:   { opacity: 1, y: 0,       transition: { duration: 0.6, ease: [0.16,1,0.3,1], when: "beforeChildren", staggerChildren: 0.08 } },
  };

  const linkVariants = {
    closed: { opacity: 0, y: -20 },
    open:   { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full h-20 z-[100] flex items-center border-b border-transparent transition-all"
        initial="top"
        animate={isScrolled ? "scrolled" : "top"}
        variants={navVariants}
        transition={{ duration: 0.3 }}
      >
        <div className="container flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 font-display text-2xl font-extrabold tracking-[-0.03em]">
            <span className="text-[#F5F5F7]">AMAZE</span>
            <span className="text-[#FF5004]">PMS</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
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
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Button href={navData.ctaButton.path} variant="primary" size="sm">
                {navData.ctaButton.label}
              </Button>
            </div>
            <button
              className="md:hidden bg-transparent border-none text-[#F5F5F7] cursor-pointer p-2 z-[101]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 w-screen h-screen bg-[#111114] z-[99] flex items-center justify-center md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="w-full px-10">
              <div className="flex flex-col items-center gap-8">
                {navData.navLinks.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.div key={link.path} variants={linkVariants}>
                      <Link
                        href={link.path}
                        className={[
                          "font-display text-[2rem] font-bold text-center block transition-colors duration-300",
                          isActive ? "text-[#FF5004]" : "text-[#A1A1AA] hover:text-[#F5F5F7]",
                        ].join(" ")}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div variants={linkVariants} className="w-full max-w-xs mt-4 flex justify-center">
                  <Button href={navData.ctaButton.path} variant="primary" size="lg" onClick={() => setIsOpen(false)}>
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
