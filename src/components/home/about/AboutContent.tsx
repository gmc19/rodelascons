
import React from 'react';
import { motion } from "framer-motion";
import { Award, Users, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AboutContentProps {
  isVisible: boolean;
}

const AboutContent = ({ isVisible }: AboutContentProps) => {
  const featureItems = [
    {
      icon: <Award className="text-rcs-gold mr-3 mt-1 flex-shrink-0" size={24} />,
      title: "Quality Excellence",
      desc: "Committed to the highest standards in every project"
    },
    {
      icon: <Users className="text-rcs-gold mr-3 mt-1 flex-shrink-0" size={24} />,
      title: "Expert Team",
      desc: "Skilled professionals with decades of combined experience"
    },
    {
      icon: <Clock className="text-rcs-gold mr-3 mt-1 flex-shrink-0" size={24} />,
      title: "On-Time Delivery",
      desc: "We value your time and adhere to strict schedules"
    },
    {
      icon: <CheckCircle className="text-rcs-gold mr-3 mt-1 flex-shrink-0" size={24} />,
      title: "Client Satisfaction",
      desc: "Your vision and satisfaction are our top priorities"
    }
  ];
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-rcs-blue mb-6">About Rodelas Construction Services</h2>
      
        <motion.p 
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-gray-700 mb-6 text-lg"
        >
          Since 2010, Rodelas Construction Services has been delivering exceptional construction solutions across residential, commercial, and industrial sectors. We combine technical expertise with innovative approaches to create buildings that stand the test of time.
        </motion.p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {featureItems.map((item, index) => (
          <motion.div 
            key={index}
            className="flex items-start"
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            {item.icon}
            <div>
              <h3 className="font-bold text-rcs-blue text-lg">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        whileHover={{ scale: 1.03 }}
        className="inline-block"
      >
        <Link to="/contact" className="inline-flex items-center text-white bg-rcs-blue px-6 py-3 rounded-md hover:bg-rcs-blue/90 transition-all duration-300 font-semibold group overflow-hidden relative shadow-lg">
          <span className="relative z-10 flex items-center">
            Learn More About Us 
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0 bg-rcs-gold transition-all duration-300 group-hover:h-full -z-0"></span>
        </Link>
      </motion.div>
    </>
  );
};

export default AboutContent;
