
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-white shadow-md fixed w-full top-10 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div 
            className="text-2xl font-bold text-purple-600 cursor-pointer"
            onClick={() => handleNavigation('/')}
          >
            StudyEase
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => handleNavigation('/')} className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Home</button>
            <button onClick={() => handleNavigation('/about')} className="text-gray-700 hover:text-purple-600 transition-colors font-medium">About Us</button>
            <button onClick={() => handleNavigation('/services')} className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Services</button>
            <a href="#news" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">News</a>
            <a href="#faq" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">FAQ</a>
            <a href="#contact" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Contact Us</a>
          </nav>

          <Button className="hidden md:block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            Get Started
          </Button>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="space-y-2">
              <span className="block w-8 h-0.5 bg-gray-600"></span>
              <span className="block w-8 h-0.5 bg-gray-600"></span>
              <span className="block w-8 h-0.5 bg-gray-600"></span>
            </div>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <button onClick={() => handleNavigation('/')} className="text-gray-700 hover:text-purple-600 transition-colors text-left">Home</button>
              <button onClick={() => handleNavigation('/about')} className="text-gray-700 hover:text-purple-600 transition-colors text-left">About Us</button>
              <button onClick={() => handleNavigation('/services')} className="text-gray-700 hover:text-purple-600 transition-colors text-left">Services</button>
              <a href="#news" className="text-gray-700 hover:text-purple-600 transition-colors">News</a>
              <a href="#faq" className="text-gray-700 hover:text-purple-600 transition-colors">FAQ</a>
              <a href="#contact" className="text-gray-700 hover:text-purple-600 transition-colors">Contact Us</a>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-full">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
