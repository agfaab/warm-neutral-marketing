
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-sm py-3" 
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
                className="font-medium text-kambl/80 hover:text-kambl transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-kambl text-white px-5 py-2 rounded-lg font-medium transition-all hover:shadow-md"
            >
              Get Started
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
        <div className={cn(
          "md:hidden absolute left-0 right-0 px-4 pt-2 pb-4 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out overflow-hidden",
          mobileMenuOpen ? "max-h-60 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0 pointer-events-none"
        )}>
          <div className="flex flex-col space-y-4 mt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-medium text-kambl/80 hover:text-kambl transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-kambl text-white px-5 py-2 rounded-lg font-medium transition-all text-center"
              onClick={() => setMobileMenuOpen(false)}
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
