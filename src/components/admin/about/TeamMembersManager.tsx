
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Users } from 'lucide-react';
import AddTeamMemberForm from './AddTeamMemberForm';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
  isPublished: boolean;
}

interface NewTeamMember {
  name: string;
  position: string;
  image: string;
  bio: string;
  isPublished: boolean;
}

interface TeamMembersManagerProps {
  teamMembers: TeamMember[];
  isAddingTeamMember: boolean;
  newTeamMember: NewTeamMember;
  setIsAddingTeamMember: (isAdding: boolean) => void;
  setNewTeamMember: (member: NewTeamMember) => void;
  onAddTeamMember: () => void;
  onDeleteTeamMember: (id: string) => void;
  onToggleTeamMember: (id: string) => void;
}

const TeamMembersManager = ({ 
  teamMembers, 
  isAddingTeamMember, 
  newTeamMember, 
  setIsAddingTeamMember, 
  setNewTeamMember, 
  onAddTeamMember, 
  onDeleteTeamMember, 
  onToggleTeamMember 
}: TeamMembersManagerProps) => {
  return (
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
          <AddTeamMemberForm
            newTeamMember={newTeamMember}
            setNewTeamMember={setNewTeamMember}
            onAdd={onAddTeamMember}
            onCancel={() => setIsAddingTeamMember(false)}
          />
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
                    onCheckedChange={() => onToggleTeamMember(member.id)}
                  />
                  <span className={`text-sm ${member.isPublished ? 'text-green-600' : 'text-gray-400'}`}>
                    {member.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDeleteTeamMember(member.id)}
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
  );
};

export default TeamMembersManager;
