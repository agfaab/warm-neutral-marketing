
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    
    if (!hasConsented) {
      // Show the cookie banner with a slight delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Store consent in localStorage
    localStorage.setItem('cookieConsent', 'true');
    
    // Animate out before hiding
    setAnimateOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  const handleDecline = () => {
    // Store decline in localStorage (for UX, still hide the banner)
    localStorage.setItem('cookieConsent', 'false');
    
    // Animate out before hiding
    setAnimateOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 transform",
        animateOut ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
      )}
    >
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg border border-kambl/10 p-4 sm:p-6 md:flex md:items-center md:justify-between">
          <div className="md:flex-1 md:pr-8">
            <h3 className="text-lg font-poppins font-semibold mb-2">We value your privacy</h3>
            <p className="text-kambl-muted text-sm">
              We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies as described in our Cookie Policy.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              onClick={handleDecline}
              className="px-4 py-2 rounded-lg text-sm font-medium text-kambl-muted border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-kambl hover:shadow-md transition-all"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
