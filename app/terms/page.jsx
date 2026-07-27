"use client";

import React from "react";
import Button from "../../components/ui/Button";
import GlassCard from "../../components/ui/GlassCard";

export default function TermsPage() {
  return (
    <div className="bg-[#0A0A0C] min-h-screen pt-32 pb-20 flex items-center">
      <div className="container">
        <GlassCard className="max-w-4xl mx-auto p-8 sm:p-12 shadow-2xl">
          <h1 className="font-display text-[clamp(2rem,5vw,2.75rem)] font-extrabold text-[#F5F5F7] tracking-tight mb-2 leading-tight">
            Terms of Service
          </h1>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#FF5004] block mb-8">
            Effective Date: July 27, 2026
          </span>

          <div className="text-[#A1A1AA] text-base leading-relaxed space-y-4">
            <p>
              Welcome to the digital portal of Amaze Property Management Solutions Pvt Ltd. By submitting proposals or accessing materials, you acknowledge compliance with our B2B guidelines.
            </p>
            <h3 className="font-display text-xl font-bold text-[#F5F5F7] pt-4 pb-1">1. Scope of Services</h3>
            <p>
              Actual deliverables, SLA specifications, response times, and billing coefficients are governed exclusively by formal service level agreements executed directly between client committees and Amaze regional offices.
            </p>
            <h3 className="font-display text-xl font-bold text-[#F5F5F7] pt-4 pb-1">2. Personnel Deployments</h3>
            <p>
              All facility operators, janitors, and engineering practitioners deployed at client sites remain under direct Amaze payrolls and statutory coverages. Client committees agree to avoid direct solicitation of Amaze staff during contract durations.
            </p>
            <h3 className="font-display text-xl font-bold text-[#F5F5F7] pt-4 pb-1">3. Compliance Shield</h3>
            <p>
              Amaze PMS indemnifies clients against all labor minimum-wage or PF/ESIC liabilities by providing monthly digital compliance registries showing prompt employee payments.
            </p>
            <p>
              For legal escalations or contract copies, consult your dedicated regional account controller or email <strong className="text-[#F5F5F7]">legal@amazepms.com</strong>.
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
