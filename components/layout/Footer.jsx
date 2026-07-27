"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { ArrowRight } from "lucide-react";
import navData from "../../data/navigation.json";
import { mockSubmit } from "../../lib/mockSubmit";
import Spinner from "../ui/Spinner";

function SocialIcon({ platform }) {
  if (platform === "LinkedIn") return (
    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  );
  if (platform === "Twitter") return (
    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  );
  if (platform === "Facebook") return (
    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
  return null;
}

export default function Footer() {
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await mockSubmit(Object.fromEntries(new FormData(e.currentTarget)));
      toast.success("Subscribed successfully! Welcome aboard.");
      e.currentTarget.reset();
    } catch (err) {
      toast.error(err.message || "Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative bg-[#111114] border-t border-white/8 pt-20 mt-auto">
      {/* Accent top line */}
      <span className="absolute top-0 left-[10%] w-[80%] h-px bg-gradient-to-r from-transparent via-[#FF5004] to-transparent opacity-30 pointer-events-none" />

      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-16">
        {/* Brand column */}
        <div className="flex flex-col gap-5">
          <Link href="/" className="flex items-center gap-1 font-display text-2xl font-extrabold tracking-[-0.03em]">
            <span className="text-[#F5F5F7]">AMAZE</span>
            <span className="text-[#FF5004]">PMS</span>
          </Link>
          <p className="text-[0.9375rem] text-[#A1A1AA] max-w-[260px]">{navData.footer.tagline}</p>

          {/* Newsletter */}
          <form className="flex flex-col gap-2 mt-3" onSubmit={handleNewsletterSubmit}>
            <label htmlFor="newsletter-email" className="font-display text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-[#A1A1AA]">
              Subscribe to Facility Insights
            </label>
            <div className="relative flex w-full max-w-[280px]">
              <input
                id="newsletter-email"
                type="email"
                name="email"
                required
                placeholder="Enter your corporate email"
                disabled={loading}
                className="w-full bg-[#0A0A0C] border border-white/8 rounded-[12px] py-2.5 pl-3.5 pr-12 font-sans text-sm text-[#F5F5F7] outline-none placeholder-white/30 focus:border-[#FF5004] focus:shadow-[0_0_10px_rgba(255,80,4,0.15)] transition-all duration-300 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                aria-label="Subscribe"
                className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center p-2 text-[#FF5004] hover:text-[#FF6A28] transition-colors duration-300 disabled:opacity-50"
              >
                {loading ? <Spinner size="sm" /> : <ArrowRight size={18} />}
              </button>
            </div>
          </form>
        </div>

        {/* Link columns */}
        {navData.footer.columns.map((column) => (
          <div key={column.title} className="flex flex-col gap-5">
            <h4 className="font-display text-base font-semibold text-[#F5F5F7]">{column.title}</h4>
            <ul className="flex flex-col gap-3 list-none">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.path} className="text-sm text-[#A1A1AA] hover:text-[#FF5004] hover:pl-0.5 transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 py-8 bg-black/15">
        <div className="container flex flex-wrap items-center justify-between gap-6 md:flex-row flex-col md:items-center items-start">
          <p className="text-[0.8125rem] text-[#A1A1AA] order-3 md:order-1">{navData.footer.legal.copyright}</p>

          <div className="flex items-center gap-6 flex-wrap order-1 md:order-2">
            {navData.footer.legal.links.map((link) => (
              <Link key={link.label} href={link.path} className="text-[0.8125rem] text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors duration-300">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 order-2 md:order-3">
            {navData.footer.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${social.platform} page`}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.03] border border-white/8 text-[#A1A1AA] transition-all duration-300 hover:text-[#0A0A0C] hover:bg-[#FF5004] hover:border-[#FF5004] hover:shadow-[0_0_10px_rgba(255,80,4,0.4)]"
              >
                <SocialIcon platform={social.platform} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
