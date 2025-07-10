
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Star, Edit, Trash2, Loader2, X, MessageSquare } from 'lucide-react';
import { testimonialsService } from '@/services/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Testimonial {
  id: number;
  name: string; // Changed from title to name
  position: string;
  content: string;
  image_url?: string;
  rating: number;
  status: 'published' | 'draft';
  created_at: string;
  updated_at: string;
}

const AdminTestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    name: '', // Changed from title to name
    position: '',
    content: '',
    rating: 5,
    image: null as File | null,
    imagePreview: ''
  });

  const { toast } = useToast();

  // Fetch testimonials on component mount
  const fetchTestimonials = async () => {
    try {
      console.log('Fetching testimonials...');
      setIsLoading(true);
      const response = await testimonialsService.getAll();
      console.log('Testimonials response:', response);
      // Handle both array and object with data property
      const data = Array.isArray(response) ? response : response.data;
      if (!Array.isArray(data)) {
        throw new Error('Invalid testimonials data format');
      }
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to load testimonials',
        variant: "destructive",
      });
      setTestimonials([]); // Set empty array on error to prevent rendering issues
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchTestimonials();
      } catch (error) {
        console.error('Error in useEffect:', error);
      }
    };
    
    loadData();
    
    // Cleanup function
    return () => {
      // Any cleanup if needed
    };
  }, []);

  // Initialize form when editing
  useEffect(() => {
    if (editingTestimonial) {
      setFormData({
        name: editingTestimonial.name || '',
        position: editingTestimonial.position || '',
        content: editingTestimonial.content,
        rating: editingTestimonial.rating,
        image: null,
        imagePreview: editingTestimonial.image_url || ''
      });
    } else {
      setFormData({
        name: '',
        position: '',
        content: '',
        rating: 5,
        image: null,
        imagePreview: ''
      });
    }
  }, [editingTestimonial, isDialogOpen]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormData(prev => ({
            ...prev,
            image: file,
            imagePreview: reader.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.content) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const testimonialData = {
        name: formData.name, // Changed from title to name
        position: formData.position,
        content: formData.content,
        rating: formData.rating,
        status: 'published' as const,
        ...(formData.image && { image: formData.image })
      };

      if (editingTestimonial) {
        await testimonialsService.update(editingTestimonial.id, testimonialData);
        toast({
          title: "Success",
          description: "Testimonial updated successfully",
        });
      } else {
        await testimonialsService.create(testimonialData);
        toast({
          title: "Success",
          description: "Testimonial created successfully",
        });
      }
      
      setIsDialogOpen(false);
      await fetchTestimonials();
      
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to save testimonial',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setTestimonialToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteTestimonial = async () => {
    if (testimonialToDelete === null) return;
    
    try {
      setIsSubmitting(true);
      
      // Optimistically remove the testimonial
      const testimonialToRemove = testimonials.find(t => t.id === testimonialToDelete);
      setTestimonials(prev => prev.filter(t => t.id !== testimonialToDelete));
      
      try {
        await testimonialsService.delete(testimonialToDelete);
        
        toast({
          title: "Success",
          description: "Testimonial deleted successfully",
        });
      } catch (error) {
        // Revert optimistic update on error
        if (testimonialToRemove) {
          setTestimonials(prev => [...prev, testimonialToRemove]);
        }
        
        console.error('Error deleting testimonial:', error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : 'Failed to delete testimonial',
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
      setTestimonialToDelete(null);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setIsDialogOpen(true);
  };

  const handleStatusToggle = async (id: number) => {
    try {
      const testimonial = testimonials.find(t => t.id === id);
      if (!testimonial) return;
      
      const newStatus = testimonial.status === 'published' ? 'draft' : 'published';
      
      // Create a new object with only the necessary fields for the update
      const updateData = {
        name: testimonial.name,
        position: testimonial.position || '',
        content: testimonial.content,
        rating: testimonial.rating,
        status: newStatus as 'published' | 'draft',
        _method: 'PUT' as const
      };
      
      await testimonialsService.update(id, updateData);
      
      // Update local state optimistically
      setTestimonials(testimonials.map(t => 
        t.id === id ? { ...t, status: newStatus } : t
      ));
      
      toast({
        title: "Status updated",
        description: `Testimonial has been ${newStatus === 'published' ? 'published' : 'moved to draft'}.`,
      });
      
      // Refresh data from server
      await fetchTestimonials();
    } catch (error) {
      console.error('Error updating testimonial status:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to update status',
        variant: "destructive",
      });
      
      // Revert optimistic update on error
      await fetchTestimonials();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Testimonials</h1>
          <p className="text-sm text-gray-500">Manage student testimonials and reviews</p>
        </div>
        <Button onClick={() => {
          setEditingTestimonial(null);
          setIsDialogOpen(true);
        }}>
          <Plus className="mr-2 h-4 w-4" /> Add Testimonial
        </Button>
      </div>

     

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
            </DialogTitle>
            <DialogDescription>
              {editingTestimonial ? 'Update the testimonial details' : 'Add a new student testimonial'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Student's name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Student's position or university"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Image</Label>
              {formData.imagePreview ? (
                <div className="mt-2 relative">
                  <div className="w-40 h-40 rounded-md overflow-hidden border">
                    <img 
                      src={formData.imagePreview} 
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
                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
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
              <Label htmlFor="rating">Rating</Label>
              <Select 
                value={formData.rating.toString()} 
                onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Star</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Testimonial Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
                placeholder="Share the student's experience and feedback"
                required
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {editingTestimonial ? 'Updating...' : 'Creating...'}
                  </>
                ) : editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Testimonial</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this testimonial? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteTestimonial}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : 'Delete'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Testimonials</CardTitle>
          <CardDescription>
            Manage all student testimonials and reviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading testimonials...</span>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No testimonials found. Click "Add Testimonial" to create one.
            </div>
          ) : (
            <div className="space-y-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  {testimonial.image_url && (
                    <div className="flex-shrink-0">
                      <img
                        src={testimonial.image_url}
                        alt={testimonial.title}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{testimonial.name}</h3>
                        {testimonial.position && (
                          <p className="text-sm text-gray-500">{testimonial.position}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-700 line-clamp-3">{testimonial.content}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`px-2 py-0.5 text-xs rounded-full ${testimonial.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {testimonial.status === 'published' ? 'Published' : 'Draft'}
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(testimonial.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(testimonial)}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteClick(testimonial.id)}
                          disabled={isSubmitting && testimonialToDelete === testimonial.id}
                        >
                          {isSubmitting && testimonialToDelete === testimonial.id ? (
                            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4 mr-1" />
                          )}
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTestimonialsManager;
