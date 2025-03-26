
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  text: string;
  author: string;
  role: string;
  company: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    text: "Working with Kambl Creations transformed our online presence completely. Our organic traffic increased by 187% in just six months, and our conversion rate has never been higher.",
    author: "Sarah Johnson",
    role: "Marketing Director",
    company: "Everyspace Interiors",
    image: "/testimonial-1.jpg"
  },
  {
    text: "The team at Kambl Creations doesn't just execute tasks – they become true partners in your business. Their strategic approach to social media helped us build a community, not just a following.",
    author: "Michael Chen",
    role: "Founder & CEO",
    company: "Nimble Technologies",
    image: "/testimonial-2.jpg"
  },
  {
    text: "What sets Kambl apart is their attention to detail and commitment to results. They completely redesigned our website with conversion in mind, and our lead generation increased by 143% within weeks.",
    author: "Priya Sharma",
    role: "Operations Manager",
    company: "GreenLife Organics",
    image: "/testimonial-3.jpg"
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const startInterval = () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      
      intervalRef.current = window.setInterval(() => {
        if (!isPaused) {
          setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }
      }, 8000);
    };

    if (isVisible) {
      startInterval();
    }

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isPaused, isVisible]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    
    // Reset the interval
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      if (!isPaused) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }
    }, 8000);
  };
  
  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
  };

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="section bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="text-center mb-16">
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle mx-auto">
          Don't just take our word for it – hear from the businesses we've helped grow.
        </p>
      </div>
      
      <div 
        className={cn(
          "max-w-4xl mx-auto transition-all duration-500 relative",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="relative overflow-hidden rounded-xl">
          <div 
            ref={slideRef}
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <div className="bg-kambl-beige rounded-2xl p-6 md:p-10 shadow-sm">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-lg italic text-kambl-muted leading-relaxed mb-6">
                        "{testimonial.text}"
                      </p>
                      <h4 className="font-poppins font-semibold text-kambl">
                        {testimonial.author}
                      </h4>
                      <p className="text-sm text-kambl-muted">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 md:px-6 z-10 pointer-events-none">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-kambl hover:bg-kambl hover:text-white transition-colors pointer-events-auto"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-kambl hover:bg-kambl hover:text-white transition-colors pointer-events-auto"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={cn(
                "transition-all duration-300",
                index === activeIndex 
                  ? "w-8 h-3 bg-kambl rounded-full" 
                  : "w-3 h-3 bg-kambl-muted/40 hover:bg-kambl-muted rounded-full"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === activeIndex ? "true" : "false"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
