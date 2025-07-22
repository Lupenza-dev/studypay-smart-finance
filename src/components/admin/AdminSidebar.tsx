
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  Globe, 
  Users, 
  Settings, 
  LogOut,
  Star,
  HelpCircle,
  Info,
  Image as ImageIcon
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const AdminSidebar = ({ isOpen, activeTab, setActiveTab, onLogout }: AdminSidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sliders', label: 'Sliders', icon: ImageIcon },
    { id: 'news', label: 'News', icon: FileText },
    { id: 'services', label: 'Services', icon: Globe },
    { id: 'min-services', label: 'Min Services', icon: Globe },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'testimonials', label: 'Testimonials', icon: Star },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'Corevalue', label: 'Core Values', icon: Globe },
    { id: 'settings', label: 'Settings', icon: Settings },

  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {isOpen && (
              <h2 className="text-xl font-bold text-purple-600">Eldizer Finance</h2>
            )}
            {!isOpen && (
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EF</span>
              </div>
            )}
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <Button
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      activeTab === item.id 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    } ${!isOpen ? 'px-2' : ''}`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <Icon className={`h-4 w-4 ${isOpen ? 'mr-2' : ''}`} />
                    {isOpen && <span>{item.label}</span>}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className={`w-full justify-start text-red-600 hover:bg-red-50 ${!isOpen ? 'px-2' : ''}`}
            onClick={onLogout}
          >
            <LogOut className={`h-4 w-4 ${isOpen ? 'mr-2' : ''}`} />
            {isOpen && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
