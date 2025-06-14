
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Save, FileText, Users, Target, Award } from 'lucide-react';

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

  const handleSectionUpdate = (id: string, field: keyof AboutSection, value: string | boolean) => {
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

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Founded</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Input
              value={companyStats.foundedYear}
              onChange={(e) => setCompanyStats({ ...companyStats, foundedYear: e.target.value })}
              className="text-lg font-bold border-none p-0 h-auto"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Served</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <Input
              value={companyStats.studentsServed}
              onChange={(e) => setCompanyStats({ ...companyStats, studentsServed: e.target.value })}
              className="text-lg font-bold border-none p-0 h-auto"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Partners</CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <Input
              value={companyStats.institutionPartners}
              onChange={(e) => setCompanyStats({ ...companyStats, institutionPartners: e.target.value })}
              className="text-lg font-bold border-none p-0 h-auto"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Funding</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <Input
              value={companyStats.totalFunding}
              onChange={(e) => setCompanyStats({ ...companyStats, totalFunding: e.target.value })}
              className="text-lg font-bold border-none p-0 h-auto"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <Award className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <Input
              value={companyStats.satisfactionRate}
              onChange={(e) => setCompanyStats({ ...companyStats, satisfactionRate: e.target.value })}
              className="text-lg font-bold border-none p-0 h-auto"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            About Sections
          </CardTitle>
          <CardDescription>Manage the main content sections of your about page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {aboutSections.sort((a, b) => a.order - b.order).map((section) => (
            <div key={section.id} className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Input
                    value={section.title}
                    onChange={(e) => handleSectionUpdate(section.id, 'title', e.target.value)}
                    className="font-semibold text-lg"
                  />
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`order-${section.id}`} className="text-sm">Order:</Label>
                    <Input
                      id={`order-${section.id}`}
                      type="number"
                      value={section.order}
                      onChange={(e) => handleSectionUpdate(section.id, 'order', parseInt(e.target.value))}
                      className="w-20"
                      min="1"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={section.isPublished}
                    onCheckedChange={(checked) => handleSectionUpdate(section.id, 'isPublished', checked)}
                  />
                  <span className={`text-sm ${section.isPublished ? 'text-green-600' : 'text-gray-400'}`}>
                    {section.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
              <Textarea
                value={section.content}
                onChange={(e) => handleSectionUpdate(section.id, 'content', e.target.value)}
                className="min-h-[100px]"
                placeholder="Enter section content..."
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Members
              </CardTitle>
              <CardDescription>Manage your team members displayed on the about page</CardDescription>
            </div>
            <Button onClick={() => setIsAddingTeamMember(true)} className="bg-purple-600 hover:bg-purple-700">
              <Users className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isAddingTeamMember && (
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h4 className="font-semibold mb-4">Add New Team Member</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newTeamMember.name}
                    onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={newTeamMember.position}
                    onChange={(e) => setNewTeamMember({ ...newTeamMember, position: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={newTeamMember.image}
                  onChange={(e) => setNewTeamMember({ ...newTeamMember, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={newTeamMember.bio}
                  onChange={(e) => setNewTeamMember({ ...newTeamMember, bio: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <Button onClick={handleAddTeamMember} className="bg-purple-600 hover:bg-purple-700">
                  Add Member
                </Button>
                <Button variant="outline" onClick={() => setIsAddingTeamMember(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="p-4 border rounded-lg">
                <div className="flex items-start space-x-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.position}</p>
                    <p className="text-sm text-gray-500 mt-2">{member.bio}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={member.isPublished}
                      onCheckedChange={() => handleTeamMemberToggle(member.id)}
                    />
                    <span className={`text-sm ${member.isPublished ? 'text-green-600' : 'text-gray-400'}`}>
                      {member.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteTeamMember(member.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAboutManager;
