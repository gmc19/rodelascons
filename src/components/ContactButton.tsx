
import React from 'react';
import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactButton = () => {
  return (
    <Link
      to="/contact"
      className="fixed bottom-6 right-6 z-40 bg-rcs-gold text-rcs-blue rounded-full p-4 shadow-lg hover:bg-yellow-400 transition-all duration-300 floating-button"
      aria-label="Contact Us"
    >
      <Phone size={24} />
    </Link>
  );
};

export default ContactButton;
