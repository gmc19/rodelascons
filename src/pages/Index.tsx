
import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AboutUsSection from '../components/home/AboutUsSection';
import ServicesSection from '../components/home/ServicesSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ProjectShowcase from '../components/home/ProjectShowcase';
import TestimonialsSection from '../components/home/TestimonialsSection';
import TeamSection from '../components/home/TeamSection';
import FaqSection from '../components/home/FaqSection';
import CtaSection from '../components/home/CtaSection';

const Index = () => {
  return (
    <>
      <HeroSection />
      <AboutUsSection />
      <ServicesSection />
      <WhyChooseUs />
      <ProjectShowcase />
      <TeamSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
};

export default Index;
