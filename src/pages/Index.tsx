
import Hero from '../components/Hero';
import TopHeader from '../components/TopHeader';
import Navigation from '../components/Navigation';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <TopHeader />
      <Navigation />
      <Hero />
      <AboutUs />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
