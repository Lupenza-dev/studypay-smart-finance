
import { Mail, MapPin, Clock } from 'lucide-react';

const TopHeader = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 fixed w-full top-0 z-50 text-xs sm:text-sm">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <Mail size={14} />
            <span>support@studyease.com</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <MapPin size={14} />
            <span className="hidden sm:inline">123 University Ave, Campus City</span>
            <span className="sm:hidden">Campus City</span>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Clock size={14} />
          <span>Mon-Fri 9AM-6PM</span>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
