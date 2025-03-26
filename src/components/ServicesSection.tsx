
import { useState, useRef, useEffect } from 'react';
import { Search, TrendingUp, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  tagline: string;
  icon: React.ReactNode;
  expandedContent: string;
}

const ServiceCard = ({ title, description, tagline, icon, expandedContent }: ServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      // Smoother, less intense tilt effect
      const tiltX = y * -5; // Reduced from -8
      const tiltY = x * 5;  // Reduced from 8
      
      card.style.transition = isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out';
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${isHovered ? 1.02 : 1})`;
    };

    const handleMouseLeave = () => {
      card.style.transition = 'transform 0.3s ease-out';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovered]);

  useEffect(() => {
    // Measure the expanded content height for smooth animations
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [expandedContent]);

  return (
    <div 
      ref={cardRef}
      className={cn(
        "relative bg-white p-6 rounded-lg border border-kambl/5 shadow-sm transition-all duration-300 overflow-hidden flex flex-col h-full",
        isHovered && "shadow-lg border-kambl/20"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        <div className="mb-4 text-kambl-muted">
          <div className="w-12 h-12 flex items-center justify-center bg-kambl-beige rounded-lg mb-6">
            {icon}
          </div>
          <p className="text-sm font-medium text-kambl-muted uppercase tracking-wider">
            {tagline}
          </p>
        </div>
        
        <h3 className="text-xl font-poppins font-semibold mb-3">{title}</h3>
        <p className="text-kambl-muted mb-4">{description}</p>
        
        <div 
          ref={contentRef}
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{ 
            maxHeight: isExpanded ? `${contentHeight}px` : '0',
            opacity: isExpanded ? 1 : 0,
            marginBottom: isExpanded ? '1rem' : '0'
          }}
        >
          <p className="text-kambl-muted">{expandedContent}</p>
        </div>
        
        <div className="mt-auto pt-4">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-kambl font-medium hover:text-kambl/80 transition-colors flex items-center group"
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Show Less' : 'Learn More'}
            <svg 
              className={cn(
                "ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5",
                isExpanded && "rotate-180"
              )} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      title: "Search Engine Optimization",
      description: "Boost your visibility with data-backed SEO strategies that drive organic traffic and improve search rankings.",
      tagline: "Rank higher, grow organically",
      icon: <Search className="w-6 h-6 text-kambl" />,
      expandedContent: "Our comprehensive SEO approach includes technical optimization, content strategy, keyword research, and continuous performance monitoring. We focus on sustainable practices that provide long-term results rather than quick fixes that might compromise your site in future algorithm updates."
    },
    {
      title: "Social Media Marketing",
      description: "Connect with your audience through strategic social media campaigns that build brand loyalty and engagement.",
      tagline: "Build authentic engagement",
      icon: <TrendingUp className="w-6 h-6 text-kambl" />,
      expandedContent: "We create tailored social media strategies across platforms like Instagram, Facebook, LinkedIn, and TikTok. Our approach includes content calendars, community management, paid advertising campaigns, and detailed analytics to continuously optimize your social presence and ROI."
    },
    {
      title: "Web Design & Development",
      description: "Create seamless user experiences with responsive, conversion-focused websites that represent your brand.",
      tagline: "Convert visitors into customers",
      icon: <Monitor className="w-6 h-6 text-kambl" />,
      expandedContent: "Our web design process emphasizes both aesthetics and functionality. We build responsive, fast-loading sites with intuitive navigation and strong calls-to-action. Every design decision is made with conversion optimization in mind, ensuring your site not only looks great but performs excellently."
    }
  ];

  return (
    <section id="services" className="section bg-kambl-light">
      <div className="text-center mb-16">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle mx-auto">
          Specialized digital marketing solutions designed to elevate your brand and drive measurable business growth.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
