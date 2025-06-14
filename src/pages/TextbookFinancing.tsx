
import TopHeader from '../components/TopHeader';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, CheckCircle, DollarSign, Calendar, Shield } from 'lucide-react';

const TextbookFinancing = () => {
  const benefits = [
    "No upfront costs for textbooks",
    "Split payments over the semester", 
    "0% interest for first 4 months",
    "Covers digital and physical books",
    "Instant approval process",
    "Flexible payment dates"
  ];

  const pricingPlans = [
    {
      name: "Semester Plan",
      price: "$25-75/month",
      duration: "4 months",
      features: ["Split over semester", "0% interest", "Auto-renewal option"]
    },
    {
      name: "Extended Plan", 
      price: "$15-50/month",
      duration: "6 months",
      features: ["Lower monthly payments", "Small interest fee", "Flexible timing"]
    }
  ];

  const testimonials = [
    {
      name: "Jessica M.",
      university: "UCLA",
      quote: "Textbook financing saved me from choosing between textbooks and groceries. Now I can focus on my studies without financial stress.",
      rating: 5
    },
    {
      name: "Marcus R.", 
      university: "NYU",
      quote: "The approval was instant and the payment plan worked perfectly with my work-study schedule. Highly recommend!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <TopHeader />
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">Textbook Financing Made Simple</h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Never worry about upfront textbook costs again. Split your textbook expenses over the semester with flexible payment plans designed for students.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-yellow-400 text-purple-900 hover:bg-yellow-300 font-semibold px-8 py-6 text-lg">
                  Apply Now - Free!
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-6 text-lg">
                  Calculate Payments
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80" 
                alt="Student with textbooks"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-purple-600 p-6 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">$500+</div>
                <div className="text-sm">Average Saved per Semester</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How Textbook Financing Works</h2>
            <p className="text-xl text-gray-600">Get your books now, pay later in manageable installments</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-4">Browse & Select</h3>
              <p className="text-gray-600">Choose your textbooks from our partner bookstores or upload your syllabus</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-4">Apply & Get Approved</h3>
              <p className="text-gray-600">Complete our 2-minute application and receive instant approval</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-4">Receive Your Books</h3>
              <p className="text-gray-600">Get your textbooks delivered or download them immediately</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6">
                4
              </div>
              <h3 className="text-xl font-bold mb-4">Pay Over Time</h3>
              <p className="text-gray-600">Make small monthly payments that fit your budget</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Choose Our Textbook Financing?</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500" size={24} />
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <Book className="mx-auto text-purple-600" size={32} />
                  <CardTitle>50,000+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Books Financed</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <DollarSign className="mx-auto text-green-600" size={32} />
                  <CardTitle>$2M+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Student Savings</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Calendar className="mx-auto text-blue-600" size={32} />
                  <CardTitle>0%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Interest (4 months)</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Shield className="mx-auto text-orange-600" size={32} />
                  <CardTitle>98%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Approval Rate</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Flexible Payment Plans</h2>
            <p className="text-xl text-gray-600">Choose the plan that works best for your budget</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className="border-2 hover:border-purple-500 transition-colors">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-purple-600">{plan.price}</div>
                  <CardDescription>For {plan.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Choose {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Students Say</h2>
            <p className="text-xl text-gray-600">Real experiences from students using our textbook financing</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.university}</CardDescription>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What textbooks are eligible for financing?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">All textbooks required for your courses are eligible, including digital editions, physical books, and course materials from our partner bookstores.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>How quickly can I get approved?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Most applications are approved instantly. In some cases, it may take up to 24 hours for review.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>What happens if I drop a class?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">If you drop within the first two weeks, you can return the textbook for a full refund. After that, standard return policies apply.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Your Textbooks?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have made textbook costs manageable with our financing options.
          </p>
          <Button size="lg" className="bg-yellow-400 text-purple-900 hover:bg-yellow-300 font-semibold px-8 py-6 text-lg">
            Apply for Textbook Financing
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TextbookFinancing;
