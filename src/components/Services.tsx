
import { Book, GraduationCap, Laptop, Calculator } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Services = ({ serviceData }: { serviceData: any[] }) => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Book,
      title: "Uni Loan",
      description: "Uni-Loan is a lifeline for university students, offering emergency loans when they need it most—while waiting for their funds from the Higher Education Students' Loans Board (HESLB).",
      features: ["No interest for 4 months", "Digital and physical books", "Instant approval"],
      route: "/services/textbook-financing"
    },
    {
      icon: GraduationCap,
      title: "Pay Later",
      description: "Pay Later is (device financing) a funding service designed for students and individuals, enabling them to purchase electronic devices with flexible payment options—either in full or through installments.",
      features: ["Monthly payment plans", "Semester-based schedules", "Financial aid integration"],
      route: "/services"
    },
    {
      icon: Laptop,
      title: "Intern-loan",
      description: "The Intern Loan is a specialized emergency loan service designed for graduate students from health universities—such as doctors, pharmacists, nurses, and medical laboratory scientists",
      features: ["Laptops & tablets", "Software subscriptions", "Lab equipment"],
      route: "/services"
    },
    {
      icon: Calculator,
      title: "Unigraduate loan",
      description: "After two years of working closely with students, we observed that many had developed a positive loan repayment history. This inspired us to introduce a credit system that extends beyond graduation",
      features: ["Lab fee splitting", "Project funding", "Study abroad support"],
      route: "/services"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We Offer Different Types Of
          Loans To Support Our Youth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceData.map((service, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-[#df412d]">
              <CardHeader className="text-center">
                <div className="mx-auto bg-gradient-to-r from-[#df412d] to-[#df412d] text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <service.icon size={32} />
                </div>
                <CardTitle className="text-xl text-gray-800">{service.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {service.content}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul> */}
                <Button 
                  className="w-full bg-gradient-to-r from-[#df412d] to-[#df412d] hover:from-[#272f3b] hover:to-[#272f3b]"
                  onClick={() => navigate(service.route)}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
