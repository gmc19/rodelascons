
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
            <span className="text-rcs-blue font-montserrat font-bold text-3xl drop-shadow-md">RCS</span>
            <span className="ml-2 text-rcs-gold font-montserrat font-bold text-xl hidden sm:inline drop-shadow-lg bg-rcs-blue/10 px-2 py-1 rounded">
              Rodelas Construction Services
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {['/', '/services', '/projects', '/contact'].map((path, index) => {
              const label = path === '/' ? 'Home' : path.substring(1).charAt(0).toUpperCase() + path.substring(2);
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    cn(
                      'font-montserrat font-bold text-lg transition-all duration-300 relative px-2 py-1',
                      isActive 
                        ? 'text-rcs-gold' 
                        : 'text-rcs-blue hover:text-rcs-gold',
                      location.pathname === path && 'nav-active'
                    )
                  }
                  style={{ 
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  {label}
                  <span className="nav-indicator absolute bottom-0 left-0 h-0.5 bg-rcs-gold w-0 transition-all duration-300"></span>
                </NavLink>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-rcs-blue" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-md animate-fade-in">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {['/', '/services', '/projects', '/contact'].map((path, index) => {
                const label = path === '/' ? 'Home' : path.substring(1).charAt(0).toUpperCase() + path.substring(2);
                return (
                  <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                      cn(
                        'font-montserrat font-bold text-lg py-2 transition-colors duration-200',
                        isActive ? 'text-rcs-gold' : 'text-rcs-blue hover:text-rcs-gold'
                      )
                    }
                    onClick={() => setIsMenuOpen(false)}
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    {label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
