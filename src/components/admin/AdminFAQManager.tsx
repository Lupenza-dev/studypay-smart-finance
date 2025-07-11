
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { faqService } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, HelpCircle, Edit, Trash2, Search, Loader2 } from 'lucide-react';

interface FAQ {
  id: number;
  title: string;
  content: string;
  category_id: string;
  category?: string;
  status: 'published' | 'draft';
  created_at: string;
  updated_at: string;
}

interface Category {
  id: number;
  name: string;
}

const AdminFAQManager = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAddingFAQ, setIsAddingFAQ] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [isTogglingStatus, setIsTogglingStatus] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category_id: '',
    status: 'draft' as 'published' | 'draft'
  });
  const { toast } = useToast();

  // Fetch FAQs and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [faqsResponse, categoriesResponse] = await Promise.all([
          faqService.getAll(),
          faqService.getCategories()
        ]);
        
        setFaqs(faqsResponse.data || []);
        setCategories(categoriesResponse.data || []);
      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to load data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id.toString() === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || faq.category_id === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      if (editingFAQ) {
        const updatedFAQ = await faqService.update(editingFAQ.id, formData);
        setFaqs(faqs.map(faq => 
          faq.id === editingFAQ.id ? { ...faq, ...updatedFAQ.data } : faq
        ));
        toast({
          title: "Success",
          description: "FAQ has been successfully updated.",
        });
        setEditingFAQ(null);
      } else {
        const newFAQ = await faqService.create(formData);
        setFaqs([...faqs, newFAQ.data]);
        toast({
          title: "Success",
          description: "New FAQ has been successfully added.",
        });
      }
      setFormData({ 
        title: '', 
        content: '', 
        category_id: '', 
        status: 'draft' 
      });
      setIsAddingFAQ(false);
    } catch (error) {
      console.error('Error saving FAQ:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save FAQ',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (faq: FAQ) => {
    setFormData({
      title: faq.title,
      content: faq.content,
      category_id: faq.category_id,
      status: faq.status
    });
    setEditingFAQ(faq);
    setIsAddingFAQ(true);
  };

  const handleDelete = async (id: number) => {
    try {
      setIsDeleting(id);
      await faqService.delete(id);
      setFaqs(faqs.filter(faq => faq.id !== id));
      toast({
        title: "Success",
        description: "FAQ has been successfully removed.",
      });
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete FAQ',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const handleStatusToggle = async (id: number) => {
    try {
      setIsTogglingStatus(id);
      const faq = faqs.find(f => f.id === id);
      if (!faq) return;
      
      const newStatus = faq.status === 'published' ? 'draft' : 'published';
      await faqService.update(id, {
        ...faq,
        status: newStatus
      });
      
      setFaqs(faqs.map(f => 
        f.id === id ? { ...f, status: newStatus } : f
      ));
      
      toast({
        title: "Success",
        description: `FAQ has been ${newStatus}.`,
      });
    } catch (error) {
      console.error('Error toggling FAQ status:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update status',
        variant: 'destructive',
      });
    } finally {
      setIsTogglingStatus(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading FAQs...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAQ Management</h1>
          <p className="text-gray-600">Manage frequently asked questions</p>
        </div>
        <Button 
          onClick={() => setIsAddingFAQ(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add FAQ
        </Button>
      </div>

     

      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {isAddingFAQ && (
        <Card>
          <CardHeader>
            <CardTitle>{editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Question</Label>
                <Input
                  id="title"
                  placeholder="Enter question"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Answer</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: 'published' | 'draft') => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  type="submit" 
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {editingFAQ ? 'Updating...' : 'Adding...'}
                    </>
                  ) : editingFAQ ? 'Update FAQ' : 'Add FAQ'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsAddingFAQ(false);
                    setEditingFAQ(null);
                    setFormData({ title: '', content: '', category_id: '', status: 'draft' });
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {filteredFAQs.sort((a, b) => a.id - b.id).map((faq) => (
          <Card key={faq.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{faq.title}</CardTitle>
                  <CardDescription>
                    Category: {faq.category?.name} | Created: {new Date(faq.created_at).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${faq.status === 'published' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {faq.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEdit(faq)}
                      disabled={isSubmitting || isDeleting === faq.id || isTogglingStatus === faq.id}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDelete(faq.id)}
                      className="text-red-600 hover:text-red-700"
                      disabled={isSubmitting || isDeleting === faq.id || isTogglingStatus === faq.id}
                    >
                      {isDeleting === faq.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{faq.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminFAQManager;
