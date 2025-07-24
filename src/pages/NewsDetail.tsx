
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import TopHeader from '../components/TopHeader';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, Share2, Clock } from 'lucide-react';
import { useEffect } from 'react';

const NewsDetail = () => {
  const location = useLocation();
  const { article } = location.state || {};
  const { newsArticle } = useParams();
  const navigate = useNavigate();

  if (!article) {
    return (
      <div className="min-h-screen">
        <TopHeader />
        <Navigation />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/news')}>
            Back to News
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <TopHeader />
      <Navigation />
      {/* Article Header */}
      <section className="pt-32 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/news')}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Button>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                {article.category?.name}
              </span>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                {article.created_at ? new Date(article.created_at).toLocaleDateString() : ''}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-600 mr-2" />
                <span className="text-gray-600">By Eldizer Finance Team</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Image */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video overflow-hidden rounded-lg">
              <img 
                src={article.image_url} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Article Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-3">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
                <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Ready to Get Started?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Learn more about how Eldizer Finance Ltd can help you achieve your educational goals with flexible payment solutions.
                  </p>
                  <div className="flex space-x-4">
                    <Button className="bg-gradient-to-r from-[#DF412E] to-[#DF412E] hover:from-[#282F3B] hover:to-[#282F3B]"
                     onClick={() => navigate(`/contact`)}
                    >
                      Contact Us
                    </Button>
                  </div>
                </div>
              </div>
              {/* Related articles section can be added here if needed */}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NewsDetail;

