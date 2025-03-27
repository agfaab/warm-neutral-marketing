
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import Counter from './Counter';
import TeamMember from './TeamMember';
import { Award, Briefcase, Star } from 'lucide-react';

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

  const stats = [
    { 
      value: 250, 
      suffix: "+", 
      label: "Clients Served", 
      icon: <Briefcase className="w-6 h-6 text-kambl mb-2" aria-hidden="true" /> 
    },
    { 
      value: 4.9, 
      suffix: "/5", 
      label: "Avg. Rating", 
      icon: <Star className="w-6 h-6 text-kambl mb-2" aria-hidden="true" /> 
    },
    { 
      value: 3, 
      prefix: "$", 
      suffix: "M+", 
      label: "Revenue Generated", 
      icon: <Award className="w-6 h-6 text-kambl mb-2" aria-hidden="true" /> 
    }
  ];

  const teamMembers = [
    { name: "Sarah Johnson", role: "Marketing Director", delay: 300 },
    { name: "Michael Chen", role: "SEO Specialist", delay: 400 },
    { name: "Emma Williams", role: "Content Strategist", delay: 500 },
    { name: "David Rodriguez", role: "Analytics Expert", delay: 600 }
  ];

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
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "bg-white p-6 rounded-lg shadow-sm text-center transition-all duration-700 flex flex-col items-center",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                    index === 0 ? "delay-300" : index === 1 ? "delay-400" : "delay-500"
                  )}
                  aria-label={`${stat.label}: ${stat.prefix || ''}${stat.value}${stat.suffix || ''}`}
                >
                  {stat.icon}
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
                alt="The Kambl Creations team gathered together in our office, showcasing our collaborative and friendly work environment" 
                className="w-full h-auto rounded-lg shadow-lg relative z-10 object-cover"
                style={{ maxHeight: "500px" }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="mt-20">
          <h3 className={cn(
            "text-2xl font-medium text-center mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            Meet Our Team
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {teamMembers.map((member, index) => (
              <TeamMember 
                key={index}
                name={member.name}
                role={member.role}
                delay={member.delay}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
