"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { Phone, Mail, MapPin } from "lucide-react";
import navData from "../../data/navigation.json";
import { mockSubmit } from "../../lib/mockSubmit";
import Button from "../../components/ui/Button";
import GlassCard from "../../components/ui/GlassCard";
import SchedulingWidget from "../../components/sections/SchedulingWidget";

function ContactContent() {
  const searchParams = useSearchParams();
  const [formLoading, setFormLoading] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      const matched = navData.serviceOptionsForForms.find((option) =>
        option.toLowerCase().includes(serviceParam.toLowerCase())
      );
      if (matched && !selectedServices.includes(matched)) {
        setSelectedServices([matched]);
      }
    }
  }, [searchParams]);

  const handleCheckboxChange = (serviceName) => {
    if (selectedServices.includes(serviceName)) {
      setSelectedServices(selectedServices.filter((s) => s !== serviceName));
    } else {
      setSelectedServices([...selectedServices, serviceName]);
    }
  };

  const handleContactSubmit = async (e) => {
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
      toast.success("Quote request received! Our estimators will contact you.");
      formEl.reset();
      setSelectedServices([]);
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="bg-[#0A0A0C] min-h-screen">
      {/* Hero Header */}
      <section className="pt-32 pb-16 border-b border-white/8 bg-gradient-to-b from-[#111114] to-[#0A0A0C] relative overflow-hidden">
        <div className="container relative z-10 flex flex-col gap-4">
          <span className="font-display text-xs font-semibold uppercase tracking-wider text-[#FF5004]">Contact</span>
          <h1 className="font-display text-[clamp(2.25rem,6vw,4rem)] font-extrabold text-[#F5F5F7] tracking-tight leading-tight max-w-4xl">
            Let's Talk Property Management
          </h1>
          <p className="text-[#A1A1AA] text-[clamp(1rem,2.5vw,1.1875rem)] leading-relaxed max-w-2xl">
            Request a comprehensive facility load or safety audit. Connect with our Cyberabad headquarters for regional deployments.
          </p>
        </div>
      </section>

      {/* Instant Booking Section */}
      <section id="schedule" className="py-24 border-b border-white/8 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,80,4,0.02),transparent_50%)] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-wider text-[#FF5004] uppercase font-display">Instant Booking</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#F5F5F7] tracking-tight mt-2 mb-4 font-display">
              Schedule a Consultation
            </h2>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Book a direct 30-minute call with our estimators to scope out your property's MEP or janitorial needs.
            </p>
          </div>
          <SchedulingWidget />
        </div>
      </section>
      
      {/* Section 1: Standard RFP Quote Form & Map */}
      <section className="py-24 bg-[#0A0A0C]">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Address Card & Map */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <GlassCard className="p-8 flex flex-col gap-6" hoverEffect={false}>
              <h2 className="font-display text-2xl font-bold text-[#F5F5F7]">Action Group Headquarters</h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Our central operations desk coordinates B2B billing, compliance audits, and SLA reporting registries nationwide.
              </p>

              <div className="flex flex-col gap-6 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#FF5004]/10 border border-[#FF5004]/20 text-[#FF5004] flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Corporate Address</h4>
                    <p className="text-sm text-[#F5F5F7] font-medium mt-1">Action Group House, Phase 2, HITEC City, Hyderabad, 500081</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#FF5004]/10 border border-[#FF5004]/20 text-[#FF5004] flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Regional Estimations</h4>
                    <p className="text-sm text-[#F5F5F7] font-medium mt-1">+91 40 4567 8900 / +91 99887 76655</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#FF5004]/10 border border-[#FF5004]/20 text-[#FF5004] flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Corporate Inquiries</h4>
                    <p className="text-sm text-[#F5F5F7] font-medium mt-1">proposals@amazepms.com / info@amazepms.com</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Styled Map Placeholder */}
            <div className="relative h-64 rounded-2xl overflow-hidden border border-white/8 bg-[#17171B] flex items-center justify-center">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
              <div className="relative z-10 bg-[#0A0A0C]/90 border border-[#FF5004]/30 rounded-xl p-4 flex items-center gap-3 shadow-xl">
                <MapPin size={24} className="text-[#FF5004]" />
                <div>
                  <h5 className="font-display text-sm font-bold text-[#F5F5F7]">AMAZE PMS HQ</h5>
                  <p className="text-xs text-[#A1A1AA]">HITEC City, Cyberabad</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quote RFP Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#17171B] border border-white/8 rounded-2xl p-8 sm:p-10 shadow-2xl">
              <h2 className="font-display text-2xl font-bold text-[#F5F5F7] mb-2">Request a Facility Proposal</h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-8">
                Provide details about your property size and service interests. Fields marked with * are required.
              </p>

              <form className="flex flex-col gap-6" onSubmit={handleContactSubmit}>
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="company_website">Company Website</label>
                  <input
                    id="company_website"
                    type="text"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                    placeholder="Leave this empty"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="fullName" className="font-display text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Contact Person *</label>
                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      required
                      placeholder="Your full name"
                      className="bg-[#0A0A0C] border border-white/8 rounded-xl px-4 py-3 text-sm text-[#F5F5F7] outline-none focus:border-[#FF5004] transition-colors"
                      disabled={formLoading}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="companyName" className="font-display text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Company Name *</label>
                    <input
                      id="companyName"
                      type="text"
                      name="companyName"
                      required
                      placeholder="Your enterprise name"
                      className="bg-[#0A0A0C] border border-white/8 rounded-xl px-4 py-3 text-sm text-[#F5F5F7] outline-none focus:border-[#FF5004] transition-colors"
                      disabled={formLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-display text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Corporate Email *</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. facility@company.com"
                      className="bg-[#0A0A0C] border border-white/8 rounded-xl px-4 py-3 text-sm text-[#F5F5F7] outline-none focus:border-[#FF5004] transition-colors"
                      disabled={formLoading}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="font-display text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Phone Number *</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +91 98765 43210"
                      className="bg-[#0A0A0C] border border-white/8 rounded-xl px-4 py-3 text-sm text-[#F5F5F7] outline-none focus:border-[#FF5004] transition-colors"
                      disabled={formLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="propertyType" className="font-display text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Property Category *</label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      required
                      className="bg-[#0A0A0C] border border-white/8 rounded-xl px-4 py-3 text-sm text-[#F5F5F7] outline-none focus:border-[#FF5004] transition-colors cursor-pointer"
                      disabled={formLoading}
                    >
                      <option value="">Select Category</option>
                      {navData.propertyTypeOptionsForForms.map((option, idx) => (
                        <option key={idx} value={option} className="bg-[#17171B] text-[#F5F5F7]">{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="propertySize" className="font-display text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Property Area (Sq. Ft.) *</label>
                    <input
                      id="propertySize"
                      type="text"
                      name="propertySize"
                      required
                      placeholder="e.g. 150,000 sq ft"
                      className="bg-[#0A0A0C] border border-white/8 rounded-xl px-4 py-3 text-sm text-[#F5F5F7] outline-none focus:border-[#FF5004] transition-colors"
                      disabled={formLoading}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-display text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Services of Interest (Select all that apply)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border border-white/8 rounded-xl p-4 bg-black/15">
                    {navData.serviceOptionsForForms.map((service, idx) => (
                      <label key={idx} className="flex items-center gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(service)}
                          onChange={() => handleCheckboxChange(service)}
                          className="w-4 h-4 accent-[#FF5004] cursor-pointer"
                          disabled={formLoading}
                        />
                        <span className="text-xs text-[#F5F5F7] font-medium">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-display text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Brief Scope of Requirements</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Provide details about MEP specifications or cleaning frequency targets..."
                    className="bg-[#0A0A0C] border border-white/8 rounded-xl px-4 py-3 text-sm text-[#F5F5F7] outline-none focus:border-[#FF5004] transition-colors resize-y"
                    disabled={formLoading}
                  />
                </div>

                <div className="mt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={formLoading}
                    className="w-full sm:w-auto min-w-[200px]"
                  >
                    Submit RFP Inquiry
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-[#A1A1AA]">Loading Contact Page...</div>}>
      <ContactContent />
    </Suspense>
  );
}
