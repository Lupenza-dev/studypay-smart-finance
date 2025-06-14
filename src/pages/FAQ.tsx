
import { useState } from 'react';
import TopHeader from '../components/TopHeader';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqData = [
    {
      id: 1,
      category: "Getting Started",
      question: "How do I apply for StudyEase payment plans?",
      answer: "Applying is simple! Click the 'Apply Now' button, fill out our quick application form, and you'll receive approval status within minutes. No lengthy paperwork or complex procedures required."
    },
    {
      id: 2,
      category: "Getting Started",
      question: "What documents do I need to apply?",
      answer: "You'll need your student ID, enrollment verification, and basic personal information. For some plans, we may also ask for income verification or a co-signer."
    },
    {
      id: 3,
      category: "Payment Plans",
      question: "What types of payment plans do you offer?",
      answer: "We offer flexible monthly, quarterly, and semester-based payment plans. You can split your tuition, textbooks, housing costs, and other education expenses into manageable payments that align with your academic calendar."
    },
    {
      id: 4,
      category: "Payment Plans",
      question: "Are there any fees or interest charges?",
      answer: "We believe in transparency. Some plans may have minimal processing fees, but we never charge hidden fees. Interest rates, if applicable, are clearly disclosed upfront and are competitive with industry standards."
    },
    {
      id: 5,
      category: "Eligibility",
      question: "Who is eligible for StudyEase payment plans?",
      answer: "Current students enrolled in accredited institutions are eligible. We welcome undergraduate, graduate, and professional students. International students may also qualify with additional documentation."
    },
    {
      id: 6,
      category: "Eligibility",
      question: "Do I need good credit to qualify?",
      answer: "Not necessarily! We consider various factors beyond credit scores, including enrollment status, academic progress, and future earning potential. Students with limited credit history are encouraged to apply."
    },
    {
      id: 7,
      category: "Account Management",
      question: "How do I make payments?",
      answer: "You can make payments through our secure online portal, mobile app, automatic bank transfers, or by phone. We send reminders before each payment is due."
    },
    {
      id: 8,
      category: "Account Management",
      question: "What happens if I miss a payment?",
      answer: "We understand student life can be unpredictable. If you miss a payment, contact us immediately. We offer grace periods and can work with you to adjust your payment schedule if needed."
    },
    {
      id: 9,
      category: "Support",
      question: "How can I get help if I have issues?",
      answer: "Our student support team is available Monday-Friday 8 AM to 8 PM EST. You can reach us by phone, email, or live chat. We also have an extensive help center with guides and tutorials."
    },
    {
      id: 10,
      category: "Support",
      question: "Can I change my payment plan after I've started?",
      answer: "Yes, in many cases you can modify your payment plan. Contact our support team to discuss your options. We're here to work with you as your financial situation changes."
    }
  ];

  const filteredFAQs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(faqData.map(faq => faq.category))];

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
              const categoryFAQs = filteredFAQs.filter(faq => faq.category === category);
              
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
                            {faq.question}
                            <span className="text-2xl text-gray-400">
                              {openFAQ === faq.id ? '−' : '+'}
                            </span>
                          </CardTitle>
                        </CardHeader>
                        {openFAQ === faq.id && (
                          <CardContent className="pt-0 animate-fade-in">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
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
                  <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
                    Contact Support
                  </button>
                  <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-md font-medium transition-colors">
                    Live Chat
                  </button>
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
