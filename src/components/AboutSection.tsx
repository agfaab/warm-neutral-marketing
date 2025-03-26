
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface CounterProps {
  end: number;
  duration: number;
  suffix?: string;
  prefix?: string;
}

const Counter = ({ end, duration, suffix = "", prefix = "" }: CounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(progress * end);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, isVisible]);

  return (
    <div ref={countRef} className="text-3xl sm:text-4xl font-bold">
      {prefix}{count}{suffix}
    </div>
  );
};

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const stats = [
    { value: 250, suffix: "+", label: "Clients Served" },
    { value: 4.9, suffix: "/5", label: "Avg. Rating" },
    { value: 3, prefix: "$", suffix: "M+", label: "Revenue Generated" }
  ];

  return (
    <section id="about" ref={sectionRef} className="section bg-kambl-cream">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
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
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={cn(
                  "bg-white p-6 rounded-lg shadow-sm text-center transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  index === 0 ? "delay-300" : index === 1 ? "delay-400" : "delay-500"
                )}
              >
                <Counter 
                  end={stat.value} 
                  duration={2000} 
                  prefix={stat.prefix} 
                  suffix={stat.suffix} 
                />
                <p className="text-kambl-muted mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className={cn(
          "lg:col-span-2 transition-all duration-1000",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
        )}>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-kambl-muted/30 rounded-lg"></div>
            <img 
              src="/team-photo.jpg" 
              alt="Kambl Creations Team" 
              className="w-full h-auto rounded-lg shadow-lg relative z-10 object-cover"
              style={{ maxHeight: "500px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
