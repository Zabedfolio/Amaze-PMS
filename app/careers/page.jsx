"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { 
  Shield, 
  GraduationCap, 
  AlertTriangle, 
  TrendingUp, 
  Briefcase, 
  MapPin, 
  Clock, 
  X 
} from "lucide-react";
import careersData from "../../data/careers.json";
import { mockSubmit } from "../../lib/mockSubmit";
import Button from "../../components/ui/Button";
import AmbientAura from "../../components/ui/AmbientAura";
import RollingNumber from "../../components/ui/RollingNumber";

const iconMap = {
  Shield: Shield,
  GraduationCap: GraduationCap,
  AlertTriangle: AlertTriangle,
  TrendingUp: TrendingUp,
};

export default function CareersPage() {
  const [activeDept, setActiveDept] = useState("all");
  const [formLoading, setFormLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredRoles = activeDept === "all"
    ? careersData.openRoles
    : careersData.openRoles.filter((role) => role.department === activeDept);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    
    const payload = {};
    formData.forEach((value, key) => {
      if (value instanceof File) {
        payload[key] = value.name || "resume.pdf";
      } else {
        payload[key] = value;
      }
    });

    try {
      await mockSubmit(payload);
      toast.success("Application submitted! Our recruitment desk will contact you.");
      formEl.reset();
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.message || "Failed to submit application. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="bg-[#0A0A0C] min-h-screen">
      
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#111114] to-[#0A0A0C] border-b border-white/8">
        <AmbientAura />
        <div className="container relative z-10 flex flex-col gap-4">
          <span className="font-display text-xs font-semibold uppercase tracking-wider text-[#FF5004]">Work With Us</span>
          <h1 className="font-display text-[clamp(2.25rem,6vw,4rem)] font-extrabold text-[#F5F5F7] tracking-tight leading-tight max-w-4xl">
            Join <span className="text-[#FF5004]"><RollingNumber value={15000} suffix="+" /></span> Facility Professionals
          </h1>
          <p className="text-[#A1A1AA] text-[clamp(1rem,2.5vw,1.1875rem)] leading-relaxed max-w-2xl">
            Build your career with Action Group's property management division. 100% compliant salary payouts, statutory PF/ESIC coverage, and Amaze Academy training resources.
          </p>
        </div>
      </section>

      {/* Benefits Bento Grid */}
      <section className="py-24 bg-[#0A0A0C]">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <h2 className="font-display text-3xl font-extrabold text-[#F5F5F7] tracking-tight mb-2">The Amaze Advantage</h2>
            <p className="text-[#A1A1AA] text-base leading-relaxed">Why thousands of operational engineers and janitorial experts choose Amaze.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {careersData.benefits.map((benefit) => {
              const IconComponent = iconMap[benefit.icon] || Shield;
              return (
                <div key={benefit.id} className="bg-[#17171B] border border-white/8 rounded-xl p-6 flex flex-col gap-4 hover:border-[#FF5004]/30 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-lg bg-[#FF5004]/10 border border-[#FF5004]/20 flex items-center justify-center text-[#FF5004]">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#F5F5F7]">{benefit.title}</h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Roles filterable section */}
      <section className="py-24 bg-[#111114] border-t border-b border-white/8">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <span className="font-display text-xs font-semibold uppercase tracking-wider text-[#FF5004]">Openings</span>
            <h2 className="font-display text-3xl font-extrabold text-[#F5F5F7] tracking-tight mt-2 mb-2">Available Job Openings</h2>
            <p className="text-[#A1A1AA] text-base leading-relaxed">Apply directly to our regional operations desks. Direct recruitment, zero agent fees.</p>
          </div>

          {/* Department Filters */}
          <div className="flex flex-wrap gap-2 mb-10 border-b border-white/8 pb-4">
            {careersData.departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveDept(dept.id)}
                className={`px-5 py-2.5 rounded-full font-display text-sm font-semibold transition-colors duration-300 ${
                  activeDept === dept.id
                    ? "bg-[#FF5004] text-[#0A0A0C]"
                    : "bg-white/[0.03] text-[#A1A1AA] hover:text-[#F5F5F7] border border-white/8"
                }`}
              >
                {dept.label}
              </button>
            ))}
          </div>

          {/* Jobs Listing */}
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {filteredRoles.map((role) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  key={role.id}
                  className="bg-[#17171B] border border-white/8 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#FF5004]/30 transition-colors duration-300"
                >
                  <div className="flex flex-col gap-3 max-w-2xl">
                    <h3 className="font-display text-xl font-bold text-[#F5F5F7]">{role.title}</h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/8 text-xs text-[#A1A1AA]">
                        <Briefcase size={12} />
                        <span>{role.type}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/8 text-xs text-[#A1A1AA]">
                        <MapPin size={12} />
                        <span>{role.location}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/8 text-xs text-[#A1A1AA]">
                        <Clock size={12} />
                        <span>{role.experience} experience</span>
                      </span>
                    </div>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed">{role.description}</p>
                  </div>
                  <div className="shrink-0">
                    <Button onClick={() => handleApplyClick(role.id)} variant="outline" size="sm">
                      Apply Now
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Interactive Application Bottom Sheet Drawer Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end justify-center overflow-hidden" onClick={() => setIsModalOpen(false)}>
            <motion.div
              className="bg-[#17171B] border-t border-x border-white/10 rounded-t-[24px] p-6 sm:p-8 max-w-2xl w-full relative shadow-2xl flex flex-col justify-between h-[88vh] md:h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
            >
              {/* Close handle button */}
              <button 
                type="button" 
                className="absolute top-4 right-4 text-[#A1A1AA] hover:text-[#F5F5F7] p-2 rounded-lg hover:bg-white/5 transition-colors z-10" 
                onClick={() => setIsModalOpen(false)}
                aria-label="Close form"
              >
                <X size={22} />
              </button>

              <div className="mb-5 pr-8">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#F5F5F7] mb-1.5">Submit Your Candidacy</h2>
                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                  Upload your credentials. Our HR compliance officers audit all profiles within 48 hours.
                </p>
              </div>

              <form className="flex-1 flex flex-col gap-4" onSubmit={handleApplicationSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fullName" className="font-display text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Full Name *</label>
                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      required
                      placeholder="Enter your full name"
                      className="bg-[#0A0A0C] border border-white/8 rounded-lg px-4 py-2 text-xs sm:text-sm text-[#F5F5F7] outline-none focus:border-[#FF5004] transition-colors"
                      disabled={formLoading}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="font-display text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your email"
                      className="bg-[#0A0A0C] border border-white/8 rounded-lg px-4 py-2 text-xs sm:text-sm text-[#F5F5F7] outline-none focus:border-[#FF5004] transition-colors"
                      disabled={formLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <label htmlFor="position" className="font-display text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Target Position *</label>
                    <select
                      id="position"
                      name="position"
                      required
                      className="bg-[#0A0A0C] border border-white/8 rounded-lg px-4 py-2 text-xs sm:text-sm text-[#F5F5F7] outline-none focus:border-[#FF5004] transition-colors"
                      disabled={formLoading}
                      value={targetPosition}
                      onChange={(e) => setTargetPosition(e.target.value)}
                    >
                      <option value="">Select a role</option>
                      {careersData.openRoles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.title} ({role.location})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="experience" className="font-display text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Years of Experience *</label>
                    <select
                      id="experience"
                      name="experience"
                      required
                      className="bg-[#0A0A0C] border border-white/8 rounded-lg px-4 py-2 text-xs sm:text-sm text-[#F5F5F7] outline-none focus:border-[#FF5004] transition-colors"
                      disabled={formLoading}
                    >
                      <option value="">Select range</option>
                      <option value="1-2">1 - 2 Years</option>
                      <option value="3-5">3 - 5 Years</option>
                      <option value="5-8">5 - 8 Years</option>
                      <option value="8+">8+ Years</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="currentLocation" className="font-display text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Current Location *</label>
                    <input
                      id="currentLocation"
                      type="text"
                      name="currentLocation"
                      required
                      placeholder="e.g. Hyderabad"
                      className="bg-[#0A0A0C] border border-white/8 rounded-lg px-4 py-2 text-xs sm:text-sm text-[#F5F5F7] outline-none focus:border-[#FF5004] transition-colors"
                      disabled={formLoading}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="resume" className="font-display text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Attach CV / Resume (PDF, Word) *</label>
                  <input
                    id="resume"
                    type="file"
                    name="resume"
                    required
                    accept=".pdf,.doc,.docx"
                    className="bg-[#0A0A0C] border border-white/8 rounded-lg p-2 text-xs sm:text-sm text-[#A1A1AA] file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:sm:text-xs file:font-semibold file:bg-[#FF5004] file:text-[#0A0A0C]"
                    disabled={formLoading}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="font-display text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Brief Statement / Note</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={2}
                    placeholder="Share details about your core qualifications..."
                    className="bg-[#0A0A0C] border border-white/8 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-[#F5F5F7] outline-none focus:border-[#FF5004] transition-colors resize-y"
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
                    Submit Application
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
