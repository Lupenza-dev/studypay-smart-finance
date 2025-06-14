
import { Shield, Zap, Heart, Calendar } from 'lucide-react';

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: Shield,
      title: "No Hidden Fees",
      description: "Complete transparency in pricing. What you see is what you pay, with no surprise charges.",
      stat: "0%",
      statLabel: "Hidden Fees"
    },
    {
      icon: Heart,
      title: "Student-Friendly Terms",
      description: "We understand student budgets and create payment plans that work with your lifestyle.",
      stat: "24/7",
      statLabel: "Student Support"
    },
    {
      icon: Zap,
      title: "Quick Approval",
      description: "Get approved in minutes, not days. Our streamlined process gets you what you need fast.",
      stat: "2 min",
      statLabel: "Average Approval"
    },
    {
      icon: Calendar,
      title: "Academic Calendar Aligned",
      description: "Payment schedules that sync with semesters, breaks, and your financial aid disbursements.",
      stat: "100%",
      statLabel: "Flexible Schedules"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Why 50,000+ Students Choose StudyEase
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We're more than just a payment service - we're your partner in educational success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                <div className="mx-auto bg-white text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-blue-100 mb-6 leading-relaxed">{benefit.description}</p>
                <div className="border-t border-white/20 pt-4">
                  <div className="text-3xl font-bold text-yellow-300">{benefit.stat}</div>
                  <div className="text-sm text-blue-200">{benefit.statLabel}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
