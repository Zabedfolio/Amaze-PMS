"use client";

import React from "react";
import { ShieldCheck, ClipboardCheck, Users, Landmark } from "lucide-react";
import Button from "../../components/ui/Button";
import GlassCard from "../../components/ui/GlassCard";
import styles from "../privacy/Legal.module.scss";

export default function CompliancePage() {
  return (
    <div className={styles.legalPage}>
      <div className="container">
        <GlassCard className={styles.legalCard}>
          <h1 className={styles.title}>Statutory Compliance Shield</h1>
          <span className={styles.date}>Audit Standards: FY 2026-2027</span>

          <div className={styles.richText}>
            <p>
              Amaze Property Management Solutions operates under a zero-exception compliance mandate. We protect client organizations from co-employer liabilities by maintaining direct oversight on all statutory disbursements.
            </p>

            <div className={styles.complianceGrid} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", margin: "32px 0" }}>
              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", padding: "20px", borderRadius: "8px" }}>
                <div style={{ color: "var(--accent)", marginBottom: "12px" }}><Landmark size={24} /></div>
                <h4 style={{ color: "var(--text-primary)", marginBottom: "8px", fontFamily: "var(--font-display)", fontWeight: "700" }}>PF & ESIC Compliance</h4>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", margin: 0 }}>Monthly payments are processed directly via bank transfer. We provide official Electronic Challan cum Returns (ECR) to client committees before billing clearance.</p>
              </div>
              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", padding: "20px", borderRadius: "8px" }}>
                <div style={{ color: "var(--accent)", marginBottom: "12px" }}><ClipboardCheck size={24} /></div>
                <h4 style={{ color: "var(--text-primary)", marginBottom: "8px", fontFamily: "var(--font-display)", fontWeight: "700" }}>ISO Quality Audits</h4>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", margin: 0 }}>Our MEP and STP water plants are audited against ISO 9001:2015 and ISO 14001:2015 standards to verify compliance with environment pollution guidelines.</p>
              </div>
            </div>

            <h3>Our Statutory Certifications:</h3>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px", margin: "24px 0" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-primary)", fontSize: "0.9375rem" }}>
                <ShieldCheck size={18} style={{ color: "var(--accent)" }} />
                <span>100% Minimum Wage Act adherence across all state jurisdictions.</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-primary)", fontSize: "0.9375rem" }}>
                <ShieldCheck size={18} style={{ color: "var(--accent)" }} />
                <span>Active CLRA (Contract Labour Regulation & Abolition Act) registrations.</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-primary)", fontSize: "0.9375rem" }}>
                <ShieldCheck size={18} style={{ color: "var(--accent)" }} />
                <span>Staff coverage under Workmen Compensation and Public Liability Insurances.</span>
              </li>
            </ul>
          </div>

          <div className={styles.actionRow}>
            <Button href="/" variant="primary" size="md">
              Return to Homepage
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
