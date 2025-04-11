
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
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.4 } }
  };
  
  // Staggered content sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <HeroSection />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={sectionVariants}>
          <AboutUsSection />
        </motion.div>
        
        <motion.div variants={sectionVariants}>
          <ServicesSection />
        </motion.div>
        
        <motion.div variants={sectionVariants}>
          <WhyChooseUs />
        </motion.div>
        
        <motion.div variants={sectionVariants}>
          <ProjectShowcase />
        </motion.div>
        
        <motion.div variants={sectionVariants}>
          <TeamSection />
        </motion.div>
        
        <motion.div variants={sectionVariants}>
          <TestimonialsSection />
        </motion.div>
        
        <motion.div variants={sectionVariants}>
          <FaqSection />
        </motion.div>
        
        <motion.div variants={sectionVariants}>
          <CtaSection />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Index;
