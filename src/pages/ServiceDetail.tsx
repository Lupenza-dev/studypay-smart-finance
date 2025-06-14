
import { useParams, useNavigate } from 'react-router-dom';
import TopHeader from '../components/TopHeader';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, GraduationCap, Laptop, Calculator, CheckCircle, ArrowLeft, Phone, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);

  const services = {
    'textbook-financing': {
      id: 'textbook-financing',
      icon: Book,
      title: "Textbook Financing",
      description: "Split your textbook costs over the semester with our flexible payment plans. Never worry about upfront textbook expenses again.",
      longDescription: "Our textbook financing solution is designed specifically for students who need access to required course materials without the financial burden of paying everything upfront. We partner with major textbook retailers and publishers to offer you the books you need with payment plans that align with your academic schedule.",
      features: [
        "No interest for the first 4 months",
        "Digital and physical textbooks covered",
        "Instant approval process",
        "Semester-based payment schedules",
        "Coverage for new and used books",
        "Rental options available"
      ],
      benefits: [
        "Immediate access to required textbooks",
        "Improved academic performance",
        "Better budget management",
        "No impact on credit score for on-time payments"
      ],
      pricing: {
        startingPrice: "$25/month",
        processingFee: "$5",
        interestRate: "0% for 4 months, then 15% APR"
      },
      eligibility: [
        "Currently enrolled student",
        "Valid student ID",
        "Active email address",
        "US resident"
      ]
    },
    'tuition-payment-plans': {
      id: 'tuition-payment-plans',
      icon: GraduationCap,
      title: "Tuition Payment Plans",
      description: "Flexible tuition payment options that work with your financial aid and family budget.",
      longDescription: "Make your education more affordable with our comprehensive tuition payment plans. We work directly with universities to create payment schedules that fit your financial situation while ensuring you can focus on your studies.",
      features: [
        "Monthly payment plans available",
        "Semester-based payment schedules",
        "Financial aid integration",
        "Parent co-signer options",
        "Automatic payment setup",
        "Payment reminders and tracking"
      ],
      benefits: [
        "Reduced financial stress",
        "Improved cash flow management",
        "No enrollment holds",
        "Flexible payment dates"
      ],
      pricing: {
        startingPrice: "Custom plans",
        processingFee: "$50 setup fee",
        interestRate: "0% interest on approved plans"
      },
      eligibility: [
        "Enrolled at partner institution",
        "Good academic standing",
        "Completed FAFSA (if applicable)",
        "Meet income requirements"
      ]
    },
    'equipment-loans': {
      id: 'equipment-loans',
      icon: Laptop,
      title: "Equipment Loans",
      description: "Get the technology you need for your studies with affordable payment plans.",
      longDescription: "Access the latest technology and equipment essential for your academic success. From laptops to specialized software, we provide flexible financing options for all your educational technology needs.",
      features: [
        "Laptops and tablets financing",
        "Software subscription coverage",
        "Lab equipment loans",
        "Upgrade options mid-semester",
        "Insurance coverage available",
        "Tech support included"
      ],
      benefits: [
        "Access to latest technology",
        "Improved learning capabilities",
        "Technical support included",
        "Upgrade flexibility"
      ],
      pricing: {
        startingPrice: "$50/month",
        processingFee: "$25",
        interestRate: "12% APR"
      },
      eligibility: [
        "Full-time student status",
        "Valid student ID",
        "Minimum 2.5 GPA",
        "US resident"
      ]
    },
    'course-fee-management': {
      id: 'course-fee-management',
      icon: Calculator,
      title: "Course Fee Management",
      description: "Manage lab fees, project costs, and other course-related expenses with ease.",
      longDescription: "Handle all your course-related expenses efficiently with our comprehensive fee management system. From lab fees to study abroad costs, we help you budget and pay for all educational expenses.",
      features: [
        "Lab fee payment splitting",
        "Project funding assistance",
        "Study abroad expense coverage",
        "Flexible payment scheduling",
        "Expense tracking tools",
        "Receipt management"
      ],
      benefits: [
        "Better expense tracking",
        "Reduced financial planning stress",
        "Access to specialized courses",
        "Improved academic opportunities"
      ],
      pricing: {
        startingPrice: "$15/month",
        processingFee: "$10",
        interestRate: "10% APR"
      },
      eligibility: [
        "Enrolled in eligible courses",
        "Active student status",
        "Course registration confirmation",
        "Valid payment method"
      ]
    }
  };

  useEffect(() => {
    if (serviceId && services[serviceId as keyof typeof services]) {
      setService(services[serviceId as keyof typeof services]);
    }
  }, [serviceId]);

  if (!service) {
    return (
      <div className="min-h-screen">
        <TopHeader />
        <Navigation />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/services')}>
            Back to Services
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const IconComponent = service.icon;

  return (
    <div className="min-h-screen">
      <TopHeader />
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/services')}
              className="bg-white text-purple-600 hover:bg-gray-100 mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
          </div>
          
          <div className="flex items-center mb-6">
            <div className="bg-white text-purple-600 w-20 h-20 rounded-full flex items-center justify-center mr-6">
              <IconComponent size={40} />
            </div>
            <div>
              <h1 className="text-5xl font-bold mb-4">{service.title}</h1>
              <p className="text-xl text-blue-100">{service.description}</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{service.pricing.startingPrice}</div>
              <div className="text-blue-200">Starting Price</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-200">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">5 min</div>
              <div className="text-blue-200">Application Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Service</h2>
              <p className="text-lg text-gray-600 mb-8">{service.longDescription}</p>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Benefits</h3>
              <ul className="space-y-3">
                {service.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-3" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              {/* Pricing Card */}
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-600">Pricing Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Starting Price:</span>
                      <span className="font-semibold">{service.pricing.startingPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processing Fee:</span>
                      <span className="font-semibold">{service.pricing.processingFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Rate:</span>
                      <span className="font-semibold">{service.pricing.interestRate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Eligibility Card */}
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-600">Eligibility Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.eligibility.map((requirement: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Need Help?</CardTitle>
                  <CardDescription>Our team is here to assist you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="text-gray-700">1-800-STUDY-EASE</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="text-gray-700">support@studyease.com</span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Apply now and get access to {service.title.toLowerCase()} with flexible payment options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-400 text-purple-900 hover:bg-yellow-300 font-semibold px-8 py-6 text-lg">
              Apply Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
