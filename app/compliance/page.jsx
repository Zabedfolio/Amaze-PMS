"use client";

import React from "react";
import { ShieldCheck, ClipboardCheck, Landmark } from "lucide-react";
import Button from "../../components/ui/Button";
import GlassCard from "../../components/ui/GlassCard";

export default function CompliancePage() {
  return (
    <div className="bg-[#0A0A0C] min-h-screen pt-32 pb-20 flex items-center">
      <div className="container">
        <GlassCard className="max-w-4xl mx-auto p-8 sm:p-12 shadow-2xl">
          <h1 className="font-display text-[clamp(2rem,5vw,2.75rem)] font-extrabold text-[#F5F5F7] tracking-tight mb-2 leading-tight">
            Statutory Compliance Shield
          </h1>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#FF5004] block mb-8">
            Audit Standards: FY 2026-2027
          </span>

          <div className="text-[#A1A1AA] text-base leading-relaxed space-y-4">
            <p>
              Amaze Property Management Solutions operates under a zero-exception compliance mandate. We protect client organizations from co-employer liabilities by maintaining direct oversight on all statutory disbursements.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
              <div className="bg-white/[0.01] border border-white/5 p-5 rounded-xl">
                <div className="text-[#FF5004] mb-3"><Landmark size={24} /></div>
                <h4 className="text-[#F5F5F7] font-display font-bold mb-2">PF & ESIC Compliance</h4>
                <p className="text-sm text-[#A1A1AA] m-0">Monthly payments are processed directly via bank transfer. We provide official Electronic Challan cum Returns (ECR) to client committees before billing clearance.</p>
              </div>
              <div className="bg-white/[0.01] border border-white/5 p-5 rounded-xl">
                <div className="text-[#FF5004] mb-3"><ClipboardCheck size={24} /></div>
                <h4 className="text-[#F5F5F7] font-display font-bold mb-2">ISO Quality Audits</h4>
                <p className="text-sm text-[#A1A1AA] m-0">Our MEP and STP water plants are audited against ISO 9001:2015 and ISO 14001:2015 standards to verify compliance with environment pollution guidelines.</p>
              </div>
            </div>

            <h3 className="font-display text-xl font-bold text-[#F5F5F7] pt-2">Our Statutory Certifications:</h3>
            <ul className="list-none p-0 flex flex-col gap-3 my-4">
              <li className="flex items-center gap-3 text-[#F5F5F7] text-sm sm:text-base">
                <ShieldCheck size={18} className="text-[#FF5004] shrink-0" />
                <span>100% Minimum Wage Act adherence across all state jurisdictions.</span>
              </li>
              <li className="flex items-center gap-3 text-[#F5F5F7] text-sm sm:text-base">
                <ShieldCheck size={18} className="text-[#FF5004] shrink-0" />
                <span>Active CLRA (Contract Labour Regulation & Abolition Act) registrations.</span>
              </li>
              <li className="flex items-center gap-3 text-[#F5F5F7] text-sm sm:text-base">
                <ShieldCheck size={18} className="text-[#FF5004] shrink-0" />
                <span>Staff coverage under Workmen Compensation and Public Liability Insurances.</span>
              </li>
            </ul>
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
