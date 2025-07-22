import React, { useState, useEffect } from 'react';
import { teamMemberService, TeamMemberData, aboutService } from '@/services/api';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save, AlertCircle, X } from 'lucide-react';
import CompanyStatsSection from './about/CompanyStatsSection';
import AboutSectionsManager from './about/AboutSectionsManager';
import TeamMembersManager from './about/TeamMembersManager';
import AboutUs from '@/components/AboutUs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface AboutData {
  id: number;
  vision: string;
  mission: string;
  content: string;
  values: string;
  image_url: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
}

interface AboutSection {
  id: string;
  title: string;
  content: string;
  isPublished: boolean;
  order: number;
}

interface NewTeamMemberData {
  name: string;
  position: string;
  bio: string;
  image: File | null;
  isPublished: boolean;
}

const AdminAboutManager = () => {
  const [error, setError] = useState<Error | null>(null);
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [aboutSections, setAboutSections] = useState<AboutSection[]>([]);
  const [companyStats, setCompanyStats] = useState({
    foundedYear: '2020',
    studentsServed: '50,000+',
    institutionPartners: '500+',
    totalFunding: '$25M+',
    satisfactionRate: '98%'
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isAddingTeamMember, setIsAddingTeamMember] = useState(false);
  const [newTeamMember, setNewTeamMember] = useState<NewTeamMemberData>({
    name: '',
    position: '',
    bio: '',
    image: null,
    isPublished: true
  });
  const { toast } = useToast();

  // Fetch about data and team members on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch about data
        const aboutResponse = await aboutService.get();
        if (aboutResponse.success && aboutResponse.data) {
          setAboutData(aboutResponse.data);
        }

        // Fetch team members
        const members = await teamMemberService.getAll();
        setTeamMembers(members);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error : new Error('An error occurred'));
        toast({
          title: 'Error',
          description: 'Failed to fetch about data. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleSave = async () => {
    if (!aboutData) return;
    
    console.log('handleSave called');
    setIsSaving(true);
    try {
      const { id, ...updateData } = aboutData;
      console.log('About data to save:', { id, ...updateData });
      
      const response = await aboutService.update(id, {
        vision: updateData.vision,
        mission: updateData.mission,
        content: updateData.content,
        values: updateData.values,
        image: imageFile,
      });
      
      console.log('API response:', response);
      if (response.success) {
        setAboutData(prev => ({ ...prev, ...response.data }));
        toast({
          title: 'Success',
          description: 'About page updated successfully',
        });
      } else {
        throw new Error(response.message || 'Failed to update about page');
      }
    } catch (error) {
      console.error('Error updating about page:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update about page',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveImage = () => {
    handleAboutDataChange('image_url', '');
    setImageFile(null);
  };

  const handleAboutDataChange = (field: keyof AboutData, value: string | boolean) => {
    if (!aboutData) return;
    
    setAboutData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSectionUpdate = (id: string, field: keyof AboutSection, value: string | boolean | number) => {
    setAboutSections(aboutSections.map(section =>
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const handleSaveChanges = () => {
    toast({
      title: "Changes saved",
      description: "All changes have been successfully saved.",
    });
  };

  const handleAddTeamMember = async (memberData: NewTeamMemberData) => {
    try {
      // Validate required fields
      if (!memberData.name || !memberData.position || !memberData.bio) {
        throw new Error('Please fill in all required fields');
      }
      
      // Convert the data to the format expected by the service
      const serviceData = {
        ...memberData,
        // Ensure isPublished has a default value of true if not provided
        isPublished: memberData.isPublished ?? true
      };
      
      // Log the data being sent
      console.log('Submitting team member:', {
        name: serviceData.name,
        position: serviceData.position,
        bio: serviceData.bio,
        isPublished: serviceData.isPublished,
        hasImage: !!serviceData.image
      });
      
      // Use the teamMemberService to create the team member
      const newMember = await teamMemberService.create(serviceData);
      setTeamMembers(prevMembers => [...prevMembers, newMember]);
      setIsAddingTeamMember(false);
      setNewTeamMember({
        name: '',
        position: '',
        bio: '',
        image: null,
        isPublished: true
      });
      toast({
        title: 'Success',
        description: 'Team member added successfully',
      });
    } catch (error) {
      console.error('Error adding team member:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to add team member';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw error; // Re-throw to let the caller handle the error if needed
    }
  };

  const handleUpdateTeamMember = async (id: string | number, updates: Partial<TeamMemberData>): Promise<void> => {
    try {
      const updatedMember = await teamMemberService.update(id, updates);
      setTeamMembers(prevMembers => 
        prevMembers.map(member => 
          member.id === id 
            ? { ...member, ...updatedMember } 
            : member
        )
      );
      
      toast({
        title: 'Success',
        description: 'Team member updated successfully',
      });
    } catch (error) {
      console.error('Error updating team member:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update team member';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const handleDeleteTeamMember = async (id: string | number) => {
    try {
      await teamMemberService.delete(id);
      setTeamMembers(prevMembers => 
        prevMembers.filter(member => member.id !== id)
      );
      toast({
        title: 'Success',
        description: 'Team member deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting team member:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete team member';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const handleTogglePublish = async (id: string | number, isPublished: boolean): Promise<void> => {
    try {
      const updatedMember = await teamMemberService.togglePublish(id, isPublished);
      setTeamMembers(prevMembers => 
        prevMembers.map(member => 
          member.id === id 
            ? { ...member, ...updatedMember }
            : member
        )
      );
      toast({ 
        title: 'Success', 
        description: `Team member ${isPublished ? 'published' : 'unpublished'} successfully` 
      });
    } catch (error) {
      console.error('Error toggling team member publish status:', error);
      const errorMessage = error instanceof Error ? error.message : `Failed to ${isPublished ? 'publish' : 'unpublish'} team member`;
      toast({ 
        title: 'Error', 
        description: errorMessage, 
        variant: 'destructive' 
      });
      throw error;
    }
  };

  const handleCompanyStatsChange = (stats: typeof companyStats) => {
    setCompanyStats(stats);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    handleAboutDataChange('image_url', previewUrl);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md flex items-center">
        <AlertCircle className="h-5 w-5 mr-2" />
        {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">About Page Manager</h2>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">About Us Content</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vision</label>
            <textarea
              value={aboutData?.vision || ''}
              onChange={(e) => handleAboutDataChange('vision', e.target.value)}
              className="w-full p-3 border rounded-md"
              rows={4}
              placeholder="Enter company vision..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mission</label>
            <textarea
              value={aboutData?.mission || ''}
              onChange={(e) => handleAboutDataChange('mission', e.target.value)}
              className="w-full p-3 border rounded-md"
              rows={4}
              placeholder="Enter company mission..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              value={aboutData?.content || ''}
              onChange={(e) => handleAboutDataChange('content', e.target.value)}
              className="w-full p-3 border rounded-md"
              rows={6}
              placeholder="Enter main content..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Values</label>
            <textarea
              value={aboutData?.values || ''}
              onChange={(e) => handleAboutDataChange('values', e.target.value)}
              className="w-full p-3 border rounded-md"
              rows={4}
              placeholder="Enter company values..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">About Page Image</label>
            {aboutData?.image_url ? (
              <div className="relative">
                <div className="w-64 h-48 rounded-md overflow-hidden border">
                  <img 
                    src={aboutData.image_url} 
                    alt="About page preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="about-image-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                    >
                      <span>Upload an image</span>
                      <input
                        id="about-image-upload"
                        name="about-image-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Team Members</h3>
        <TeamMembersManager
          teamMembers={teamMembers}
          isAddingTeamMember={isAddingTeamMember}
          newTeamMember={newTeamMember}
          setIsAddingTeamMember={setIsAddingTeamMember}
          setNewTeamMember={setNewTeamMember}
          onAddTeamMember={handleAddTeamMember}
          onDeleteTeamMember={handleDeleteTeamMember}
          onToggleTeamMember={handleTogglePublish}
          onUpdateTeamMember={handleUpdateTeamMember}
        />
      </div>
    </div>
  );
};

export default AdminAboutManager;
