
import { Mail, MapPin, Clock } from 'lucide-react';

const TopHeader = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 fixed w-full top-0 z-50 text-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <Mail size={14} />
            <span>support@studyease.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin size={14} />
            <span>123 University Ave, Campus City</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Clock size={14} />
          <span>Mon-Fri 9AM-6PM</span>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
