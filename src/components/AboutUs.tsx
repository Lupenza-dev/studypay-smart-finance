
import { CheckCircle } from 'lucide-react';

const AboutUs = ( { about }: { about: any }) => {
  if (!about) {
    return null;
  }
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800">
              {about.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {about.content}
            </p>
            <div className="space-y-4">
              {
                about.all_values.map((value: string, idx: number) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500" size={24} />
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))
              }
             
              {/* <div className="flex items-center space-x-3">
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
              </div> */}
            </div>
          </div>
          <div className="relative">
            <img 
              src={about.image_url} 
              alt="Students studying together"
              className="rounded-2xl shadow-xl"
            />
            <div className="absolute -top-6 -right-6 bg-[#df412d] text-white p-6 rounded-xl shadow-lg">
              <div className="text-2xl font-bold">{about.badge_1}</div>
              <div className="text-sm">{about.badge_2}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
