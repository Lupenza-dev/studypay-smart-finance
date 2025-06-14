
import TopHeader from '../components/TopHeader';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, GraduationCap, Laptop, Calculator, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServicesPage = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Book,
      title: "Textbook Financing",
      description: "Split your textbook costs over the semester. Never worry about upfront textbook expenses again.",
      features: ["No interest for 4 months", "Digital and physical books", "Instant approval", "Semester-based payments"],
      startingPrice: "from $25/month",
      route: "/services/textbook-financing"
    },
    {
      icon: GraduationCap,
      title: "Tuition Payment Plans",
      description: "Flexible tuition payment options that work with your financial aid and family budget.",
      features: ["Monthly payment plans", "Semester-based schedules", "Financial aid integration", "Parent co-signer options"],
      startingPrice: "Custom plans available",
      route: "/services/tuition-payment-plans"
    },
    {
      icon: Laptop,
      title: "Equipment Loans",
      description: "Get the technology you need for your studies with affordable payment plans.",
      features: ["Laptops & tablets", "Software subscriptions", "Lab equipment", "Upgrade options"],
      startingPrice: "from $50/month",
      route: "/services/equipment-loans"
    },
    {
      icon: Calculator,
      title: "Course Fee Management",
      description: "Manage lab fees, project costs, and other course-related expenses with ease.",
      features: ["Lab fee splitting", "Project funding", "Study abroad support", "Flexible scheduling"],
      startingPrice: "from $15/month",
      route: "/services/course-fee-management"
    }
  ];

  const steps = [
    {
      step: 1,
      title: "Apply Online",
      description: "Complete our simple application in under 5 minutes"
    },
    {
      step: 2,
      title: "Get Approved",
      description: "Receive instant approval decision based on your student status"
    },
    {
      step: 3,
      title: "Choose Your Plan",
      description: "Select payment terms that work with your academic schedule"
    },
    {
      step: 4,
      title: "Start Learning",
      description: "Focus on your studies while we handle the payment logistics"
    }
  ];

  const universities = [
    "Stanford University", "MIT", "Harvard University", "UC Berkeley",
    "NYU", "University of Michigan", "Georgia Tech", "UCLA"
  ];

  return (
    <div className="min-h-screen">
      <TopHeader />
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Comprehensive Financial Solutions for Students</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            From textbooks to tuition, we provide flexible payment options that make education more accessible and affordable.
          </p>
          <Button size="lg" className="bg-yellow-400 text-purple-900 hover:bg-yellow-300 font-semibold px-8 py-6 text-lg">
            Apply Now - Get Started
          </Button>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored financial solutions designed specifically for student life and academic success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-purple-500">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mr-4">
                      <service.icon size={32} />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-gray-800">{service.title}</CardTitle>
                      <p className="text-purple-600 font-semibold">{service.startingPrice}</p>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 text-lg">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex space-x-4">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      onClick={() => navigate(service.route)}
                    >
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Get Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to get the financial support you need</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Institutions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Partner Universities</h2>
            <p className="text-xl text-gray-600">Trusted by 500+ institutions nationwide</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {universities.map((university, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-700">{university}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 50,000+ students who have simplified their education financing with StudyEase.
          </p>
          <Button size="lg" className="bg-yellow-400 text-purple-900 hover:bg-yellow-300 font-semibold px-8 py-6 text-lg">
            Apply Now - It's Free!
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
