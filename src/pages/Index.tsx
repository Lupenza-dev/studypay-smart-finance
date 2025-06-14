
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

const Index = () => {
  return (
    <div className="min-h-screen">
      <TopHeader />
      <Navigation />
      <div className="pt-24 sm:pt-20">
        <HeroSlider />
        <AboutUs />
        <Services />
        <WhyChooseUs />
        <Testimonials />
        <NewsSection />
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
