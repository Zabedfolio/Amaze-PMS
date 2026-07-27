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
import Spinner from "../../components/ui/Spinner";
import GlassCard from "../../components/ui/GlassCard";
import AmbientAura from "../../components/ui/AmbientAura";
import styles from "./Careers.module.scss";

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
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [targetPosition, setTargetPosition] = useState("");

  const filteredRoles = activeDept === "all"
    ? careersData.openRoles
    : careersData.openRoles.filter((role) => role.department === activeDept);

  // Sync selected role to form input value state
  useEffect(() => {
    setTargetPosition(selectedRoleId);
  }, [selectedRoleId]);

  const handleApplyClick = (roleId) => {
    setSelectedRoleId(roleId);
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
      setIsModalOpen(false); // Close Modal on success
    } catch (err) {
      toast.error(err.message || "Failed to submit application. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className={styles.careersPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <AmbientAura />
        <div className={`${styles.heroContainer} container`}>
          <span className={styles.tag}>Work With Us</span>
          <h1 className={styles.headline}>Join 15,000+ Facility Professionals</h1>
          <p className={styles.subheadline}>
            Build your career with Action Group's property management division. 100% compliant salary payouts, statutory PF/ESIC coverage, and Amaze Academy training resources.
          </p>
        </div>
      </section>

      {/* Benefits Bento Grid */}
      <section className={styles.benefitsSection}>
        <div className={`${styles.benefitsContainer} container`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>The Amaze Advantage</h2>
            <p className={styles.sectionSub}>Why thousands of operational engineers and janitorial experts choose Amaze.</p>
          </div>

          <div className={styles.benefitsGrid}>
            {careersData.benefits.map((benefit) => {
              const IconComponent = iconMap[benefit.icon] || Shield;
              return (
                <div key={benefit.id} className={styles.benefitCard}>
                  <div className={styles.benefitIconBox}>
                    <IconComponent size={24} className={styles.benefitIcon} />
                  </div>
                  <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                  <p className={styles.benefitDesc}>{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Roles filterable section */}
      <section className={styles.rolesSection}>
        <div className={`${styles.rolesContainer} container`}>
          <div className={styles.sectionHeader}>
            <span className={styles.secTag}>Openings</span>
            <h2 className={styles.sectionTitle}>Available Job Openings</h2>
            <p className={styles.sectionSub}>Apply directly to our regional operations desks. Direct recruitment, zero agent fees.</p>
          </div>

          {/* Department Filters */}
          <div className={styles.filtersList}>
            {careersData.departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveDept(dept.id)}
                className={`${styles.filterBtn} ${activeDept === dept.id ? styles.activeFilter : ""}`}
              >
                {dept.label}
              </button>
            ))}
          </div>

          {/* Jobs Listing */}
          <div className={styles.jobsList}>
            <AnimatePresence mode="popLayout">
              {filteredRoles.map((role) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  key={role.id}
                  className={styles.jobRow}
                >
                  <div className={styles.jobInfo}>
                    <h3 className={styles.jobTitle}>{role.title}</h3>
                    <div className={styles.jobMetaRow}>
                      <span className={styles.metaTag}>
                        <Briefcase size={12} />
                        <span>{role.type}</span>
                      </span>
                      <span className={styles.metaTag}>
                        <MapPin size={12} />
                        <span>{role.location}</span>
                      </span>
                      <span className={styles.metaTag}>
                        <Clock size={12} />
                        <span>{role.experience} experience</span>
                      </span>
                    </div>
                    <p className={styles.jobDesc}>{role.description}</p>
                  </div>
                  <div className={styles.jobAction}>
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

      {/* Interactive Application Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
            <motion.div
              className={styles.modalCard}
              onClick={(e) => e.stopPropagation()} // Prevent bubble triggers
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 24 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <button 
                type="button" 
                className={styles.closeBtn} 
                onClick={() => setIsModalOpen(false)}
                aria-label="Close form"
              >
                <X size={22} />
              </button>

              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Submit Your Candidacy</h2>
                <p className={styles.formSub}>
                  Upload your credentials. Our HR compliance officers audit all profiles within 48 hours.
                </p>
              </div>

              <form className={styles.careersForm} onSubmit={handleApplicationSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="fullName" className={styles.label}>Full Name *</label>
                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      required
                      placeholder="Enter your full name"
                      className={styles.input}
                      disabled={formLoading}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your email"
                      className={styles.input}
                      disabled={formLoading}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
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
                  <div className={styles.inputGroup}>
                    <label htmlFor="position" className={styles.label}>Target Position *</label>
                    <select
                      id="position"
                      name="position"
                      required
                      className={styles.select}
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

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="experience" className={styles.label}>Years of Experience *</label>
                    <select
                      id="experience"
                      name="experience"
                      required
                      className={styles.select}
                      disabled={formLoading}
                    >
                      <option value="">Select range</option>
                      <option value="1-2">1 - 2 Years</option>
                      <option value="3-5">3 - 5 Years</option>
                      <option value="5-8">5 - 8 Years</option>
                      <option value="8+">8+ Years</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="currentLocation" className={styles.label}>Current Location *</label>
                    <input
                      id="currentLocation"
                      type="text"
                      name="currentLocation"
                      required
                      placeholder="e.g. Hyderabad"
                      className={styles.input}
                      disabled={formLoading}
                    />
                  </div>
                </div>

                {/* File Upload resume */}
                <div className={styles.inputGroup}>
                  <label htmlFor="resume" className={styles.label}>Attach CV / Resume (PDF, Word) *</label>
                  <div className={styles.fileWrapper}>
                    <input
                      id="resume"
                      type="file"
                      name="resume"
                      required
                      accept=".pdf,.doc,.docx"
                      className={styles.fileInput}
                      disabled={formLoading}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className={styles.inputGroup}>
                  <label htmlFor="message" className={styles.label}>Brief Statement / Note</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Share details about your core qualifications..."
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
