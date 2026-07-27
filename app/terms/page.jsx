"use client";

import React from "react";
import Button from "../../components/ui/Button";
import GlassCard from "../../components/ui/GlassCard";
import styles from "../privacy/Legal.module.scss"; // reuse the legal styles to keep bundle size light

export default function TermsPage() {
  return (
    <div className={styles.legalPage}>
      <div className="container">
        <GlassCard className={styles.legalCard}>
          <h1 className={styles.title}>Terms of Service</h1>
          <span className={styles.date}>Effective Date: July 27, 2026</span>

          <div className={styles.richText}>
            <p>
              Welcome to the digital portal of Amaze Property Management Solutions Pvt Ltd. By submitting proposals or accessing materials, you acknowledge compliance with our B2B guidelines.
            </p>
            <h3>1. Scope of Services</h3>
            <p>
              Actual deliverables, SLA specifications, response times, and billing coefficients are governed exclusively by formal service level agreements executed directly between client committees and Amaze regional offices.
            </p>
            <h3>2. Personnel Deployments</h3>
            <p>
              All facility operators, janitors, and engineering practitioners deployed at client sites remain under direct Amaze payrolls and statutory coverages. Client committees agree to avoid direct solicitation of Amaze staff during contract durations.
            </p>
            <h3>3. Compliance Shield</h3>
            <p>
              Amaze PMS indemnifies clients against all labor minimum-wage or PF/ESIC liabilities by providing monthly digital compliance registries showing prompt employee payments.
            </p>
            <p>
              For legal escalations or contract copies, consult your dedicated regional account controller or email <strong>legal@amazepms.com</strong>.
            </p>
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
