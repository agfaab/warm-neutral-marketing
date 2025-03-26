
import { useState, useRef, useEffect } from 'react';
import { MagnifyingGlass, TrendingUp, BrowserWindow } from 'lucide-react';
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

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      card.style.setProperty('--rotate-x', `${y * -8}deg`);
      card.style.setProperty('--rotate-y', `${x * 8}deg`);
    };

    card.addEventListener('mousemove', handleMouseMove);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);

  return (
    <div 
      ref={cardRef}
      className={cn(
        "tilt-card relative bg-white p-6 rounded-lg border border-kambl/5 shadow-sm transition-all duration-300 overflow-hidden",
        isHovered && "shadow-lg border-kambl/20",
        isExpanded && "h-auto"
      )}
      style={{ height: isExpanded ? 'auto' : '340px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (cardRef.current) {
          cardRef.current.style.setProperty('--rotate-x', '0deg');
          cardRef.current.style.setProperty('--rotate-y', '0deg');
        }
      }}
    >
      <div className="subtle-rotate flex flex-col h-full">
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
        
        <div className={cn(
          "overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}>
          <p className="text-kambl-muted mt-4">{expandedContent}</p>
        </div>
        
        <div className="mt-auto">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-kambl font-medium hover:text-kambl/80 transition-colors flex items-center"
          >
            {isExpanded ? 'Show Less' : 'Learn More'}
            <svg 
              className={cn(
                "ml-1 w-4 h-4 transition-transform duration-300",
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
      icon: <MagnifyingGlass className="w-6 h-6 text-kambl" />,
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
      icon: <BrowserWindow className="w-6 h-6 text-kambl" />,
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
