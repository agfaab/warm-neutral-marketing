
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuOpen && 
        menuRef.current && 
        buttonRef.current && 
        !menuRef.current.contains(event.target as Node) && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    // Close menu when pressing escape key
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [mobileMenuOpen]);

  const handleMobileNavClick = (href: string) => {
    // Small delay to allow the click to register visually
    setTimeout(() => setMobileMenuOpen(false), 150);
    
    // Smooth scroll to the target section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/90 backdrop-blur-lg shadow-sm py-3" 
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <span className="text-xl font-poppins font-bold text-kambl">Kambl Creations</span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-medium text-kambl/80 hover:text-kambl transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-kambl after:scale-x-0 after:origin-right after:transition-transform hover:after:scale-x-100 hover:after:origin-left"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-kambl text-white px-5 py-2 rounded-lg font-medium transition-all hover:shadow-md hover:translate-y-[-2px] active:translate-y-0"
            >
              Get Started
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            ref={buttonRef}
            className="md:hidden focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={cn(
                "h-0.5 w-6 bg-kambl transform transition-all duration-300",
                mobileMenuOpen && "rotate-45 translate-y-2"
              )}></span>
              <span className={cn(
                "h-0.5 w-6 bg-kambl transition-all duration-300",
                mobileMenuOpen && "opacity-0"
              )}></span>
              <span className={cn(
                "h-0.5 w-6 bg-kambl transform transition-all duration-300",
                mobileMenuOpen && "-rotate-45 -translate-y-2"
              )}></span>
            </div>
          </button>
        </nav>
        
        {/* Mobile Menu */}
        <div 
          id="mobile-menu"
          ref={menuRef}
          className={cn(
            "md:hidden absolute left-0 right-0 px-4 pt-2 pb-4 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out overflow-hidden",
            mobileMenuOpen ? "max-h-80 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-4 mt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-medium text-kambl/80 hover:text-kambl transition-colors py-2"
                onClick={() => handleMobileNavClick(link.href)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-kambl text-white px-5 py-2 rounded-lg font-medium transition-all text-center"
              onClick={() => handleMobileNavClick('#contact')}
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
