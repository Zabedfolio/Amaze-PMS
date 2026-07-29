"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Search, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  CheckCircle,
  FileCheck,
  Zap
} from "lucide-react";
import SpotlightCard from "../../components/ui/SpotlightCard";
import AmbientAura from "../../components/ui/AmbientAura";
import InteractiveGrid from "../../components/ui/InteractiveGrid";

const sourcingList = [
  "Regional Internal recruitment team",
  "Telangana Operations Hub",
  "Andhra Pradesh Recruiting Base",
  "District Employment offices & Job Melas",
  "Sourcing centers in Karnataka, UP, Bihar, Jharkhand",
  "Vetted references from existing employees",
  "Tamil Nadu Regional Desk",
  "North East & Odisha Deployment Pipelines"
];

const skillFacility = [
  "Affiliated with National Skill Development Corporation (NSDC) of India.",
  "Well qualified, military-vetted, and experienced master trainers.",
  "State-of-the-art training facilities at corporate and branch offices.",
  "Manpower deployed only after screening, background check, and training."
];

const securityTraining = [
  "Post & Site Instruction - Know your property",
  "Gate House Operations & Access Control",
  "Integrated Patrolling SOPs",
  "Incident Management & Escalation Desks",
  "Visitor, Vendor & Material Movement logs",
  "Command Control Centre Monitoring",
  "Fire Safety, Disaster Drills, and Emergencies"
];

const mepTraining = [
  "Strict Grooming & Professional Standards",
  "SOP Do's & Dont's guidelines",
  "Workplace Safety & Hazard Prevention",
  "Environmental Health & Safety (EHS) Policy",
  "POSH (Prevention of Sexual Harassment) Compliance",
  "Power/MEP Shutdown Operations",
  "Engineering Audits & Logging SOPs",
  "Planned Preventive Maintenance (PPM)",
  "Critical Risk Audits"
];

const housekeepingTraining = [
  "Grooming & Hygiene Standards",
  "Verbal & Non-Verbal Communication Skills",
  "Professional Behavioural Approach",
  "Safe Chemical Dilutions & Handling",
  "Modern Machinery & Scrubber Operations",
  "POSH Code of Conduct",
  "Do's & Dont's guidelines",
  "EHS Policy & Waste segregation",
  "Reporting & Shift Log submissions",
  "IRCA Standards Compliance"
];

const auditsList = [
  "Security Audit",
  "Engineering Audit",
  "Soft Services Audit",
  "EHS Audit",
  "Safety Audit",
  "Risk Audit",
  "Inventory Audit",
  "Process Audit",
  "AMC Tracking & Negotiations",
  "Energy & Sustainability Audit",
  "Compliance Audit",
  "Revenue Generation Audits",
  "Custom Client-Triggered Audits"
];

const functionalStages = [
  {
    stage: "STAGE - 1",
    title: "Client Connectivity",
    bullets: [
      "Establish direct channels with the client committee",
      "Thoroughly analyze and document client requirements",
      "Perform comprehensive site survey and study existing processes"
    ],
    color: "#3B82F6"
  },
  {
    stage: "STAGE - 2",
    title: "Onboarding & Alignment",
    bullets: [
      "Confirm service agreement and contract variables",
      "Trigger resource planning, recruitment, and screening",
      "Draft site-specific SOPs and custom service checklists"
    ],
    color: "#8B5CF6"
  },
  {
    stage: "STAGE - 3",
    title: "Active Deployment",
    bullets: [
      "Deploy localized contract start-up team",
      "Execute parallel deployment of security force",
      "Oversee systematic takeover from the previous vendor",
      "Implement close coordination by resident field staff"
    ],
    color: "#06B6D4"
  },
  {
    stage: "STAGE - 4",
    title: "Oversight & Review",
    bullets: [
      "Maintain active surveillance by operations team",
      "Conduct regular audits of safety & security posture",
      "Run continuous site-specific training updates",
      "Gather QBR/MMR feedback and implement suggestions"
    ],
    color: "#FF5004"
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function RecruitmentPage() {
  return (
    <div className="bg-[#0A0A0C] text-white min-h-screen relative overflow-hidden">
      
      <section className="relative py-28 bg-gradient-to-b from-[#111114] to-[#0A0A0C] border-b border-white/5 overflow-hidden">
        <InteractiveGrid />
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-12 pt-8">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="text-xs font-semibold tracking-widest text-accent uppercase font-display">Governance</span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mt-3 mb-6 font-display leading-tight">
              Recruitment & Operational Surveillance
            </h1>
            <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
              How we source, vet, train, and audit our in-house workforce. Action Group maintains direct administrative command over 15,000+ professionals with zero subcontracts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="w-64 h-64 rounded-full bg-accent/5 absolute -inset-4 blur-2xl animate-pulse" />
            <div className="relative z-10 w-48 h-48 rounded-3xl border border-white/10 bg-white/[0.01] flex items-center justify-center shadow-2xl">
              <ShieldCheck size={96} className="text-accent animate-bounce" style={{ animationDuration: "4s" }} />
            </div>
          </motion.div>

        </div>
      </section>

      <section className="py-24 relative overflow-hidden border-b border-white/5">
        <AmbientAura />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-xs font-semibold tracking-wider text-accent uppercase font-display">Recruitment Strategy</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-2 mb-4 font-display">
              Manpower Sourcing & Background Checks
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Vetted talent pipelines spanning multiple states to support immediate regional scales.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
            >
              <SpotlightCard className="bg-[#111114] border border-white/5 rounded-3xl p-8 shadow-xl flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                      <Users size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-white font-display">Man Power Sourcing</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-300">
                    {sourcingList.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle size={15} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
            >
              <SpotlightCard className="bg-[#111114] border border-white/5 rounded-3xl p-8 shadow-xl flex flex-col justify-between h-full">
                <div className="flex flex-col justify-center h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Search size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-white font-display">Background Verification</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    Antecedent and background verifications are carried out directly by our in-house screening teams.
                  </p>
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3.5">
                    <ShieldCheck size={24} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-zinc-300 font-medium leading-normal">
                      Antecedent checks are carried out under the direct supervision of retired police officers to guarantee absolute record validity.
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="py-24 border-b border-white/5 bg-[#09090B] relative">
        <div className="container mx-auto px-6 max-w-7xl">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-xs font-semibold tracking-wider text-accent uppercase font-display">Academy Training</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-2 mb-4 font-display">
              Skill Development
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Continuous learning matrices covering safety, grooming, engineering shutdown SOPs, and compliance.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            
            <motion.div variants={itemVariants}>
              <SpotlightCard className="bg-[#111114] border border-white/5 rounded-3xl p-6 shadow-md flex flex-col h-full hover:-translate-y-1.5 transition-transform duration-300">
                <h4 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-3 font-display text-blue-400">
                  Training Facility
                </h4>
                <div className="space-y-3.5 text-xs text-zinc-300">
                  {skillFacility.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle size={12} className="text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SpotlightCard className="bg-[#111114] border border-white/5 rounded-3xl p-6 shadow-md flex flex-col h-full hover:-translate-y-1.5 transition-transform duration-300">
                <h4 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-3 font-display text-purple-400">
                  Security Mandates
                </h4>
                <div className="space-y-3.5 text-xs text-zinc-300">
                  {securityTraining.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle size={12} className="text-purple-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SpotlightCard className="bg-[#111114] border border-white/5 rounded-3xl p-6 shadow-md flex flex-col h-full hover:-translate-y-1.5 transition-transform duration-300">
                <h4 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-3 font-display text-cyan-400">
                  MEP Engineering
                </h4>
                <div className="space-y-3.5 text-xs text-zinc-300">
                  {mepTraining.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle size={12} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SpotlightCard className="bg-[#111114] border border-white/5 rounded-3xl p-6 shadow-md flex flex-col h-full hover:-translate-y-1.5 transition-transform duration-300">
                <h4 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-3 font-display text-accent">
                  Housekeeping
                </h4>
                <div className="space-y-3.5 text-xs text-zinc-300">
                  {housekeepingTraining.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle size={12} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>

          </motion.div>
        </div>
      </section>

      <section className="py-24 border-b border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5"
            >
              <span className="text-xs font-semibold tracking-wider text-accent uppercase font-display">Surveillance</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-2 mb-4 font-display">
                Oversight Audits
              </h2>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-6">
                MMR • QBR • BI-ANNUAL • ANNUAL
              </span>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Our operations team conducts strict periodic checklists. Live telemetry data maps directly to client command center dashboards, giving committees complete oversight.
              </p>
              
              <div className="flex flex-col gap-3 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-accent" />
                  <span>MMR: Monthly Management Reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-accent" />
                  <span>QBR: Quarterly Business Reviews</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <SpotlightCard className="bg-[#111114] border border-white/5 rounded-3xl p-8 shadow-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-zinc-200">
                  {auditsList.map((audit, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.01] border border-white/5 hover:border-accent/20 transition-colors">
                      <FileCheck size={16} className="text-accent flex-shrink-0" />
                      <span>{audit}</span>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="py-24 bg-[#09090B] relative">
        <div className="container mx-auto px-6 max-w-7xl">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="text-xs font-semibold tracking-wider text-accent uppercase font-display">Approach</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-2 mb-4 font-display">
              Functional Approach
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Step-by-step transition stages to take over and secure your facilities under Command Control guidelines.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {functionalStages.map((stage, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <SpotlightCard className="bg-[#111114] border border-white/5 rounded-3xl p-6 flex flex-col justify-between h-full hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span 
                        className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: `${stage.color}15`, color: stage.color }}
                      >
                        {stage.stage}
                      </span>
                      <Zap size={16} style={{ color: stage.color }} />
                    </div>
                    <h4 className="text-base font-bold text-white mb-4 font-display">{stage.title}</h4>
                    <div className="space-y-3.5 text-[11px] text-zinc-400 leading-normal">
                      {stage.bullets.map((bullet, bulletIdx) => (
                        <div key={bulletIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: stage.color }} />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
