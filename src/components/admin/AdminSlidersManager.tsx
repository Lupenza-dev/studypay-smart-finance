import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Loader2, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sliderService } from '@/services/api';

interface Slider {
  id: number;
  title: string;
  subtitle: string;
  button_text: string;
  button_url: string;
  badge: string;
  features: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

interface FormData {
  title: string;
  subtitle: string;
  button_text: string;
  button_url: string;
  badge: string;
  features: string;
  featureInput: string;
  image: File | null;
  imagePreview: string;
}

const AdminSlidersManager = () => {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [sliderToDelete, setSliderToDelete] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlider, setEditingSlider] = useState<Slider | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    subtitle: '',
    button_text: '',
    button_url: '',
    badge: '',
    features: '',
    featureInput: '',
    image: null,
    imagePreview: ''
  });
  
  const { toast } = useToast();

  // Fetch sliders on component mount
  const fetchSliders = async () => {
    try {
      setIsLoading(true);
      const response = await sliderService.getAll();
      setSliders(response.data || []);
    } catch (error) {
      console.error('Error fetching sliders:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to load sliders',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  // Initialize form when editing
  useEffect(() => {
    try {
      if (editingSlider) {
        console.log('Initializing form with slider data:', editingSlider);
        setFormData({
          title: editingSlider.title || '',
          subtitle: editingSlider.subtitle || '',
          button_text: editingSlider.button_text || '',
          button_url: editingSlider.button_url || '',
          badge: editingSlider.badge || '',
          features: editingSlider.features || '',
          featureInput: '',
          image: null,
          imagePreview: editingSlider.image_url || ''
        });
      } else {
        console.log('Initializing empty form');
        setFormData({
          title: '',
          subtitle: '',
          button_text: '',
          button_url: '',
          badge: '',
          features: '',
          featureInput: '',
          image: null,
          imagePreview: ''
        });
      }
    } catch (error) {
      console.error('Error initializing form:', error);
      toast({
        title: "Error",
        description: "Failed to initialize the form. Please refresh the page and try again.",
        variant: "destructive",
      });
    }
  }, [editingSlider, isDialogOpen]);

  const handleAddSlider = () => {
    setEditingSlider(null);
    setIsDialogOpen(true);
  };

  const handleEditSlider = (slider: Slider) => {
    try {
      console.log('Editing slider:', slider);
      setEditingSlider(slider);
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Error in handleEditSlider:', error);
      toast({
        title: "Error",
        description: "Failed to load slider for editing. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteClick = (id: number) => {
    setSliderToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteSlider = async () => {
    if (!sliderToDelete) return;
    
    try {
      setIsSubmitting(true);
      await sliderService.delete(sliderToDelete);
      
      toast({
        title: "Success",
        description: "Slider deleted successfully",
      });
      
      await fetchSliders();
    } catch (error) {
      console.error('Error deleting slider:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to delete slider',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
      setSliderToDelete(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result as string
        }));
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

  const handleAddFeature = () => {
    if (formData.featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: prev.features ? `${prev.features}\n${formData.featureInput}` : formData.featureInput,
        featureInput: ''
      }));
    }
  };

  const handleRemoveFeature = (index: number) => {
    const features = formData.features.split('\n').filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      features: features.join('\n')
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.subtitle || !formData.button_text || !formData.button_url) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const sliderData = {
        title: formData.title,
        subtitle: formData.subtitle,
        button_text: formData.button_text,
        button_url: formData.button_url,
        badge: formData.badge,
        features: formData.features,
        ...(formData.image && { image: formData.image })
      };

      if (editingSlider) {
        await sliderService.update(editingSlider.id, sliderData);
        toast({
          title: "Success",
          description: "Slider updated successfully",
        });
      } else {
        await sliderService.create(sliderData as any);
        toast({
          title: "Success",
          description: "Slider created successfully",
        });
      }
      
      setIsDialogOpen(false);
      await fetchSliders();
      
    } catch (error) {
      console.error('Error saving slider:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to save slider',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Sliders Management</h1>
          <p className="text-sm text-gray-500">Manage your website sliders</p>
        </div>
        <Button onClick={handleAddSlider}>
          <Plus className="mr-2 h-4 w-4" /> Add Slider
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sliders</CardTitle>
          <CardDescription>
            Manage all your sliders from here
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading sliders...</span>
            </div>
          ) : sliders.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No sliders found. Click "Add Slider" to create one.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Subtitle</TableHead>
                  <TableHead>Button</TableHead>
                  <TableHead>Badge</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sliders.map((slider) => (
                  <TableRow key={slider.id}>
                    <TableCell>
                      {slider.image_url && (
                        <div className="w-16 h-16 rounded-md overflow-hidden border">
                          <img 
                            src={slider.image_url} 
                            alt={slider.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{slider.title}</TableCell>
                    <TableCell className="max-w-[200px] line-clamp-2">
                      {slider.subtitle}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">{slider.button_text}</span>
                        <a 
                          href={slider.button_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:underline"
                        >
                          {slider.button_url}
                        </a>
                      </div>
                    </TableCell>
                    <TableCell>
                      {slider.badge && (
                        <Badge variant="outline">{slider.badge}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleEditSlider(slider)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(slider.id);
                        }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting && sliderToDelete === slider.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Slider Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSlider ? 'Edit Slider' : 'Add New Slider'}
            </DialogTitle>
            <DialogDescription>
              {editingSlider ? 'Update the slider details' : 'Add a new slider to your website'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter slider title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle *</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Enter slider subtitle"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="button_text">Button Text *</Label>
                <Input
                  id="button_text"
                  value={formData.button_text}
                  onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                  placeholder="Enter button text"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="button_url">Button URL *</Label>
                <Input
                  id="button_url"
                  type="url"
                  value={formData.button_url}
                  onChange={(e) => setFormData({ ...formData, button_url: e.target.value })}
                  placeholder="Enter button URL"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="badge">Badge (Optional)</Label>
                <Input
                  id="badge"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="e.g., New, Featured"
                />
              </div>
              <div className="space-y-2">
                <Label>Image *</Label>
                {formData.imagePreview ? (
                  <div className="mt-2 relative">
                    <div className="w-full h-48 rounded-md overflow-hidden border">
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
                      className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
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
              {/* <div className="space-y-2">
                <Label>Features (One per line)</Label>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      value={formData.featureInput}
                      onChange={(e) => setFormData({ ...formData, featureInput: e.target.value })}
                      placeholder="Enter a feature"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                    />
                    <Button type="button" onClick={handleAddFeature}>
                      Add
                    </Button>
                  </div>
                  <Textarea
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    placeholder="Enter features, one per line"
                    rows={5}
                    className="mt-2"
                  />
                  {formData.features && (
                    <div className="mt-2 space-y-1">
                      <p className="text-sm font-medium text-gray-700">Preview:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {formData.features.split('\n').filter(f => f.trim() !== '').map((feature, index) => (
                          <li key={index} className="flex items-center justify-between">
                            <span>{feature}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-destructive hover:bg-destructive/10"
                              onClick={() => handleRemoveFeature(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="badge">Features</Label>
                <Input
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="e.g., New, Featured"
                />
              </div>
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
                    {editingSlider ? 'Updating...' : 'Creating...'}
                  </>
                ) : editingSlider ? 'Update Slider' : 'Create Slider'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Slider</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this slider? This action cannot be undone.
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
              onClick={handleDeleteSlider}
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
    </div>
  );
};

export default AdminSlidersManager;
