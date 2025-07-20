import React, { useState, useEffect } from 'react';
import { teamMemberService, TeamMemberData } from '@/services/api';

// Define types for form data
interface CreateTeamMemberData {
  name: string;
  position: string;
  bio: string;
  image: File | string | null;
  isPublished: boolean;
}
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save, AlertCircle } from 'lucide-react';
import CompanyStatsSection from './about/CompanyStatsSection';
import AboutSectionsManager from './about/AboutSectionsManager';
import TeamMembersManager from './about/TeamMembersManager';

interface AboutSection {
  id: string;
  title: string;
  content: string;
  isPublished: boolean;
  order: number;
}

// TeamMember interface is imported from TeamMembersManager

const AdminAboutManager = () => {
  const [error, setError] = useState<Error | null>(null);
  const [aboutSections, setAboutSections] = useState<AboutSection[]>([
    {
      id: '1',
      title: 'Our Mission',
      content: 'At StudyEase, we recognize that education costs can be overwhelming. That\'s why we\'ve created flexible payment solutions that work with your student lifestyle, not against it.',
      isPublished: true,
      order: 1
    },
    {
      id: '2',
      title: 'Our Vision',
      content: 'Our mission is to remove financial barriers from education by providing transparent, student-friendly payment options that let you focus on what matters most - your studies.',
      isPublished: true,
      order: 2
    },
    {
      id: '3',
      title: 'About Us',
      content: 'We believe in transparency, student-first approach, and building lasting relationships with educational institutions to better serve students across the country.',
      isPublished: true,
      order: 3
    },
    {
      id: '3',
      title: 'Our Values',
      content: 'We believe in transparency, student-first approach, and building lasting relationships with educational institutions to better serve students across the country.',
      isPublished: true,
      order: 3
    }
  ]);

  const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>([]); // Initialize as empty array

  const [companyStats, setCompanyStats] = useState({
    foundedYear: '2020',
    studentsServed: '50,000+',
    institutionPartners: '500+',
    totalFunding: '$25M+',
    satisfactionRate: '98%'
  });

  const [isAddingTeamMember, setIsAddingTeamMember] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // Define the type for the new team member form data
  interface NewTeamMemberData {
    name: string;
    position: string;
    bio: string;
    image: File | null;
    isPublished: boolean;
  }

  const [newTeamMember, setNewTeamMember] = useState<NewTeamMemberData>({
    name: '',
    position: '',
    bio: '',
    image: null,
    isPublished: true
  });

  const { toast } = useToast();

  // Fetch team members on component mount
  useEffect(() => {
    const fetchTeamMembers = async () => {
      console.log('Fetching team members...');
      try {
        const members = await teamMemberService.getAll();
        console.log('Team members data received:', members);
        
        // Ensure members is an array before setting it
        const safeMembers = Array.isArray(members) ? members : [];
        console.log('Setting team members:', safeMembers);
        
        setTeamMembers(safeMembers);
        setError(null);
      } catch (err) {
        console.error('Error fetching team members:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch team members'));
        // Set empty array on error to prevent null/undefined issues
        setTeamMembers([]);
        toast({
          title: 'Error',
          description: 'Failed to load team members',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers().catch(err => {
      console.error('Unhandled error in fetchTeamMembers:', err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      // Set empty array on unhandled error
      setTeamMembers([]);
    });
  }, [toast]);

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

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">About Us Management</h1>
          <p className="text-gray-600">Manage company information and team details</p>
        </div>
        <Button onClick={handleSaveChanges} className="bg-purple-600 hover:bg-purple-700">
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      {/* <CompanyStatsSection 
        companyStats={companyStats}
        setCompanyStats={setCompanyStats}
      /> */}

      <AboutSectionsManager 
        aboutSections={aboutSections}
        onSectionUpdate={handleSectionUpdate}
      />

      <TeamMembersManager
        teamMembers={teamMembers}
        isAddingTeamMember={isAddingTeamMember}
        newTeamMember={newTeamMember}
        setIsAddingTeamMember={setIsAddingTeamMember}
        setNewTeamMember={(updater) => {
          if (typeof updater === 'function') {
            setNewTeamMember(prev => {
              const updated = updater(prev);
              return {
                ...prev,
                ...updated,
                // Ensure we always have a valid image (either File or null)
                image: updated.image instanceof File ? updated.image : null
              };
            });
          } else {
            setNewTeamMember({
              ...updater,
              // Ensure we always have a valid image (either File or null)
              image: updater.image instanceof File ? updater.image : null
            });
          }
        }}
        onAddTeamMember={handleAddTeamMember}
        onDeleteTeamMember={handleDeleteTeamMember}
        onToggleTeamMember={handleTogglePublish}
        onUpdateTeamMember={handleUpdateTeamMember}
      />
    </div>
  );
};

// Main component export
export default AdminAboutManager;
