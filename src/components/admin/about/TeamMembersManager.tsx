import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Users, Image as ImageIcon, Pencil, Trash2 } from 'lucide-react';
import AddTeamMemberForm from './AddTeamMemberForm';
// Define types locally since we're removing the teamMemberService dependency
interface TeamMember {
  id: string | number;
  name: string;
  position: string;
  bio: string | null;
  image_url: string | null;
  is_published?: boolean;
  isPublished?: boolean; // For backward compatibility
}

interface CreateTeamMemberData {
  name: string;
  position: string;
  bio: string;
  image: File | null;
  isPublished: boolean;
}

interface UpdateTeamMemberData {
  name?: string;
  position?: string;
  bio?: string;
  image?: File | string | null;
  isPublished?: boolean;
  is_published?: boolean;
}
import { useToast } from '@/hooks/use-toast';

// Re-export the TeamMember type for backward compatibility
export type { TeamMember };

// Define the service's expected create data type
interface ServiceCreateTeamMemberData {
  name: string;
  position: string;
  bio: string;
  image: File | string | null;
  isPublished?: boolean;
  is_published?: boolean;
};

// Define the component's props
interface TeamMembersManagerProps {
  teamMembers: TeamMember[] | null | undefined;
  isAddingTeamMember: boolean;
  newTeamMember: CreateTeamMemberData;
  setIsAddingTeamMember: (isAdding: boolean) => void;
  setNewTeamMember: (updater: CreateTeamMemberData | ((prev: CreateTeamMemberData) => CreateTeamMemberData)) => void;
  onAddTeamMember: (member: ServiceCreateTeamMemberData) => Promise<void>;
  onDeleteTeamMember: (id: string | number) => Promise<void>;
  onToggleTeamMember: (id: string | number, isPublished: boolean) => Promise<void>;
  onUpdateTeamMember: (id: string | number, member: UpdateTeamMemberData) => Promise<void>;
}

const TeamMembersManager = (props: TeamMembersManagerProps) => {
  const { 
    teamMembers = [], 
    isAddingTeamMember, 
    newTeamMember, 
    setIsAddingTeamMember,
    setNewTeamMember, 
    onAddTeamMember, 
    onDeleteTeamMember, 
    onToggleTeamMember, 
    onUpdateTeamMember 
  } = props;
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editedMember, setEditedMember] = useState<UpdateTeamMemberData | null>(null);
  const { toast } = useToast();

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setEditedMember({
      name: member.name,
      position: member.position,
      bio: member.bio || '',
      image: member.image_url ? member.image_url : null,
      isPublished: member.is_published ?? member.isPublished ?? false
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedMember(null);
  };

  const handleSaveEdit = async (id: string | number) => {
    if (!editedMember) return;
    
    try {
      await onUpdateTeamMember(id, {
        ...editedMember,
        is_published: editedMember.isPublished
      });
      setEditingId(null);
      setEditedMember(null);
      toast({
        title: 'Success',
        description: 'Team member updated successfully',
      });
    } catch (error) {
      console.error('Error updating team member:', error);
      toast({
        title: 'Error',
        description: 'Failed to update team member',
        variant: 'destructive',
      });
    }
  };

  const handleAddTeamMember = async (member: CreateTeamMemberData) => {
    try {
      await onAddTeamMember({
        ...member,
        image: member.image || null,
        is_published: member.isPublished || false,
      });
      setNewTeamMember({
        name: '',
        position: '',
        bio: '',
        image: null,
        isPublished: false,
      });
      toast({
        title: 'Success',
        description: 'Team member added successfully',
      });
    } catch (error) {
      console.error('Error adding team member:', error);
      toast({
        title: 'Error',
        description: 'Failed to add team member',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              Manage your team members and their details
            </CardDescription>
          </div>
          <Button
            onClick={() => setIsAddingTeamMember(true)}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Add Team Member
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isAddingTeamMember && (
          <AddTeamMemberForm
            newTeamMember={newTeamMember}
            setNewTeamMember={setNewTeamMember}
            onAdd={() => handleAddTeamMember(newTeamMember)}
            onCancel={() => setIsAddingTeamMember(false)}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(!teamMembers || teamMembers.length === 0) ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              No team members found. Add your first team member to get started.
            </div>
          ) : (
            teamMembers.map((member) => {
              // Use image_url from the API or fall back to image for backward compatibility
              const imageUrl = member.image_url || (member as any).image || '';
              // Use is_published from the API or fall back to isPublished for backward compatibility
              const isPublished = member.is_published ?? (member as any).isPublished ?? false;
              
              return (
                <div key={member.id} className="p-4 border rounded-lg">
                  {editingId === member.id && editedMember ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Name</label>
                          <input
                            type="text"
                            value={editedMember.name || ''}
                            onChange={(e) => setEditedMember({...editedMember, name: e.target.value})}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Position</label>
                          <input
                            type="text"
                            value={editedMember.position || ''}
                            onChange={(e) => setEditedMember({...editedMember, position: e.target.value})}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                          value={editedMember.bio || ''}
                          onChange={(e) => setEditedMember({...editedMember, bio: e.target.value})}
                          className="w-full p-2 border rounded"
                          rows={3}
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleSaveEdit(member.id)}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="h-8 w-8 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.position}</p>
                          <p className="text-sm text-gray-500 mt-2">{member.bio}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                          {/* <Switch
                            checked={isPublished}
                            onCheckedChange={(checked) => onToggleTeamMember(member.id, checked)}
                          />
                          <span className={`text-sm ${isPublished ? 'text-green-600' : 'text-gray-400'}`}>
                            {isPublished ? 'Published' : 'Draft'}
                          </span> */}
                        </div>
                        <div className="space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(member)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDeleteTeamMember(member.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMembersManager;
