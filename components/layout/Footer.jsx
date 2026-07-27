"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { ArrowRight } from "lucide-react";
import navData from "../../data/navigation.json";
import { mockSubmit } from "../../lib/mockSubmit";
import Spinner from "../ui/Spinner";
import styles from "./Footer.module.scss";

// Helper component to render inline SVG brand icons
function SocialIcon({ platform }) {
  if (platform === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }
  if (platform === "Twitter") {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
      </svg>
    );
  }
  if (platform === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }
  return null;
}

export default function Footer() {
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    
    try {
      await mockSubmit(formData);
      toast.success("Subscribed successfully! Welcome aboard.");
      e.currentTarget.reset();
    } catch (err) {
      toast.error(err.message || "Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        {/* Brand & Newsletter Column */}
        <div className={styles.brandCol}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoMain}>AMAZE</span>
            <span className={styles.logoSub}>PMS</span>
          </Link>
          <p className={styles.tagline}>{navData.footer.tagline}</p>
          
          {/* Newsletter Form */}
          <form className={styles.newsletter} onSubmit={handleNewsletterSubmit}>
            <label htmlFor="newsletter-email" className={styles.newsletterLabel}>
              Subscribe to Facility Insights
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                required
                placeholder="Enter your corporate email"
                className={styles.input}
                disabled={loading}
              />
              <button
                type="submit"
                className={styles.subscribeBtn}
                disabled={loading}
                aria-label="Subscribe"
              >
                {loading ? <Spinner size="sm" /> : <ArrowRight size={18} />}
              </button>
            </div>
          </form>
        </div>

        {/* Links Columns */}
        {navData.footer.columns.map((column) => (
          <div key={column.title} className={styles.linksCol}>
            <h4 className={styles.columnTitle}>{column.title}</h4>
            <ul className={styles.linksList}>
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.path} className={styles.footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={`${styles.bottomContainer} container`}>
          <p className={styles.copyright}>{navData.footer.legal.copyright}</p>
          
          <div className={styles.bottomLinks}>
            {navData.footer.legal.links.map((link) => (
              <Link key={link.label} href={link.path} className={styles.legalLink}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social Links */}
          <div className={styles.socials}>
            {navData.footer.socials.map((social) => {
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label={`Visit our ${social.platform} page`}
                >
                  <SocialIcon platform={social.platform} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
