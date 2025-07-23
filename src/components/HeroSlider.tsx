
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const HeroSlider = ({ sliderImages }: { sliderImages: any[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Focus on Studies,",
      subtitle: "We'll Handle the Payments",
      description: "Flexible payment solutions designed specifically for students. Split your education costs into manageable payments that align with your academic calendar.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      stats: "50,000+",
      statsLabel: "Students Helped"
    },
    {
      title: "Smart Payment Plans",
      subtitle: "Built for Student Life",
      description: "Choose from monthly, quarterly, or semester-based payment plans. No hidden fees, no surprises - just transparent, student-friendly payment solutions.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
      stats: "Zero",
      statsLabel: "Hidden Fees"
    },
    {
      title: "Your Success,",
      subtitle: "Our Priority",
      description: "Join thousands of students who have achieved their academic goals with our support. Fast approval, flexible terms, and dedicated student support.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
      stats: "2 Minutes",
      statsLabel: "Quick Approval"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  if (!sliderImages || sliderImages.length === 0 || !sliderImages[currentSlide]) {
    return null; // or a loading spinner, or fallback UI
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-[#272f3b] to-[#272f3b] text-white pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[500px]">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="block transition-all duration-500">
                  {sliderImages[currentSlide].title_slider}
                </span>
                <span className="block text-[#df412d] transition-all duration-500">
                  {sliderImages[currentSlide].title_slider_sub}
                </span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed transition-all duration-500">
                {sliderImages[currentSlide].subtitle}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#df412d] text-white hover:bg-[#262E3A] font-semibold px-8 py-6 text-lg">
              {sliderImages[currentSlide].button_text}
              </Button>
              {/* <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-6 text-lg">
                Learn More
              </Button> */}
            </div>
            
            <div className="flex items-center space-x-8 text-sm">
              {
                sliderImages[currentSlide].all_features.map((feature: any) => (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))
              }
              {/* <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>No Hidden Fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>Quick Approval</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>Student-Friendly</span>
              </div> */}
            </div>
          </div>
          
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={sliderImages[currentSlide].image_url}
                alt="Student studying"
                className="w-full h-[400px] object-cover transition-all duration-700 shadow-2xl"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white text-purple-600 p-6 rounded-xl shadow-lg transition-all duration-500">
              <div className="text-2xl font-bold">{sliderImages[currentSlide].badge_1}</div>
              <div className="text-sm">{sliderImages[currentSlide].badge_2}</div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center space-x-4 mt-12">
          <button 
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-yellow-400' : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
          
          <button 
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
