
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="py-20 bg-rcs-blue">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
        <p className="text-white/90 max-w-2xl mx-auto mb-8">
          Contact us today for a free consultation and quote. Let's bring your construction vision to life.
        </p>
        <Link
          to="/contact"
          className="bg-rcs-gold text-rcs-blue font-montserrat font-semibold px-8 py-3 rounded-md hover:bg-yellow-400 transition-colors duration-300 inline-flex items-center justify-center"
        >
          <Phone size={18} className="mr-2" />
          Contact Us
        </Link>
      </div>
    </section>
  );
};

export default CtaSection;
