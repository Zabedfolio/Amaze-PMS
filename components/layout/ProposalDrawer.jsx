"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck } from "lucide-react";
import { toast } from "react-hot-toast";
import Button from "../ui/Button";
import { mockSubmit } from "../../lib/mockSubmit";
import navData from "../../data/navigation.json";
import SchedulingWidget from "../sections/SchedulingWidget";

export default function ProposalDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("rfp"); // "rfp" or "book"
  const [bookingStep, setBookingStep] = useState(1); // Track inner step of SchedulingWidget

  useEffect(() => {
    const handleOpen = (e) => {
      const targetService = e.detail?.service; // e.g., "Professional Housekeeping"
      if (targetService) {
        setSelectedServices([targetService]);
      } else {
        setSelectedServices([]);
      }

      const targetTab = e.detail?.tab;
      if (targetTab === "book") {
        setActiveTab("book");
      } else {
        setActiveTab("rfp");
      }

      setIsOpen(true);
    };

    window.addEventListener("open-proposal", handleOpen);

    // Check URL action parameters on mount (useful for redirects)
    const params = new URLSearchParams(window.location.search);
    const action = params.get("action");
    if (action === "contact" || action === "proposal") {
      setActiveTab("rfp");
      setIsOpen(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (action === "schedule" || action === "book") {
      setActiveTab("book");
      setIsOpen(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    return () => {
      window.removeEventListener("open-proposal", handleOpen);
    };
  }, []);

  // Handle body scroll locking and Lenis smooth scroll freezing
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

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedServices([]);
      setActiveTab("rfp");
      setBookingStep(1);
    }, 300);
  };

  const handleCheckboxChange = (serviceName) => {
    if (selectedServices.includes(serviceName)) {
      setSelectedServices(selectedServices.filter((s) => s !== serviceName));
    } else {
      setSelectedServices([...selectedServices, serviceName]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const payload = Object.fromEntries(formData);

    if (payload.company_website) {
      toast.error("Spam protection triggered. Submission rejected.");
      setFormLoading(false);
      return;
    }

    delete payload.company_website;
    payload.selectedServices = selectedServices;

    try {
      await mockSubmit(payload);
      formEl.reset();
      setIsSubmitted(true);
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end justify-center overflow-hidden" onClick={handleClose}>
          <motion.div
            data-lenis-prevent="true"
            className="bg-[#17171B] border-t border-x border-white/10 rounded-t-[24px] p-6 sm:p-8 max-w-6xl w-full relative shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto overscroll-contain"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
          >
            {/* Header section - responsive layout with vertical wrap on small viewports */}
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 shrink-0 gap-3">
              <div className="pr-4 flex-1">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#F5F5F7] mb-1">
                  {activeTab === "rfp" ? "Request a Facility Proposal" : "Schedule a Consultation"}
                </h2>
                <p className="text-[11px] sm:text-xs text-[#A1A1AA] leading-relaxed">
                  {activeTab === "rfp" 
                    ? "Provide details about your property size and service interests. Fields marked with * are required."
                    : "Select a date and time slot to book a 30-minute consultation with our estimators."}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                {!isSubmitted && activeTab === "rfp" && (
                  <Button
                    type="submit"
                    form="proposal-form"
                    variant="primary"
                    size="sm"
                    loading={formLoading}
                    className="shadow-[0_0_12px_rgba(255,80,4,0.3)] text-xs px-4 py-2"
                  >
                    Submit RFP
                  </Button>
                )}
                {!isSubmitted && activeTab === "book" && bookingStep < 3 && (
                  <Button
                    disabled={true}
                    variant="primary"
                    size="sm"
                    className="opacity-40 cursor-not-allowed text-xs px-4 py-2"
                  >
                    Book Consultation
                  </Button>
                )}
                {!isSubmitted && activeTab === "book" && bookingStep === 3 && (
                  <Button
                    type="submit"
                    form="scheduling-form"
                    variant="primary"
                    size="sm"
                    className="shadow-[0_0_12px_rgba(255,80,4,0.3)] text-xs px-4 py-2"
                  >
                    Confirm Booking
                  </Button>
                )}
                <button
                  type="button"
                  className="text-[#A1A1AA] hover:text-[#F5F5F7] p-2 rounded-lg hover:bg-white/5 transition-colors border border-white/5 flex items-center justify-center shrink-0 cursor-pointer"
                  onClick={handleClose}
                  aria-label="Close Proposal Form"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Segmented Tab Switcher (only show if form not submitted) */}
            {!isSubmitted && (
              <div className="flex bg-[#0A0A0C] border border-white/5 rounded-xl p-1 gap-1 mb-5 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab("rfp")}
                  className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === "rfp"
                      ? "bg-[#FF5004] text-[#F5F5F7] shadow-[0_0_10px_rgba(255,80,4,0.3)]"
                      : "text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5"
                  }`}
                >
                  Request Proposal
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("book")}
                  className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === "book"
                      ? "bg-[#FF5004] text-[#F5F5F7] shadow-[0_0_10px_rgba(255,80,4,0.3)]"
                      : "text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5"
                  }`}
                >
                  Book Consultation
                </button>
              </div>
            )}

            {/* Content Body Switcher */}
            {activeTab === "rfp" ? (
              isSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center p-6 gap-6">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    {/* Glowing orange rotating outer circle */}
                    <motion.div 
                      className="absolute inset-0 rounded-full border-4 border-[#FF5004]/10 border-t-[#FF5004]"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="w-14 h-14 rounded-full bg-[#FF5004]/10 flex items-center justify-center text-[#FF5004] shadow-[0_0_20px_rgba(255,80,4,0.25)]">
                      <ShieldCheck size={32} />
                    </div>
                  </div>

                  <div className="max-w-md">
                    <h3 className="font-display text-2xl font-extrabold text-[#F5F5F7] tracking-tight mb-2.5">
                      Proposal Request Received!
                    </h3>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed">
                      Thank you for submitting your RFP specifications. Our operational coordinators and facility estimators are reviewing your data and will email you within 24 hours to schedule a site audit.
                    </p>
                  </div>

                  <div className="w-full max-w-xs mt-2">
                    <Button
                      onClick={handleClose}
                      variant="primary"
                      size="lg"
                      className="w-full shadow-[0_0_15px_rgba(255,80,4,0.2)]"
                    >
                      Close Window
                    </Button>
                  </div>
                </div>
              ) : (
                <form id="proposal-form" className="flex flex-col" onSubmit={handleSubmit}>
                  {/* Fields container (no nested overflow scroll to use root card scroll) */}
                  <div className="flex flex-col gap-5 pb-4">
                    {/* Spam Honeypot */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="company_website">Company Website</label>
                      <input
                        id="company_website"
                        type="text"
                        name="company_website"
                        tabIndex={-1}
                        autoComplete="off"
                        placeholder="Leave empty"
                      />
                    </div>

                    {/* Form Grid - 3 Columns on md viewports */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="fullName" className="font-display text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Contact Person *</label>
                        <input
                          id="fullName"
                          type="text"
                          name="fullName"
                          required
                          placeholder="Your full name"
                          className="bg-[#0A0A0C] border border-white/8 rounded-lg px-4 py-2 text-xs sm:text-sm text-[#F5F5F7] outline-none focus:border-[#FF5004] transition-colors"
                          disabled={formLoading}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="companyName" className="font-display text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Company Name *</label>
                        <input
                          id="companyName"
                          type="text"
                          name="companyName"
                          required
                          placeholder="Your enterprise name"
                          className="bg-[#0A0A0C] border border-white/8 rounded-lg px-4 py-2 text-xs sm:text-sm text-[#F5F5F7] outline-none focus:border-[#FF5004] transition-colors"
                          disabled={formLoading}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="font-display text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Corporate Email *</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          required
                          placeholder="e.g. facility@company.com"
                          className="bg-[#0A0A0C] border border-white/8 rounded-lg px-4 py-2 text-xs sm:text-sm text-[#F5F5F7] outline-none focus:border-[#FF5004] transition-colors"
                          disabled={formLoading}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone" className="font-display text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Phone Number *</label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          required
                          placeholder="e.g. +91 98765 43210"
                          className="bg-[#0A0A0C] border border-white/8 rounded-lg px-4 py-2 text-xs sm:text-sm text-[#F5F5F7] outline-none focus:border-[#FF5004] transition-colors"
                          disabled={formLoading}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="propertyType" className="font-display text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Property Category *</label>
                        <select
                          id="propertyType"
                          name="propertyType"
                          required
                          className="bg-[#0A0A0C] border border-white/8 rounded-lg px-4 py-2 text-xs sm:text-sm text-[#F5F5F7] outline-none focus:border-[#FF5004] transition-colors cursor-pointer"
                          disabled={formLoading}
                        >
                          <option value="">Select Category</option>
                          {navData.propertyTypeOptionsForForms.map((option, idx) => (
                            <option key={idx} value={option} className="bg-[#17171B] text-[#F5F5F7]">{option}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="propertySize" className="font-display text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Property Area (Sq. Ft.) *</label>
                        <input
                          id="propertySize"
                          type="text"
                          name="propertySize"
                          required
                          placeholder="e.g. 150,000 sq ft"
                          className="bg-[#0A0A0C] border border-white/8 rounded-lg px-4 py-2 text-xs sm:text-sm text-[#F5F5F7] outline-none focus:border-[#FF5004] transition-colors"
                          disabled={formLoading}
                        />
                      </div>
                    </div>

                    {/* Services Checkboxes - 3 Columns on md viewports */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Services of Interest (Select all that apply)</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 border border-white/8 rounded-lg p-3 bg-black/15">
                        {navData.serviceOptionsForForms.map((service, idx) => (
                          <label key={idx} className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={selectedServices.includes(service)}
                              onChange={() => handleCheckboxChange(service)}
                              className="w-3.5 h-3.5 accent-[#FF5004] cursor-pointer"
                              disabled={formLoading}
                            />
                            <span className="text-[11px] sm:text-xs text-[#F5F5F7] font-medium">{service}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="font-display text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Brief Scope of Requirements</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Provide details about MEP specifications or cleaning frequency targets..."
                        className="bg-[#0A0A0C] border border-white/8 rounded-lg px-4 py-2 text-xs sm:text-sm text-[#F5F5F7] outline-none focus:border-[#FF5004] transition-colors resize-y"
                        disabled={formLoading}
                      />
                    </div>
                  </div>
                </form>
              )
            ) : (
              <div className="pb-4">
                <SchedulingWidget onStepChange={(step) => setBookingStep(step)} />
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
