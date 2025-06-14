
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
              At StudyEase, we recognize that education costs can be overwhelming. That's why we've created flexible payment solutions that work with your student lifestyle, not against it.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our mission is to remove financial barriers from education by providing transparent, student-friendly payment options that let you focus on what matters most - your studies.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={24} />
                <span className="text-gray-700">Transparent pricing with no surprises</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={24} />
                <span className="text-gray-700">Payment schedules aligned with academic calendar</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={24} />
                <span className="text-gray-700">Dedicated student support team</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={24} />
                <span className="text-gray-700">Partnerships with 500+ educational institutions</span>
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
