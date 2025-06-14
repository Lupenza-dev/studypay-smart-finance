
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Focus on Studies,
              <span className="block text-yellow-300">We'll Handle the Payments</span>
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Flexible payment solutions designed specifically for students. Split your education costs into manageable payments that align with your academic calendar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-yellow-400 text-purple-900 hover:bg-yellow-300 font-semibold px-8 py-6 text-lg">
                Apply Now - It's Free!
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-6 text-lg">
                Learn More
              </Button>
            </div>
            <div className="flex items-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
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
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
              alt="Student studying with laptop"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white text-purple-600 p-6 rounded-xl shadow-lg">
              <div className="text-2xl font-bold">50,000+</div>
              <div className="text-sm">Students Helped</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
