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
      
      <Hero />

      <ClientLogos />

      <StickyCardStack />

      <BentoStats />

      <WhyChooseUs />

      <FeatureCards />

      <ProcessTimeline />

      <Testimonials />

      <FAQ />

      <CTABanner />
    </>
  );
}
