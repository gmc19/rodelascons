import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return <nav className={cn('fixed w-full z-50 transition-all duration-300', isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4')}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="flex items-center">
            <span className="text-rcs-blue font-montserrat font-bold text-3xl">RCS</span>
            <span className="ml-2 font-montserrat font-medium hidden sm:inline text-[#d1b600]">
              Rodelas Construction Services
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink to="/" className={({
            isActive
          }) => cn('font-montserrat font-medium transition-colors duration-200', isActive ? 'text-rcs-gold' : 'text-rcs-blue hover:text-rcs-gold')}>
              Home
            </NavLink>
            <NavLink to="/services" className={({
            isActive
          }) => cn('font-montserrat font-medium transition-colors duration-200', isActive ? 'text-rcs-gold' : 'text-rcs-blue hover:text-rcs-gold')}>
              Services
            </NavLink>
            <NavLink to="/projects" className={({
            isActive
          }) => cn('font-montserrat font-medium transition-colors duration-200', isActive ? 'text-rcs-gold' : 'text-rcs-blue hover:text-rcs-gold')}>
              Projects
            </NavLink>
            <NavLink to="/contact" className={({
            isActive
          }) => cn('font-montserrat font-medium transition-colors duration-200', isActive ? 'text-rcs-gold' : 'text-rcs-blue hover:text-rcs-gold')}>
              Contact
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-rcs-blue" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-md animate-fade-in">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <NavLink to="/" className={({
            isActive
          }) => cn('font-montserrat font-medium py-2 transition-colors duration-200', isActive ? 'text-rcs-gold' : 'text-rcs-blue hover:text-rcs-gold')} onClick={() => setIsMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/services" className={({
            isActive
          }) => cn('font-montserrat font-medium py-2 transition-colors duration-200', isActive ? 'text-rcs-gold' : 'text-rcs-blue hover:text-rcs-gold')} onClick={() => setIsMenuOpen(false)}>
                Services
              </NavLink>
              <NavLink to="/projects" className={({
            isActive
          }) => cn('font-montserrat font-medium py-2 transition-colors duration-200', isActive ? 'text-rcs-gold' : 'text-rcs-blue hover:text-rcs-gold')} onClick={() => setIsMenuOpen(false)}>
                Projects
              </NavLink>
              <NavLink to="/contact" className={({
            isActive
          }) => cn('font-montserrat font-medium py-2 transition-colors duration-200', isActive ? 'text-rcs-gold' : 'text-rcs-blue hover:text-rcs-gold')} onClick={() => setIsMenuOpen(false)}>
                Contact
              </NavLink>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navbar;