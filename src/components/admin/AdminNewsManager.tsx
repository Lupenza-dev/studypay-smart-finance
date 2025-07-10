
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, X, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { newsService } from '@/services/api';

const AdminNewsManager = () => {
  const [articles, setArticles] = useState<Array<{
    id: number;
    title: string;
    excerpt: string;
    date: string;
    status: string;
    category: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    image: null as File | null,
    imagePreview: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const response = await newsService.getAll();
      setArticles(response.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        excerpt: item.excerpt || item.content.substring(0, 100) + '...',
        date: new Date(item.created_at).toISOString().split('T')[0],
        status: item.status || 'Draft',
        category: item.category?.name || 'Uncategorized'
      })));
    } catch (error) {
      console.error('Error fetching news:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to load news articles',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const categories = [
    { id: 1, name: 'Finance' },
    { id: 2, name: 'Education' }
  ];

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

  useEffect(() => {
    if (editingArticle) {
      setFormData(prev => ({
        ...prev,
        title: editingArticle.title || '',
        category: editingArticle.news_category_id?.toString() || '',
        content: editingArticle.content || editingArticle.excerpt || '',
        image: null,
        imagePreview: editingArticle.image_url || editingArticle.image || ''
      }));
    } else {
      setFormData({
        title: '',
        category: '',
        content: '',
        image: null,
        imagePreview: ''
      });
    }
  }, [editingArticle, isDialogOpen]);

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.content) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const newsData = {
        title: formData.title,
        content: formData.content,
        news_category_id: formData.category,
        ...(formData.image && { image: formData.image })
      };

      if (editingArticle) {
        // Update existing article
        await newsService.update(editingArticle.id, newsData);
        toast({
          title: "Success",
          description: "News article updated successfully",
        });
      } else {
        // Create new article
        await newsService.create(newsData);
        toast({
          title: "Success",
          description: "News article created successfully",
        });
      }
      
      setIsDialogOpen(false);
      // Refresh the news list
      await fetchNews();
      
    } catch (error) {
      console.error('Error saving news:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to save news article',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditArticle = (article: any) => {
    setEditingArticle(article);
    setFormData(prev => ({
      ...prev,
      title: article.title,
      category: article.news_category_id?.toString() || '',
      content: article.content || article.excerpt || '',
      image: null,
      imagePreview: article.image_url || article.image || ''
    }));
    setIsDialogOpen(true);
  };
  
  const handleAddArticle = () => {
    setEditingArticle(null);
    setFormData({
      title: '',
      category: '',
      content: '',
      image: null,
      imagePreview: ''
    });
    setIsDialogOpen(true);
  };

  const handleDeleteArticle = (id: number) => {
    setArticles(articles.filter(article => article.id !== id));
    toast({
      title: "Article deleted",
      description: "The article has been successfully deleted.",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading news articles...</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">News Management</h1>
          <p className="text-sm text-gray-500">Manage your news articles and announcements</p>
        </div>
        <Button onClick={handleAddArticle}>
          <Plus className="mr-2 h-4 w-4" /> Add Article
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Articles</CardTitle>
          <CardDescription>
            Manage all your news articles from here
          </CardDescription>
        </CardHeader>
        <CardContent>
          {articles.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No news articles found. Click "Add Article" to create one.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">
                      <div className="font-medium">{article.title}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{article.excerpt}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {article.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{article.date}</TableCell>
                    <TableCell>
                      <Badge variant={article.status === 'Published' ? 'default' : 'secondary'}>
                        {article.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      {/* <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button> */}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => {
                          setEditingArticle(article);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingArticle ? 'Edit News Article' : 'Create News Article'}
            </DialogTitle>
            <DialogDescription>
              {editingArticle ? 'Update the article details' : 'Create a new article for your website'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                placeholder="Enter article title" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div>
              <Label>Category</Label>
              <div className="space-y-2">
                <Select onValueChange={handleCategoryChange} value={formData.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.category && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge className="flex items-center gap-1">
                      {categories.find(c => c.id.toString() === formData.category)?.name}
                      <button 
                        type="button" 
                        onClick={() => setFormData(prev => ({ ...prev, category: '' }))}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label>Featured Image</Label>
              <div className="mt-1 flex items-center">
                <label
                  className="cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none"
                >
                  <span>Upload an image</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              {formData.imagePreview && (
                <div className="mt-2 relative w-40 h-40">
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content" 
                placeholder="Enter article content" 
                rows={8} 
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  editingArticle ? 'Update Article' : 'Create Article'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminNewsManager;
