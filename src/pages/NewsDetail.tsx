
import { useParams, useNavigate } from 'react-router-dom';
import TopHeader from '../components/TopHeader';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, Share2, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

const NewsDetail = () => {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);

  const newsArticles = {
    '1': {
      id: '1',
      title: "New Student Loan Relief Program Launched",
      excerpt: "StudyEase announces expanded payment options for students facing financial hardship during these challenging times.",
      content: `
        <p>We're excited to announce the launch of our comprehensive Student Loan Relief Program, designed to provide additional support for students facing financial challenges. This program represents our commitment to making education more accessible and affordable for everyone.</p>
        
        <h3>What's New?</h3>
        <p>Our new relief program includes several key features:</p>
        <ul>
          <li>Extended payment terms for qualifying students</li>
          <li>Reduced interest rates for hardship cases</li>
          <li>Flexible payment scheduling options</li>
          <li>Emergency financial assistance</li>
          <li>Financial counseling services</li>
        </ul>
        
        <h3>Eligibility Requirements</h3>
        <p>To qualify for our Student Loan Relief Program, students must:</p>
        <ul>
          <li>Be currently enrolled in an accredited institution</li>
          <li>Demonstrate financial hardship due to unforeseen circumstances</li>
          <li>Have a current payment plan with StudyEase</li>
          <li>Provide documentation of financial situation</li>
        </ul>
        
        <h3>How to Apply</h3>
        <p>Students can apply for the relief program through our online portal or by contacting our customer service team directly. The application process is streamlined and designed to provide quick assistance to those in need.</p>
        
        <p>We understand that unexpected financial challenges can arise, and we're here to help our students succeed regardless of their circumstances. This program reflects our core values of accessibility, flexibility, and student success.</p>
      `,
      date: "March 15, 2024",
      author: "StudyEase Team",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=1200&q=80",
      category: "Policy",
      readTime: "5 min read"
    },
    '2': {
      id: '2',
      title: "Partnership with Major Universities Announced",
      excerpt: "We're excited to partner with leading institutions to provide better payment solutions for students nationwide.",
      content: `
        <p>Today marks a significant milestone in our mission to make education more accessible. We're proud to announce strategic partnerships with over 50 major universities across the United States, expanding our reach and impact in the student financial services sector.</p>
        
        <h3>Partnership Benefits</h3>
        <p>These partnerships will provide students with:</p>
        <ul>
          <li>Streamlined application processes through university portals</li>
          <li>Integrated financial aid coordination</li>
          <li>Campus-specific payment plans</li>
          <li>On-campus financial counseling</li>
          <li>Exclusive university-specific offers</li>
        </ul>
        
        <h3>Partner Institutions</h3>
        <p>Our new partners include prestigious institutions such as Stanford University, MIT, Harvard University, UC Berkeley, and many others. Each partnership is tailored to meet the specific needs of the student body at each institution.</p>
        
        <h3>What This Means for Students</h3>
        <p>Students at partner institutions will have access to:</p>
        <ul>
          <li>Faster approval processes</li>
          <li>Better integration with existing financial aid</li>
          <li>More flexible payment options</li>
          <li>Enhanced customer support</li>
        </ul>
        
        <p>We're excited about the opportunities these partnerships will create for students across the country. By working directly with universities, we can better understand and address the unique financial challenges facing today's students.</p>
      `,
      date: "March 10, 2024",
      author: "Partnership Team",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
      category: "Partnership",
      readTime: "4 min read"
    },
    '3': {
      id: '3',
      title: "Student Success Stories: How Flexible Payments Changed Lives",
      excerpt: "Read inspiring stories from students who achieved their dreams with flexible payment solutions.",
      content: `
        <p>At StudyEase, we measure our success by the achievements of our students. Today, we're sharing some inspiring stories from students whose lives have been transformed by our flexible payment solutions.</p>
        
        <h3>Sarah's Story: From Struggle to Success</h3>
        <p>Sarah, a pre-med student at UC Berkeley, was on the verge of dropping out due to financial constraints. "I couldn't afford my textbooks and was falling behind in my studies," she recalls. Through our textbook financing program, Sarah was able to get the materials she needed and graduated with honors.</p>
        
        <h3>Michael's Journey: Technology Access</h3>
        <p>Michael, an engineering student, needed specialized software and equipment for his coursework. Our equipment loan program provided him with a high-performance laptop and software licenses, enabling him to complete complex projects and secure an internship at a leading tech company.</p>
        
        <h3>Priya's Path: Study Abroad Dreams</h3>
        <p>Priya had always dreamed of studying abroad but couldn't afford the additional expenses. Our course fee management program helped her budget for and finance her semester in London, an experience that shaped her career trajectory in international business.</p>
        
        <h3>The Impact</h3>
        <p>These stories represent just a few of the thousands of students we've helped achieve their academic goals. Our flexible payment solutions have:</p>
        <ul>
          <li>Reduced dropout rates by 35% among our users</li>
          <li>Improved academic performance through timely access to resources</li>
          <li>Enabled students to pursue opportunities they otherwise couldn't afford</li>
          <li>Reduced financial stress, allowing focus on studies</li>
        </ul>
        
        <p>We're proud to play a role in these success stories and look forward to helping even more students achieve their dreams.</p>
      `,
      date: "March 5, 2024",
      author: "Student Success Team",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      category: "Success Story",
      readTime: "6 min read"
    },
    '4': {
      id: '4',
      title: "Technology Updates: Faster Application Processing",
      excerpt: "Our new system reduces application processing time by 50%.",
      content: `
        <p>We're excited to announce significant improvements to our application processing system that will make getting financial assistance faster and more efficient than ever before.</p>
        
        <h3>What's Changed?</h3>
        <p>Our engineering team has been working tirelessly to upgrade our systems with:</p>
        <ul>
          <li>Advanced AI-powered application review</li>
          <li>Streamlined verification processes</li>
          <li>Real-time status updates</li>
          <li>Mobile-optimized application flow</li>
          <li>Enhanced security measures</li>
        </ul>
        
        <h3>Benefits for Students</h3>
        <p>These improvements mean:</p>
        <ul>
          <li>50% faster application processing</li>
          <li>Instant pre-approval decisions</li>
          <li>Better mobile experience</li>
          <li>More transparent process</li>
          <li>Reduced paperwork requirements</li>
        </ul>
        
        <h3>Security Enhancements</h3>
        <p>While making the process faster, we've also enhanced security with:</p>
        <ul>
          <li>End-to-end encryption</li>
          <li>Multi-factor authentication</li>
          <li>Advanced fraud detection</li>
          <li>Secure document upload</li>
        </ul>
        
        <p>These updates represent our ongoing commitment to leveraging technology to better serve our students. We believe that financial assistance should be as seamless as possible, allowing students to focus on what matters most - their education.</p>
      `,
      date: "February 28, 2024",
      author: "Technology Team",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80",
      category: "Technology",
      readTime: "3 min read"
    }
  };

  const relatedArticles = [
    {
      id: '2',
      title: "Partnership with Major Universities Announced",
      excerpt: "We're excited to partner with leading institutions to provide better payment solutions.",
      date: "March 10, 2024",
      category: "Partnership"
    },
    {
      id: '3',
      title: "Student Success Stories: How Flexible Payments Changed Lives",
      excerpt: "Read inspiring stories from students who achieved their dreams.",
      date: "March 5, 2024",
      category: "Success Story"
    },
    {
      id: '4',
      title: "Technology Updates: Faster Application Processing",
      excerpt: "Our new system reduces application processing time by 50%.",
      date: "February 28, 2024",
      category: "Technology"
    }
  ];

  useEffect(() => {
    if (newsId && newsArticles[newsId as keyof typeof newsArticles]) {
      setArticle(newsArticles[newsId as keyof typeof newsArticles]);
    }
  }, [newsId]);

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

  const filteredRelatedArticles = relatedArticles.filter(related => related.id !== article.id);

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
                {article.category}
              </span>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                {article.date}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                {article.readTime}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-600 mr-2" />
                <span className="text-gray-600">By {article.author}</span>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
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
                src={article.image} 
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
              <div className="lg:col-span-2">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
                
                <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Ready to Get Started?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Learn more about how StudyEase can help you achieve your educational goals with flexible payment solutions.
                  </p>
                  <div className="flex space-x-4">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Apply Now
                    </Button>
                    <Button variant="outline">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-32">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Related Articles</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {filteredRelatedArticles.slice(0, 3).map((related) => (
                          <div key={related.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                {related.category}
                              </span>
                              <span className="text-xs text-gray-500">{related.date}</span>
                            </div>
                            <h4 
                              className="font-medium text-sm mb-2 cursor-pointer hover:text-purple-600 transition-colors"
                              onClick={() => navigate(`/news/${related.id}`)}
                            >
                              {related.title}
                            </h4>
                            <p className="text-xs text-gray-600">{related.excerpt}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewsDetail;
