
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { placeholders } from '@/utils/imagePlaceholders';

// Dynamically create and add images to the public folder at runtime
const createRuntimeImages = () => {
  // For development purposes - in production these would be real images
  if (!document.getElementById('runtime-images')) {
    const imageContainer = document.createElement('div');
    imageContainer.id = 'runtime-images';
    imageContainer.style.display = 'none';
    
    // Add images to the DOM
    const imagesToCreate = [
      { id: 'hero-bg', src: placeholders.hero },
      { id: 'team-photo', src: placeholders.teamPhoto },
      { id: 'testimonial-1', src: placeholders.testimonialPhoto1 },
      { id: 'testimonial-2', src: placeholders.testimonialPhoto2 },
      { id: 'testimonial-3', src: placeholders.testimonialPhoto3 },
    ];
    
    imagesToCreate.forEach(img => {
      const imgElement = document.createElement('img');
      imgElement.id = img.id;
      imgElement.src = img.src;
      imageContainer.appendChild(imgElement);
      
      // Also create URL objects for these images
      (window as any)[img.id] = img.src;
    });
    
    document.body.appendChild(imageContainer);
  }
};

const Index = () => {
  useEffect(() => {
    // Create runtime images for development
    createRuntimeImages();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Page loaded animation
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
    }, 100);
    
    // Prefetch images
    const preloadImages = [
      (window as any)['hero-bg'],
      (window as any)['team-photo'],
      (window as any)['testimonial-1'],
      (window as any)['testimonial-2'],
      (window as any)['testimonial-3'],
    ];
    
    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;
