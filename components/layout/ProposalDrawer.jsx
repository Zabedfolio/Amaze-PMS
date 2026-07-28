"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { toast } from "react-hot-toast";
import Button from "../ui/Button";
import { mockSubmit } from "../../lib/mockSubmit";
import navData from "../../data/navigation.json";

export default function ProposalDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    const handleOpen = (e) => {
      const targetService = e.detail?.service; // e.g., "Professional Housekeeping"
      if (targetService) {
        setSelectedServices([targetService]);
      } else {
        setSelectedServices([]);
      }
      setIsOpen(true);
      // Lock body scroll
      document.body.style.overflow = "hidden";
    };

    window.addEventListener("open-proposal", handleOpen);
    return () => {
      window.removeEventListener("open-proposal", handleOpen);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Restore body scroll
    document.body.style.overflow = "";
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
      toast.success("Proposal request received! Our estimators will contact you within 24 hours.");
      formEl.reset();
      setSelectedServices([]);
      handleClose();
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
            className="bg-[#17171B] border-t border-x border-white/10 rounded-t-[24px] p-6 sm:p-8 max-w-3xl w-full relative shadow-2xl flex flex-col justify-between h-[88vh] md:h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
          >
            {/* Close button */}
            <button
              type="button"
              className="absolute top-4 right-4 text-[#A1A1AA] hover:text-[#F5F5F7] p-2 rounded-lg hover:bg-white/5 transition-colors z-10"
              onClick={handleClose}
              aria-label="Close Proposal Form"
            >
              <X size={22} />
            </button>

            <div className="mb-5 pr-8">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#F5F5F7] mb-1.5">Request a Facility Proposal</h2>
              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                Provide details about your property size and service interests. Fields marked with * are required.
              </p>
            </div>

            <form className="flex-1 flex flex-col gap-5" onSubmit={handleSubmit}>
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

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              {/* Services Checkboxes */}
              <div className="flex flex-col gap-1.5">
                <label className="font-display text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Services of Interest (Select all that apply)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border border-white/8 rounded-lg p-3 bg-black/15">
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
                  rows={2}
                  placeholder="Provide details about MEP specifications or cleaning frequency targets..."
                  className="bg-[#0A0A0C] border border-white/8 rounded-lg px-4 py-2 text-xs sm:text-sm text-[#F5F5F7] outline-none focus:border-[#FF5004] transition-colors resize-y"
                  disabled={formLoading}
                />
              </div>

              <div className="mt-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={formLoading}
                  className="w-full"
                >
                  Submit RFP Inquiry
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
