"use client";

import React from "react";
import Button from "../../components/ui/Button";
import GlassCard from "../../components/ui/GlassCard";
import styles from "./Legal.module.scss";

export default function PrivacyPage() {
  return (
    <div className={styles.legalPage}>
      <div className="container">
        <GlassCard className={styles.legalCard}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <span className={styles.date}>Effective Date: July 27, 2026</span>

          <div className={styles.richText}>
            <p>
              Amaze Property Management Solutions Pvt Ltd (a division of Action Group) takes corporate privacy seriously. This policy describes how we collect, store, and shield corporate client coordinates, visitor logs, and facility RFP submissions.
            </p>
            <h3>1. Information Collected</h3>
            <p>
              We compile basic contact credentials submitted through our digital RFP quote worksheets and application candidacy panels. No automated cookies track individual profiles beyond generic site optimization parameters.
            </p>
            <h3>2. Protection and Storage</h3>
            <p>
              All facility data is stored in ISO-compliant operational storage registers under strict corporate access controls. Amaze PMS does not share or sell commercial coordinates to unverified brokers or marketers.
            </p>
            <h3>3. Statutory Records</h3>
            <p>
              Labor registries, PF/ESIC disbursements, and KYC records of deployed personnel are safeguarded in compliance with regional statutory authorities and state legislation.
            </p>
            <p>
              If you have inquiries regarding compliance audit logs or data correction, contact our data desk at <strong>privacy@amazepms.com</strong>.
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
