
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const heroElement = heroRef.current;
      if (!heroElement) return;
      
      const { left, top, width, height } = heroElement.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      // Smoother, more subtle parallax
      heroElement.style.setProperty('--x-movement', `${x * 10}px`);
      heroElement.style.setProperty('--y-movement', `${y * 5}px`);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Handle scroll indicator click
    const scrollIndicator = scrollIndicatorRef.current;
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative flex items-center min-h-screen pt-20 overflow-hidden"
      style={{ 
        backgroundImage: 'url("/hero-bg.jpg")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background overlay with improved blur */}
      <div className="absolute inset-0 bg-kambl/60 backdrop-blur-[1px]"></div>
      
      {/* Content container */}
      <div className="section relative z-10 flex flex-col items-center text-center">
        <div 
          className={cn(
            "max-w-4xl opacity-0",
            isVisible && "animate-fade-in-1"
          )}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Precision Digital Marketing for Growth
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Data-driven strategies tailored to small businesses that deliver measurable results and sustainable growth.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2">
          <a 
            href="#contact" 
            className={cn(
              "btn-primary bg-white text-kambl hover:bg-white/90 hover:shadow-lg hover:translate-y-[-2px] active:translate-y-0.5 opacity-0",
              isVisible && "animate-fade-in-2"
            )}
          >
            Get Your Free Audit
          </a>
          <a 
            href="#services" 
            className={cn(
              "btn-secondary text-white border-white/30 hover:border-white/70 hover:translate-y-[-2px] active:translate-y-0.5 opacity-0",
              isVisible && "animate-fade-in-3"
            )}
          >
            See Our Work
          </a>
        </div>
        
        {/* Improved scroll indicator with animation and interaction */}
        <div 
          ref={scrollIndicatorRef}
          className={cn(
            "absolute bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 cursor-pointer group",
            isVisible && "animate-fade-in-3"
          )}
          aria-label="Scroll to services section"
          role="button"
          tabIndex={0}
        >
          <div className="flex flex-col items-center">
            <p className="text-white/80 text-sm mb-2 transition-transform group-hover:translate-y-[-3px]">Explore</p>
            <div className="w-10 h-16 border-2 border-white/40 rounded-full flex justify-center items-start group-hover:border-white/70 transition-colors">
              <ChevronDown className="w-5 h-5 text-white/80 mt-2 animate-bounce group-hover:text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
