
import { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  service: z.enum(["SEO", "Social Media", "Web Design", "Other"]),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "SEO",
      message: ""
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
      }
    );

    const section = document.getElementById("contact");
    if (section) {
      observer.observe(section);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccessModalOpen(true);
    
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
  };

  return (
    <section id="contact" className="section bg-kambl">
      <div className="text-center mb-16">
        <h2 className="section-title text-white">Get In Touch</h2>
        <p className="section-subtitle text-white/80 mx-auto">
          Ready to grow your business? Let's discuss how we can help you achieve your goals.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <div 
          className={cn(
            "bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          )}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-kambl-muted">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name")}
                  id="name"
                  type="text"
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all",
                    errors.name 
                      ? "border-red-300 focus:ring-red-200" 
                      : "border-gray-200 focus:ring-kambl/20 focus:border-kambl"
                  )}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-kambl-muted">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all",
                    errors.email 
                      ? "border-red-300 focus:ring-red-200" 
                      : "border-gray-200 focus:ring-kambl/20 focus:border-kambl"
                  )}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-kambl-muted">
                  Phone Number (Optional)
                </label>
                <input
                  {...register("phone")}
                  id="phone"
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kambl/20 focus:border-kambl transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="service" className="block text-sm font-medium text-kambl-muted">
                  I'm interested in <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("service")}
                  id="service"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kambl/20 focus:border-kambl transition-all"
                >
                  <option value="SEO">Search Engine Optimization</option>
                  <option value="Social Media">Social Media Marketing</option>
                  <option value="Web Design">Web Design & Development</option>
                  <option value="Other">Other Services</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-kambl-muted">
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("message")}
                id="message"
                rows={5}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all",
                  errors.message 
                    ? "border-red-300 focus:ring-red-200" 
                    : "border-gray-200 focus:ring-kambl/20 focus:border-kambl"
                )}
                placeholder="Tell us about your project and goals..."
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full sm:w-auto px-8 py-3 rounded-lg font-poppins font-medium text-white transition-all duration-300 relative overflow-hidden",
                  isSubmitting 
                    ? "bg-kambl/80 cursor-not-allowed" 
                    : "bg-kambl hover:shadow-lg active:translate-y-0.5"
                )}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-8 max-w-md w-full animate-fade-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Message Received!</h3>
              <p className="text-kambl-muted mb-6">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="bg-kambl text-white px-6 py-2 rounded-lg font-medium transition-all hover:shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactSection;
