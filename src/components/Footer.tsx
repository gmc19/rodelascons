
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-rcs-blue text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-montserrat font-bold mb-4 text-rcs-gold">
              Rodelas Construction Services
            </h3>
            <p className="mb-4 text-sm">
              Providing quality construction services with integrity and excellence since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="text-white hover:text-rcs-gold transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="text-white hover:text-rcs-gold transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="text-white hover:text-rcs-gold transition-colors duration-200">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-montserrat font-bold mb-4 text-rcs-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-rcs-gold transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-rcs-gold transition-colors duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-rcs-gold transition-colors duration-200">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-rcs-gold transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-montserrat font-bold mb-4 text-rcs-gold">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="hover:text-rcs-gold transition-colors duration-200">
                  Residential Construction
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-rcs-gold transition-colors duration-200">
                  Commercial Construction
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-rcs-gold transition-colors duration-200">
                  Renovation & Remodeling
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-rcs-gold transition-colors duration-200">
                  Construction Management
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-montserrat font-bold mb-4 text-rcs-gold">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-rcs-gold" />
                <span>123 Construction Way, Building City, BC 10101</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-rcs-gold" />
                <a href="tel:+1234567890" className="hover:text-rcs-gold transition-colors duration-200">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-rcs-gold" />
                <a href="mailto:info@rcs.com" className="hover:text-rcs-gold transition-colors duration-200">
                  info@rcs.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Rodelas Construction Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
