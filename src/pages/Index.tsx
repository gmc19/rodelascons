
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import AboutUsSection from '../components/home/AboutUsSection';
import ServicesSection from '../components/home/ServicesSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ProjectShowcase from '../components/home/ProjectShowcase';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CtaSection from '../components/home/CtaSection';
import PageTransition from '../components/PageTransition';

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Layout>
      <PageTransition>
        <HeroSection />
        <AboutUsSection />
        <ServicesSection />
        <WhyChooseUs />
        <ProjectShowcase />
        <TestimonialsSection />
        <CtaSection />
      </PageTransition>
    </Layout>
  );
};

export default Index;
