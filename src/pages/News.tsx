import { useEffect, useState } from 'react';
import TopHeader from '../components/TopHeader';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { websiteService } from '@/services/api';

interface NewsData {
  id: number;
  title: string; 
  content: string;
  image_url?: string;
  category: string;
  created_at: Date,
}

const News = () => {
  const [newsEventData, setNewsEventData] = useState<NewsData []>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const {toast} =useToast();

   const fetchNews = async () => {
    try {
      const response = await websiteService.getNews();
      setNewsEventData(response.news);
    } catch (error) {
      console.error('Error fetching news:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to load news',
        variant: "destructive",
      });
    } finally {
      //setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const newsArticles = [
    {
      id: 1,
      title: "New Student Loan Relief Program Launched",
      excerpt: "StudyEase announces expanded payment options for students facing financial hardship.",
      date: "March 15, 2024",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
      category: "Policy"
    },
    {
      id: 2,
      title: "Partnership with Major Universities Announced",
      excerpt: "We're excited to partner with leading institutions to provide better payment solutions.",
      date: "March 10, 2024",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
      category: "Partnership"
    },
    {
      id: 3,
      title: "Student Success Stories: How Flexible Payments Changed Lives",
      excerpt: "Read inspiring stories from students who achieved their dreams with our help.",
      date: "March 5, 2024",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      category: "Success Story"
    },
    {
      id: 4,
      title: "Technology Updates: Faster Application Processing",
      excerpt: "Our new system reduces application processing time by 50%.",
      date: "February 28, 2024",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      category: "Technology"
    }
  ];

  const filteredArticles = newsArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(newsEventData);

  return (
    <div className="min-h-screen">
      <TopHeader />
      <Navigation />
      
      <div className="pt-36 sm:pt-32 pb-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Latest News & Updates
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed about the latest developments, success stories, and updates from Eldizer Finance
            </p>
          </div>

          <div className="max-w-md mx-auto mb-12">
            <Input
              type="text"
              placeholder="Search news articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsEventData.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div 
                  className="aspect-video overflow-hidden"
                  onClick={() => navigate(`/news/${article.id}`)}
                >
                  <img 
                    src={article.image_url} 
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      {typeof article.category === 'object' && article.category !== null ? article.category.name : article.category}
                    </span>
                    {/* <span className="text-sm text-gray-500">{article.created_at}</span> */}
                    <span className="text-sm text-gray-500">
                      {article.created_at ? new Date(article.created_at).toLocaleDateString() : ''}
                    </span>

                  </div>
                  <CardTitle className="text-xl">
                    {typeof article.title === 'string' ? article.title : JSON.stringify(article.title)}
                  </CardTitle>
                  <CardDescription className="text-gray-600 line-clamp-4">
                    {typeof article.content === 'string' ? article.content : JSON.stringify(article.content)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate(`/news/${article.id}`)}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default News;
