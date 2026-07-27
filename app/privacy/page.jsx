"use client";

import React from "react";
import Button from "../../components/ui/Button";
import GlassCard from "../../components/ui/GlassCard";

export default function PrivacyPage() {
  return (
    <div className="bg-[#0A0A0C] min-h-screen pt-32 pb-20 flex items-center">
      <div className="container">
        <GlassCard className="max-w-4xl mx-auto p-8 sm:p-12 shadow-2xl">
          <h1 className="font-display text-[clamp(2rem,5vw,2.75rem)] font-extrabold text-[#F5F5F7] tracking-tight mb-2 leading-tight">
            Privacy Policy
          </h1>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#FF5004] block mb-8">
            Effective Date: July 27, 2026
          </span>

          <div className="text-[#A1A1AA] text-base leading-relaxed space-y-4">
            <p>
              Amaze Property Management Solutions Pvt Ltd (a division of Action Group) takes corporate privacy seriously. This policy describes how we collect, store, and shield corporate client coordinates, visitor logs, and facility RFP submissions.
            </p>
            <h3 className="font-display text-xl font-bold text-[#F5F5F7] pt-4 pb-1">1. Information Collected</h3>
            <p>
              We compile basic contact credentials submitted through our digital RFP quote worksheets and application candidacy panels. No automated cookies track individual profiles beyond generic site optimization parameters.
            </p>
            <h3 className="font-display text-xl font-bold text-[#F5F5F7] pt-4 pb-1">2. Protection and Storage</h3>
            <p>
              All facility data is stored in ISO-compliant operational storage registers under strict corporate access controls. Amaze PMS does not share or sell commercial coordinates to unverified brokers or marketers.
            </p>
            <h3 className="font-display text-xl font-bold text-[#F5F5F7] pt-4 pb-1">3. Statutory Records</h3>
            <p>
              Labor registries, PF/ESIC disbursements, and KYC records of deployed personnel are safeguarded in compliance with regional statutory authorities and state legislation.
            </p>
            <p>
              If you have inquiries regarding compliance audit logs or data correction, contact our data desk at <strong className="text-[#F5F5F7]">privacy@amazepms.com</strong>.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-white/8">
            <Button href="/" variant="primary" size="md">
              Return to Homepage
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
