import React from 'react';
import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
const ContactButton = () => {
  return <Link to="/contact" aria-label="Contact Us" className="fixed bottom-6 right-6 z-40 bg-rcs-gold text-rcs-blue rounded-full p-4 shadow-lg hover:bg-yellow-400 floating-button">
      <Phone size={24} />
    </Link>;
};
export default ContactButton;