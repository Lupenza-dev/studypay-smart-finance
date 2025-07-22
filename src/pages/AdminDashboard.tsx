
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  BarChart3,
  MessageSquare,
  Calendar,
  Globe,
  HelpCircle,
  Star,
  Info,
  Image as ImageIcon
} from 'lucide-react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import AdminStats from '../components/admin/AdminStats';
import AdminNewsManager from '../components/admin/AdminNewsManager';
import AdminServicesManager from '../components/admin/AdminServicesManager';
import AdminUsersManager from '../components/admin/AdminUsersManager';
import AdminTestimonialsManager from '../components/admin/AdminTestimonialsManager';
import AdminFAQManager from '../components/admin/AdminFAQManager';
import AdminAboutManager from '../components/admin/AdminAboutManager';
import AdminSettingsManager from '../components/admin/AdminSettingsManager';
import MinServicesManager from '../components/admin/MinServicesManager';
import AdminSlidersManager from '../components/admin/AdminSlidersManager';
import AdminCoreValueManager from '@/components/admin/AdminCoreValueManager';
import AdminHomeAboutManager from '@/components/admin/AdminHomeAboutManager';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar 
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />
      
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <AdminHeader 
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setIsSidebarOpen}
        />
        
        <main className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="dashboard">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-gray-600">Welcome to your admin panel</p>
                </div>
                <AdminStats />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">New user registration</span>
                          <span className="text-xs text-gray-500">2 hours ago</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">News article published</span>
                          <span className="text-xs text-gray-500">4 hours ago</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Service updated</span>
                          <span className="text-xs text-gray-500">1 day ago</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => setActiveTab('news')}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Add New Article
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => setActiveTab('services')}
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          Manage Services
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => setActiveTab('users')}
                        >
                          <Users className="h-4 w-4 mr-2" />
                          View Users
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sliders">
              <AdminSlidersManager />
            </TabsContent>
            
            <TabsContent value="news">
              <AdminNewsManager />
            </TabsContent>
            
            <TabsContent value="services">
              <AdminServicesManager />
            </TabsContent>
            
            <TabsContent value="min-services">
              <MinServicesManager />
            </TabsContent>
            
            <TabsContent value="users">
              <AdminUsersManager />
            </TabsContent>

            <TabsContent value="testimonials">
              <AdminTestimonialsManager />
            </TabsContent>

            <TabsContent value="faq">
              <AdminFAQManager />
            </TabsContent>

            <TabsContent value="about">
              <AdminAboutManager />
            </TabsContent>
            <TabsContent value="Corevalue">
              <AdminCoreValueManager />
            </TabsContent>
            <TabsContent value="homeabout">
              <AdminHomeAboutManager />
            </TabsContent>
            
            <TabsContent value="settings">
              <AdminSettingsManager />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
