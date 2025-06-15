
import { CheckCircle } from 'lucide-react';

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800">
              We Understand Student Life
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
            El-dizer financial service is only financial service (fintech) in Tanzania that serves scholar from different higher learning institution as well as public servant to get access over a number of credit facilities so that they can simplify their day to day demands and wants through digital platform such as application, website and social media
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our mission is to To walk along with scholars and public servant in day to day manner, providing services that enrich their livelihood
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={24} />
                <span className="text-gray-700">Tailored Solutions for Students’ Unique Needs</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={24} />
                <span className="text-gray-700">Quick Access to Funds and Essential Resources</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={24} />
                <span className="text-gray-700">Significant Impact on Students’ Lives</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={24} />
                <span className="text-gray-700">Strategic Partnerships with Leading Institutions</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" 
              alt="Students studying together"
              className="rounded-2xl shadow-xl"
            />
            <div className="absolute -top-6 -right-6 bg-purple-600 text-white p-6 rounded-xl shadow-lg">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
