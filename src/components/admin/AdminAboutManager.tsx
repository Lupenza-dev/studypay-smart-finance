
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
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

interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
  isPublished: boolean;
}

const AdminAboutManager = () => {
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

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'John Smith',
      position: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      bio: 'Former student who experienced financial challenges and founded StudyEase to help other students.',
      isPublished: true
    },
    {
      id: '2',
      name: 'Sarah Davis',
      position: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80',
      bio: 'Technology leader with 10+ years experience in fintech and educational technology.',
      isPublished: true
    }
  ]);

  const [companyStats, setCompanyStats] = useState({
    foundedYear: '2020',
    studentsServed: '50,000+',
    institutionPartners: '500+',
    totalFunding: '$25M+',
    satisfactionRate: '98%'
  });

  const [isAddingTeamMember, setIsAddingTeamMember] = useState(false);
  const [newTeamMember, setNewTeamMember] = useState({
    name: '',
    position: '',
    image: '',
    bio: '',
    isPublished: true
  });

  const { toast } = useToast();

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

  const handleAddTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      ...newTeamMember
    };
    setTeamMembers([...teamMembers, newMember]);
    setNewTeamMember({ name: '', position: '', image: '', bio: '', isPublished: true });
    setIsAddingTeamMember(false);
    toast({
      title: "Team member added",
      description: "New team member has been successfully added.",
    });
  };

  const handleDeleteTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
    toast({
      title: "Team member removed",
      description: "Team member has been successfully removed.",
    });
  };

  const handleTeamMemberToggle = (id: string) => {
    setTeamMembers(teamMembers.map(member =>
      member.id === id ? { ...member, isPublished: !member.isPublished } : member
    ));
  };

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
        setNewTeamMember={setNewTeamMember}
        onAddTeamMember={handleAddTeamMember}
        onDeleteTeamMember={handleDeleteTeamMember}
        onToggleTeamMember={handleTeamMemberToggle}
      />
    </div>
  );
};

export default AdminAboutManager;
