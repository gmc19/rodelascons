
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ProjectShowcase from '../components/home/ProjectShowcase';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CtaSection from '../components/home/CtaSection';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <ProjectShowcase />
      <TestimonialsSection />
      <CtaSection />
    </Layout>
  );
};

export default Index;
