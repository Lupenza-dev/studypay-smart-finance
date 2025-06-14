
import { Book, GraduationCap, Laptop, Calculator } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Book,
      title: "Textbook Financing",
      description: "Split your textbook costs over the semester. Pay in 3-4 installments instead of all at once.",
      features: ["No interest for 4 months", "Digital and physical books", "Instant approval"],
      route: "/services/textbook-financing"
    },
    {
      icon: GraduationCap,
      title: "Tuition Payment Plans",
      description: "Flexible tuition payment options that work with your financial aid and family budget.",
      features: ["Monthly payment plans", "Semester-based schedules", "Financial aid integration"],
      route: "/services"
    },
    {
      icon: Laptop,
      title: "Equipment Loans",
      description: "Get the technology you need for your studies with affordable payment plans.",
      features: ["Laptops & tablets", "Software subscriptions", "Lab equipment"],
      route: "/services"
    },
    {
      icon: Calculator,
      title: "Course Fee Management",
      description: "Manage lab fees, project costs, and other course-related expenses with ease.",
      features: ["Lab fee splitting", "Project funding", "Study abroad support"],
      route: "/services"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Payment Solutions for Every Student Need
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From textbooks to tuition, we've got flexible payment options that make education more accessible and affordable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-purple-500">
              <CardHeader className="text-center">
                <div className="mx-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <service.icon size={32} />
                </div>
                <CardTitle className="text-xl text-gray-800">{service.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
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
