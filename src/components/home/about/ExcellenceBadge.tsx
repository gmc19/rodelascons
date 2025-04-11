
import React from 'react';
import { motion } from "framer-motion";

interface ExcellenceBadgeProps {
  years: number;
  isVisible: boolean;
}

const ExcellenceBadge = ({ years, isVisible }: ExcellenceBadgeProps) => {
  return (
    <motion.div 
      initial={{ scale: 0, rotate: -10 }}
      animate={isVisible ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -10 }}
      transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
      className="bg-rcs-gold text-rcs-blue font-bold rounded-full h-24 w-24 flex flex-col items-center justify-center transform -rotate-12 shadow-lg border-4 border-white"
    >
      <span className="text-2xl font-bold">{years}+</span>
      <span className="text-xs leading-tight text-center">Years of<br />Excellence</span>
    </motion.div>
  );
};

export default ExcellenceBadge;
