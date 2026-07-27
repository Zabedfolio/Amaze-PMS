import React from "react";
import Hero from "../components/sections/Hero";
import ClientLogos from "../components/sections/ClientLogos";
import StickyCardStack from "../components/sections/StickyCardStack";
import BentoStats from "../components/sections/BentoStats";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import FeatureCards from "../components/sections/FeatureCards";
import ProcessTimeline from "../components/sections/ProcessTimeline";
import Testimonials from "../components/sections/Testimonials";
import FAQ from "../components/sections/FAQ";
import CTABanner from "../components/sections/CTABanner";

export default function Home() {
  return (
    <>
      {/* Viewport Hero Entrance with wireframe city background */}
      <Hero />

      {/* Infinite logo scrolling banner */}
      <ClientLogos />

      {/* GSAP scroll-pinned stacked service deck */}
      <StickyCardStack />

      {/* Metrics grid with analytical charts */}
      <BentoStats />

      {/* Bento-style differentiators checklist */}
      <WhyChooseUs />

      {/* Interactive telemetry and SLA feature cards */}
      <FeatureCards />

      {/* SVG vertical drawing timelines */}
      <ProcessTimeline />

      {/* Drag-based carousel slider */}
      <Testimonials />

      {/* Frequently Answered Questions Accordion */}
      <FAQ />

      {/* Bottom operational call to action */}
      <CTABanner />
    </>
  );
}
