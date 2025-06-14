
import { Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-purple-400">StudyEase</h3>
            <p className="text-gray-300 leading-relaxed">
              Empowering students with flexible payment solutions that make education more accessible and affordable.
            </p>
            <div className="flex space-x-4">
              <div className="bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors">
                <Facebook size={20} />
              </div>
              <div className="bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors">
                <Instagram size={20} />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Textbook Financing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Tuition Plans</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Equipment Loans</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Course Fees</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-purple-400" />
                <span className="text-gray-300">support@studyease.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-purple-400" />
                <span className="text-gray-300">123 University Ave, Campus City</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock size={16} className="text-purple-400" />
                <span className="text-gray-300">Mon-Fri 9AM-6PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 StudyEase. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Responsible Lending</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
