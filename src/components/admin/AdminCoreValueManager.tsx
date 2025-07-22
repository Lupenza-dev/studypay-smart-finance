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
import { coreValueService } from '@/services/api';

interface Service {
  id: number;
  name: string;
  content: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

interface FormData {
  name: string;
  content: string;
  icon: string;
  imagePreview: string;
}

const AdminCoreValueManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    content: '',
    icon: '',
    imagePreview: ''
  });
  
  const { toast } = useToast();

  // Fetch services on component mount
  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const response = await coreValueService.getAll();
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
        name: editingService.name,
        content: editingService.content,
        icon: editingService.icon,
        imagePreview: editingService.image_url || ''
      });
    } else {
      setFormData({
        name: '',
        content: '',
        icon: '',
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
      await coreValueService.delete(serviceToDelete);
      
      toast({
        title: "Success",
        description: "core value deleted successfully",
      });
      
      await fetchServices();
    } catch (error) {
      console.error('Error deleting core value:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to delete core value',
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

    if (!formData.name || !formData.content || !formData.icon) {
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
        name: formData.name,
        content: formData.content,
        icon: formData.icon,
      };

      if (editingService) {
        await coreValueService.update(editingService.id, serviceData);
        toast({
          title: "Success",
          description: "Core values updated successfully",
        });
      } else {
        await coreValueService.create(serviceData);
        toast({
          title: "Success",
          description: "Core values created successfully",
        });
      }
      
      setIsDialogOpen(false);
      await fetchServices();
      
    } catch (error) {
      console.error('Error saving Core values:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to save Core values',
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
          <h1 className="text-2xl font-bold">Core Values Management</h1>
          <p className="text-sm text-gray-500">Manage your Core Values</p>
        </div>
        <Button onClick={handleAddService}>
          <Plus className="mr-2 h-4 w-4" /> Add Core Values
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Core Values</CardTitle>
          <CardDescription>
            Manage all Core Values
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading core values...</span>
            </div>
          ) : services.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No core vlaues found. Click "Add core values" to create one.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell className="font-medium">
                      {service.content}
                    </TableCell>
                    <TableCell className="font-medium">
                      {service.icon}
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
              {editingService ? 'Edit Service' : 'Add New Service'}
            </DialogTitle>
            <DialogDescription>
              {editingService ? 'Update the service details' : 'Add a new service to your offerings'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Name *</Label>
                <Input 
                  id="name" 
                  placeholder="Enter Name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="title">Icon *</Label>
                <Input 
                  id="icon" 
                  placeholder="Enter Icon" 
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea 
                  id="content" 
                  placeholder="Enter core value content" 
                  rows={5}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                />
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
                ) : editingService ? 'Update core value' : 'Create core value'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete core value</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this core value? This action cannot be undone.
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

export default AdminCoreValueManager;
