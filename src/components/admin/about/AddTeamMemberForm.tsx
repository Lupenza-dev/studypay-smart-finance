
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface NewTeamMember {
  name: string;
  position: string;
  image: string;
  bio: string;
  isPublished: boolean;
}

interface AddTeamMemberFormProps {
  newTeamMember: NewTeamMember;
  setNewTeamMember: (member: NewTeamMember) => void;
  onAdd: () => void;
  onCancel: () => void;
}

const AddTeamMemberForm = ({ newTeamMember, setNewTeamMember, onAdd, onCancel }: AddTeamMemberFormProps) => {
  return (
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
        <Button onClick={onAdd} className="bg-purple-600 hover:bg-purple-700">
          Add Member
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddTeamMemberForm;
