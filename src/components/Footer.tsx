import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate subscription API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setEmail('');
    
    toast({
      title: "Successfully subscribed!",
      description: "Thank you for joining our newsletter.",
    });
  };

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: <Facebook className="w-5 h-5" />, 
      href: 'https://facebook.com' 
    },
    { 
      name: 'Instagram', 
      icon: <Instagram className="w-5 h-5" />, 
      href: 'https://instagram.com' 
    },
    { 
      name: 'LinkedIn', 
      icon: <Linkedin className="w-5 h-5" />, 
      href: 'https://linkedin.com' 
    },
    { 
      name: 'Email', 
      icon: <Mail className="w-5 h-5" />, 
      href: 'mailto:Hello@kambl.co.uk' 
    },
  ];

  const quickLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <footer className="bg-kambl-light pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and Tagline */}
          <div className="lg:col-span-1">
            <a href="#" className="block">
              <span className="text-2xl font-poppins font-bold text-kambl">Kambl</span>
              <span className="text-2xl font-poppins font-bold text-kambl-muted">Creations</span>
            </a>
            <p className="mt-4 text-kambl-muted">
              Elevating brands through strategic digital marketing that delivers measurable results.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-kambl-muted hover:text-kambl hover:shadow-sm transition-all duration-300"
                  aria-label={link.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-poppins font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-kambl-muted hover:text-kambl transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info - Updated */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-poppins font-semibold mb-4">Contact Us</h3>
            <address className="not-italic">
              <p className="text-kambl-muted mb-2">Manchester</p>
              <p className="text-kambl-muted mb-2">United Kingdom</p>
              <p className="text-kambl-muted">
                <a href="mailto:Hello@kambl.co.uk" className="hover:text-kambl transition-colors">
                  Hello@kambl.co.uk
                </a>
              </p>
            </address>
          </div>
          
          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-poppins font-semibold mb-4">Newsletter</h3>
            <p className="text-kambl-muted mb-4">
              Subscribe to our newsletter for the latest marketing insights.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kambl/20 focus:border-kambl transition-all"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "px-4 py-3 rounded-lg font-poppins font-medium transition-all duration-300",
                  isSubmitting 
                    ? "bg-kambl/80 text-white/80 cursor-not-allowed" 
                    : "bg-kambl text-white hover:shadow-md"
                )}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-kambl/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-kambl-muted">
              © {new Date().getFullYear()} Kambl Creations. All rights reserved.
            </p>
            <div className="text-sm text-kambl-muted">
              Crafted with precision for optimal performance
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
