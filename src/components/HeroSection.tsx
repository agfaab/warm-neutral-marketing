
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const heroElement = heroRef.current;
      if (!heroElement) return;
      
      const { left, top, width, height } = heroElement.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      heroElement.style.setProperty('--x-movement', `${x * 15}px`);
      heroElement.style.setProperty('--y-movement', `${y * 10}px`);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
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
      {/* Background overlay */}
      <div className="absolute inset-0 bg-kambl/70 backdrop-blur-[2px]"></div>
      
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
              "btn-primary bg-white text-kambl hover:bg-white/90 opacity-0",
              isVisible && "animate-fade-in-2"
            )}
          >
            Get Your Free Audit
          </a>
          <a 
            href="#services" 
            className={cn(
              "btn-secondary text-white border-white/30 hover:border-white/70 opacity-0",
              isVisible && "animate-fade-in-3"
            )}
          >
            See Our Work
          </a>
        </div>
        
        {/* Scroll indicator */}
        <div className={cn(
          "absolute bottom-12 left-1/2 transform -translate-x-1/2 opacity-0",
          isVisible && "animate-fade-in-3"
        )}>
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white/80 rounded-full mt-2 animate-[bounce_2s_infinite]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
