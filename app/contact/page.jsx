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
import styles from "./Contact.module.scss";

function ContactContent() {
  const searchParams = useSearchParams();
  const [formLoading, setFormLoading] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  // Check if a service parameter was deep-linked (e.g. ?service=housekeeping)
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

    // Honeypot spam check
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
    <div className={styles.contactPage}>
      {/* Hero Header */}
      <section className={styles.heroSection}>
        <div className={`${styles.heroContainer} container`}>
          <span className={styles.tag}>Contact</span>
          <h1 className={styles.headline}>Let's Talk Property Management</h1>
          <p className={styles.subheadline}>
            Request a comprehensive facility load or safety audit. Connect with our Cyberabad headquarters for regional deployments.
          </p>
        </div>
      </section>

  <section id="schedule" className="py-24 border-t border-white/5 bg-black relative overflow-hidden">
        {/* Soft background light */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,80,4,0.02),transparent_50%)] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-wider text-accent uppercase font-display">Instant Booking</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-2 mb-4 font-display font-sans">
              Schedule a Consultation
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Book a direct 30-minute call with our estimators to scope out your property's MEP or janitorial needs.
            </p>
          </div>
          <SchedulingWidget />
        </div>
      </section>
      
      {/* Section 1: Standard RFP Quote Form & Map */}
      <section className={styles.contentSection}>
        <div className={`${styles.gridContainer} container`}>
          {/* Left Column: Address Card & Map */}
          <div className={styles.infoColumn}>
            <GlassCard className={styles.infoCard} hoverEffect={false}>
              <h2 className={styles.columnTitle}>Action Group Headquarters</h2>
              <p className={styles.officeDesc}>
                Our central operations desk coordinates B2B billing, compliance audits, and SLA reporting registries nationwide.
              </p>

              <div className={styles.contactsList}>
                <div className={styles.contactItem}>
                  <div className={styles.iconBox}><MapPin size={18} /></div>
                  <div className={styles.contactText}>
                    <h4>Corporate Address</h4>
                    <p>Action Group House, Phase 2, HITEC City, Hyderabad, 500081</p>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.iconBox}><Phone size={18} /></div>
                  <div className={styles.contactText}>
                    <h4>Regional Estimations</h4>
                    <p>+91 40 4567 8900 / +91 99887 76655</p>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.iconBox}><Mail size={18} /></div>
                  <div className={styles.contactText}>
                    <h4>Corporate Inquiries</h4>
                    <p>proposals@amazepms.com / info@amazepms.com</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Styled Map Placeholder */}
            <div className={styles.mapContainer}>
              <div className={styles.mapBackground}>
                <div className={styles.mapGridLines} />
                <div className={styles.mapMarkerCard}>
                  <MapPin size={24} className={styles.markerIcon} />
                  <div className={styles.markerText}>
                    <h5>AMAZE PMS HQ</h5>
                    <p>HITEC City, Cyberabad</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quote RFP Form */}
          <div className={styles.formColumn}>
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>Request a Facility Proposal</h2>
              <p className={styles.formSub}>
                Provide details about your property size and service interests. Fields marked with * are required.
              </p>

              <form className={styles.contactForm} onSubmit={handleContactSubmit}>
                <div className={styles.honeypot} aria-hidden="true">
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

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="fullName" className={styles.label}>Contact Person *</label>
                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      required
                      placeholder="Your full name"
                      className={styles.input}
                      disabled={formLoading}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="companyName" className={styles.label}>Company Name *</label>
                    <input
                      id="companyName"
                      type="text"
                      name="companyName"
                      required
                      placeholder="Your enterprise name"
                      className={styles.input}
                      disabled={formLoading}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Corporate Email *</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. facility@company.com"
                      className={styles.input}
                      disabled={formLoading}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="phone" className={styles.label}>Phone Number *</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +91 98765 43210"
                      className={styles.input}
                      disabled={formLoading}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="propertyType" className={styles.label}>Property Category *</label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      required
                      className={styles.select}
                      disabled={formLoading}
                    >
                      <option value="">Select Category</option>
                      {navData.propertyTypeOptionsForForms.map((option, idx) => (
                        <option key={idx} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="propertySize" className={styles.label}>Property Area (Sq. Ft.) *</label>
                    <input
                      id="propertySize"
                      type="text"
                      name="propertySize"
                      required
                      placeholder="e.g. 150,000 sq ft"
                      className={styles.input}
                      disabled={formLoading}
                    />
                  </div>
                </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Services of Interest (Select all that apply)</label>
                    <div className={styles.servicesGrid}>
                      {navData.serviceOptionsForForms.map((service, idx) => (
                        <label key={idx} className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(service)}
                            onChange={() => handleCheckboxChange(service)}
                            className={styles.checkbox}
                            disabled={formLoading}
                          />
                          <span className={styles.checkboxText}>{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="message" className={styles.label}>Brief Scope of Requirements</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Provide details about MEP specifications or cleaning frequency targets..."
                      className={styles.textarea}
                      disabled={formLoading}
                    />
                  </div>

                  <div className={styles.submitRow}>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={formLoading}
                      className={styles.submitBtn}
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
    <Suspense fallback={<div style={{ padding: "100px 0", textAlign: "center", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>Loading Contact Page...</div>}>
      <ContactContent />
    </Suspense>
  );
}
