
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

  return (
    <nav
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="flex items-center">
            <div className={cn(
              "flex flex-col items-start",
              isScrolled ? "bg-white" : "bg-transparent"
            )}>
              <span className={cn(
                "text-rcs-blue font-montserrat font-bold text-2xl md:text-3xl drop-shadow-md",
                isScrolled ? "" : "text-shadow"
              )}>
                RCS
              </span>
              <span className={cn(
                "text-rcs-gold font-montserrat font-medium text-xs md:text-sm drop-shadow-md",
                isScrolled ? "" : "text-shadow"
              )}>
                Rodelas Construction Services
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  'font-montserrat font-bold text-lg transition-colors duration-200 drop-shadow-md',
                  isActive 
                    ? 'text-rcs-gold' 
                    : isScrolled 
                      ? 'text-rcs-blue hover:text-rcs-gold' 
                      : 'text-white hover:text-rcs-gold text-shadow'
                )
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                cn(
                  'font-montserrat font-bold text-lg transition-colors duration-200 drop-shadow-md',
                  isActive 
                    ? 'text-rcs-gold' 
                    : isScrolled 
                      ? 'text-rcs-blue hover:text-rcs-gold' 
                      : 'text-white hover:text-rcs-gold text-shadow'
                )
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                cn(
                  'font-montserrat font-bold text-lg transition-colors duration-200 drop-shadow-md',
                  isActive 
                    ? 'text-rcs-gold' 
                    : isScrolled 
                      ? 'text-rcs-blue hover:text-rcs-gold' 
                      : 'text-white hover:text-rcs-gold text-shadow'
                )
              }
            >
              Projects
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                cn(
                  'font-montserrat font-bold text-lg transition-colors duration-200 drop-shadow-md',
                  isActive 
                    ? 'text-rcs-gold' 
                    : isScrolled 
                      ? 'text-rcs-blue hover:text-rcs-gold' 
                      : 'text-white hover:text-rcs-gold text-shadow'
                )
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button className={cn(
            "md:hidden",
            isScrolled ? "text-rcs-blue" : "text-white"
          )} onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-md animate-fade-in">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  cn(
                    'font-montserrat font-bold py-2 transition-colors duration-200 text-lg',
                    isActive ? 'text-rcs-gold' : 'text-rcs-blue hover:text-rcs-gold'
                  )
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  cn(
                    'font-montserrat font-bold py-2 transition-colors duration-200 text-lg',
                    isActive ? 'text-rcs-gold' : 'text-rcs-blue hover:text-rcs-gold'
                  )
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </NavLink>
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  cn(
                    'font-montserrat font-bold py-2 transition-colors duration-200 text-lg',
                    isActive ? 'text-rcs-gold' : 'text-rcs-blue hover:text-rcs-gold'
                  )
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  cn(
                    'font-montserrat font-bold py-2 transition-colors duration-200 text-lg',
                    isActive ? 'text-rcs-gold' : 'text-rcs-blue hover:text-rcs-gold'
                  )
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
