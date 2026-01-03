import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import BrandsMarquee from '@/components/BrandsMarquee';
import BentoGrid from '@/components/BentoGrid';
import ProjectGallery from '@/components/ProjectGallery';
import Testimonials from '@/components/Testimonials';
import AboutDashboard from '@/components/AboutDashboard';
import ContactSection from '@/components/ContactSection';
import AIAssistant from '@/components/AIAssistant';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import LoadingScreen from '@/components/LoadingScreen';
import { useLenis } from '@/hooks/useLenis';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  useLenis();

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <div className={`min-h-screen bg-background text-foreground ${isLoading ? 'hidden' : ''}`}>
        <CustomCursor />
        <Navigation />
        <Hero />
        <BrandsMarquee />
        <BentoGrid />
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
