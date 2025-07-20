
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { CreateTeamMemberData } from '@/services/teamMemberService';

interface AddTeamMemberFormProps {
  newTeamMember: CreateTeamMemberData;
  setNewTeamMember: (updater: CreateTeamMemberData | ((prev: CreateTeamMemberData) => CreateTeamMemberData)) => void;
  onAdd: () => void;
  onCancel: () => void;
}

const AddTeamMemberForm = ({ newTeamMember, setNewTeamMember, onAdd, onCancel }: AddTeamMemberFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    typeof newTeamMember.image === 'string' ? newTeamMember.image : null
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setNewTeamMember({ 
          ...newTeamMember, 
          image: file,
          isPublished: newTeamMember.isPublished ?? true // Ensure isPublished has a default value
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setNewTeamMember({ 
      ...newTeamMember, 
      image: null,
      isPublished: newTeamMember.isPublished ?? true // Ensure isPublished has a default value
    });
  };
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
        <Label>Image</Label>
        {imagePreview ? (
          <div className="relative">
            <div className="w-40 h-40 rounded-md overflow-hidden border">
              <img 
                src={imagePreview} 
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
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
                  htmlFor="image-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                >
                  <span>Upload an image</span>
                  <input
                    id="image-upload"
                    name="image-upload"
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
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={newTeamMember.bio}
          onChange={(e) => setNewTeamMember({ 
            ...newTeamMember, 
            bio: e.target.value,
            isPublished: newTeamMember.isPublished ?? true // Ensure isPublished has a default value
          })}
          rows={3}
        />
      </div>
      <div className="flex items-center space-x-2 mt-4">
        <input
          type="checkbox"
          id="isPublished"
          checked={newTeamMember.isPublished ?? true}
          onChange={(e) => setNewTeamMember({ ...newTeamMember, isPublished: e.target.checked })}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <Label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
          Publish this team member
        </Label>
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
