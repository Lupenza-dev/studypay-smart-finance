import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Loader2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { minServicesService } from '@/services/api';

interface Service {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

interface FormData {
  title: string;
  content: string;
  image: File | null;
  imagePreview: string;
}

const MinServicesManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    image: null,
    imagePreview: ''
  });
  
  const { toast } = useToast();

  // Fetch services on component mount
  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const response = await minServicesService.getAll();
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to load services',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Initialize form when editing
  useEffect(() => {
    if (editingService) {
      setFormData({
        title: editingService.title,
        content: editingService.content,
        image: null,
        imagePreview: editingService.image_url || ''
      });
    } else {
      setFormData({
        title: '',
        content: '',
        image: null,
        imagePreview: ''
      });
    }
  }, [editingService, isDialogOpen]);

  const handleAddService = () => {
    setEditingService(null);
    setIsDialogOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setServiceToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteService = async () => {
    if (!serviceToDelete) return;
    
    try {
      setIsSubmitting(true);
      await minServicesService.delete(serviceToDelete);
      
      toast({
        title: "Success",
        description: "Service deleted successfully",
      });
      
      await fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to delete service',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
      setServiceToDelete(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const serviceData = {
        title: formData.title,
        content: formData.content,
        ...(formData.image && { image: formData.image })
      };

      if (editingService) {
        await minServicesService.update(editingService.id, serviceData);
        toast({
          title: "Success",
          description: "Service updated successfully",
        });
      } else {
        await minServicesService.create(serviceData);
        toast({
          title: "Success",
          description: "Service created successfully",
        });
      }
      
      setIsDialogOpen(false);
      await fetchServices();
      
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to save service',
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
          <h1 className="text-2xl font-bold">Min Services Management</h1>
          <p className="text-sm text-gray-500">Manage your min services and offerings</p>
        </div>
        <Button onClick={handleAddService}>
          <Plus className="mr-2 h-4 w-4" /> Add Min Service
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Min Services</CardTitle>
          <CardDescription>
            Manage all your min services from here
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading services...</span>
            </div>
          ) : services.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No min services found. Click "Add Min Service" to create one.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell className="max-w-[300px] line-clamp-2">
                      {service.content}
                    </TableCell>
                    <TableCell>
                      {service.image_url && (
                        <div className="w-16 h-16 rounded-md overflow-hidden border">
                          <img 
                            src={service.image_url} 
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleEditService(service)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(service.id);
                        }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting && serviceToDelete === service.id ? (
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

      {/* Add/Edit Service Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingService ? 'Edit Min Service' : 'Add New Min Service'}
            </DialogTitle>
            <DialogDescription>
              {editingService ? 'Update the min service details' : 'Add a new min service to your offerings'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input 
                  id="title" 
                  placeholder="Enter min service title" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea 
                  id="content" 
                  placeholder="Enter min service content" 
                  rows={5}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                />
              </div>
              <div>
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
            </div>
            <div className="flex justify-end space-x-2 pt-6">
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
                    {editingService ? 'Updating...' : 'Creating...'}
                  </>
                ) : editingService ? 'Update Min Service' : 'Create Min Service'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Min Service</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this min service? This action cannot be undone.
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
              onClick={handleDeleteService}
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

export default MinServicesManager;
