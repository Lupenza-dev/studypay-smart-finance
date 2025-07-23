
import HeroSlider from '../components/HeroSlider';
import TopHeader from '../components/TopHeader';
import Navigation from '../components/Navigation';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import NewsSection from '../components/NewsSection';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { websiteService } from '@/services/api';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Slider{
  title: string,
  subtitle: string,
  button_text: string,
  badge: string,
  image_url?: string;
  features: string;
  title_slider: string;
  title_slider_sub: string;
  badge_1: string;
  badge_2: string;
}

interface AboutData {
  title: string;
  content: string;
  values: string;
  image_url: string;
  badge_1: string;
  badge_2: string;
}
interface ServiceData {
  title: string;
  content: string;
  icon: string;
  image_url?: string;
}
interface minServiceData {
  title: string;
  content: string;
  icon: string;
  image_url?: string;
}

interface Testimonial {
  name: string; 
  position: string;
  content: string;
  image_url?: string;
  rating: number;
}
interface NewsData {
  title: string; 
  content: string;
  image_url?: string;
  category: string;
}

const Index = () => {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [services, setServices] = useState<ServiceData []>([]);
  const [minServices, setMinServices] = useState<minServiceData []>([]);
  const [testmonials, setTestimonials] = useState<Testimonial []>([]);
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [newsEventData, setNewsEventData] = useState<NewsData []>([]);

  const { toast } = useToast();

  const fetchHome = async () => {
    try {
      const response = await websiteService.getHome();
      setSliders(response.sliders);
      setAboutData(response.home_about);
      setServices(response.services);
      setTestimonials(response.testmonials);
      setNewsEventData(response.news);
      // setMinServices(response.services);
      console.log(response.home_about);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to load services',
        variant: "destructive",
      });
    } finally {
      //setIsLoading(false);
    }
  };

  const fetchMinService = async () => {
    try {
      const response = await websiteService.getMinService();
       setMinServices(response.min_services);
      console.log(response.min_services);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to load services',
        variant: "destructive",
      });
    } finally {
      //setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHome();
    fetchMinService();
  }, []);

  return (
    <div className="min-h-screen">
      <TopHeader />
      <Navigation />
      <div className="pt-24 sm:pt-20">
        <HeroSlider sliderImages={sliders} />
        <AboutUs about={aboutData} />
        <Services serviceData={services} />
        <WhyChooseUs minServicesData={minServices} />
        <Testimonials testmonialData={testmonials}/>
        <NewsSection eventData={newsEventData} />
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
