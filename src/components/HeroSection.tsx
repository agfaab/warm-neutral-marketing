
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
      
      // Smoother, more subtle parallax
      heroElement.style.setProperty('--x-movement', `${x * 10}px`);
      heroElement.style.setProperty('--y-movement', `${y * 5}px`);
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
