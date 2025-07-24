
import { useEffect, useState } from 'react';
import TopHeader from '../components/TopHeader';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { websiteService } from '@/services/api';
import { useNavigate } from 'react-router-dom';

interface FaqData{
  id:number;
  title: string;
  content: string;
  category_name: string;
}

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [faqCategories, setFaqCategories] = useState<FaqData []>([]);

  const {toast} =useToast();
  const navigate = useNavigate(); 

  const fetchfaq = async () => {
    try {
      const response = await websiteService.getFaqs();
      setFaqCategories(response.faqs);
    } catch (error) {
      console.error('Error fetching faq:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to load faq',
        variant: "destructive",
      });
    } finally {
      //setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchfaq();
  }, []);

  const filteredFAQs = faqCategories.filter(faq =>
    faq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(faqCategories.map(faq => faq.category_name))];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen">
      <TopHeader />
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our student payment solutions
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="max-w-4xl mx-auto">
            {categories.map((category) => {
              const categoryFAQs = filteredFAQs.filter(faq => faq.category_name === category);
              
              if (categoryFAQs.length === 0) return null;

              return (
                <div key={category} className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                    {category}
                  </h2>
                  
                  <div className="space-y-4">
                    {categoryFAQs.map((faq) => (
                      <Card key={faq.id} className="overflow-hidden">
                        <CardHeader 
                          className="cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => toggleFAQ(faq.id)}
                        >
                          <CardTitle className="text-lg flex justify-between items-center">
                            {faq.title}
                            <span className="text-2xl text-gray-400">
                              {openFAQ === faq.id ? '−' : '+'}
                            </span>
                          </CardTitle>
                        </CardHeader>
                        {openFAQ === faq.id && (
                          <CardContent className="pt-0 animate-fade-in">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.content}
                            </p>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Still have questions?</CardTitle>
                <CardDescription>
                  Can't find the answer you're looking for? Our support team is here to help.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-gradient-to-r from-[#DF412E] to-[#DF412E] hover:from-[#282F3B] hover:to-[#282F3B] text-white px-6 py-2 rounded-md font-medium transition-colors"
                   onClick={() => navigate(`/contact`)}
                  >
                    Contact Support
                  </button>
                  {/* <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-md font-medium transition-colors">
                    Live Chat
                  </button> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
