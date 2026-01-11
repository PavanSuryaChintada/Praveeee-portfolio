import { useState, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import BrandsMarquee from '@/components/BrandsMarquee';
import { useEffect } from 'react';
import BentoGrid from '@/components/BentoGrid';
import ProjectGallery from '@/components/ProjectGallery';
import Testimonials from '@/components/Testimonials';
import AboutDashboard from '@/components/AboutDashboard';
import Skills from '@/components/Skills';
import ContactSection from '@/components/ContactSection';
import AIAssistant from '@/components/AIAssistant';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import LoadingScreen from '@/components/LoadingScreen';

const Index = () => {
  useEffect(() => {
    const onLoad = () => {
      // @ts-ignore
      if (window.ScrollTrigger && typeof window.ScrollTrigger.refresh === 'function') {
        // @ts-ignore
        window.ScrollTrigger.refresh();
      }
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [showBrand, setShowBrand] = useState(false);
  const brandRef = useRef<HTMLSpanElement>(null);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} brandRef={brandRef} setShowBrand={setShowBrand} />}
      <div className={`min-h-screen bg-background text-foreground ${isLoading ? 'hidden' : ''}`}>
        <CustomCursor />
        <Navigation ref={brandRef} showBrand={showBrand} />
        <Hero />
        <BrandsMarquee />
        <BentoGrid />
        <Skills />
        <ProjectGallery />
        <Testimonials />
        <AboutDashboard />
        <ContactSection />
        <Footer />
        <AIAssistant />
      </div>
    </>
  );
};

export default Index;
