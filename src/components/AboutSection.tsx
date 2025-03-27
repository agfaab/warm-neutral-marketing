
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// Shared hook for intersection observation
const useIntersectionObserver = (ref: React.RefObject<HTMLElement>, threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, [ref, threshold]);

  return isVisible;
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  return (
    <section id="about" ref={sectionRef} className="section bg-kambl-cream">
      <div className="max-w-7xl mx-auto">
        {/* About Section Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center mb-16">
          <div className="lg:col-span-3">
            <h2 className={cn(
              "section-title transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}>About Kambl Creations</h2>
            
            <p className={cn(
              "text-lg mb-8 transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}>
              At Kambl Creations, we're more than a digital marketing agency – we're growth partners committed to your success. Our data-driven approach combines creativity with analytics to deliver measurable results for small to medium businesses across industries.
            </p>
            
            <p className={cn(
              "text-lg mb-12 transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}>
              We believe in transparency, ethical marketing practices, and building long-term relationships with our clients. Every strategy we develop is tailored to your unique goals, audience, and market position.
            </p>
          </div>
          
          <div className={cn(
            "lg:col-span-2 transition-all duration-1000",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
          )}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-kambl-muted/30 rounded-lg"></div>
              <img 
                src="/team-photo.jpg" 
                alt="The Kambl Creations team gathered together in our office, showcasing our collaborative and friendly work environment" 
                className="w-full h-auto rounded-lg shadow-lg relative z-10 object-cover"
                style={{ maxHeight: "500px" }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
