
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-kambl-light p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl md:text-8xl font-poppins font-bold mb-6 text-kambl">404</h1>
        <p className="text-xl md:text-2xl text-kambl-muted mb-8">
          We couldn't find the page you're looking for
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/" 
            className="bg-kambl text-white px-6 py-3 rounded-lg font-poppins font-medium transition-all duration-300 hover:shadow-md"
          >
            Return Home
          </a>
          <a 
            href="#contact" 
            className="bg-transparent text-kambl border border-kambl/20 px-6 py-3 rounded-lg font-poppins font-medium transition-all duration-300 hover:border-kambl/70"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
