
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NewsSection = () => {
  const navigate = useNavigate();

  const latestNews = [
    {
      id: 1,
      title: "New Student Loan Relief Program Launched",
      excerpt: "StudyEase announces expanded payment options for students facing financial hardship during these challenging times.",
      date: "March 15, 2024",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&q=80",
      category: "Policy"
    },
    {
      id: 2,
      title: "Partnership with Major Universities",
      excerpt: "We're excited to partner with leading institutions to provide better payment solutions for students nationwide.",
      date: "March 10, 2024",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
      category: "Partnership"
    },
    {
      id: 3,
      title: "Student Success Stories",
      excerpt: "Read inspiring stories from students who achieved their dreams with flexible payment solutions.",
      date: "March 5, 2024",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
      category: "Success Story"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest News & Updates
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about the latest developments and success stories from StudyEase
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {latestNews.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white cursor-pointer">
              <div 
                className="aspect-video overflow-hidden"
                onClick={() => navigate(`/news/${article.id}`)}
              >
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500">{article.date}</span>
                </div>
                <CardTitle className="text-xl leading-tight">{article.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {article.excerpt}
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

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
            onClick={() => navigate('/news')}
          >
            View All News
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
