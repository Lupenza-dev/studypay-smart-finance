
import { Shield, Zap, Heart, Calendar } from 'lucide-react';

const WhyChooseUs = ({ minServicesData }: { minServicesData: any[] }) => {
  const SvgIcon = ({ svgString }) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const svgElement = doc.querySelector('svg');
    
    if (!svgElement) return null;
    
    // Extract attributes and convert to React props
    const props = {};
    for (let attr of svgElement.attributes) {
      const propName = attr.name === 'class' ? 'className' : attr.name;
      props[propName] = attr.value;
    }
    
    return (
      <svg {...props}>
        <g dangerouslySetInnerHTML={{ __html: svgElement.innerHTML }} />
      </svg>
    );
  };
  const benefits = [
    {
      icon: Shield,
      title: "Tailored Solutions for Students’ Unique Needs",
      description: "El-dizer Financial Service stands out by offering innovative financial solutions specifically designed for students. Our services, including emergency loans, intern student loans, and access to learning devices with flexible payment options, address the unique financial challenges faced by students in Tanzania. We understand their needs and provide timely support to ensure their academic journey remains uninterrupted.",
      stat: "0%",
      statLabel: "Hidden Fees"
    },
    {
      icon: Heart,
      title: "Quick Access to Funds and Essential Resources",
      description: "Unlike traditional financial institutions that may take months to process loans, El-dizer provides swift access to emergency funds, essential learning devices, and internship support. Our digital wallet and Chuo Credit App streamline financial management and promote financial literacy, helping students handle unexpected expenses and academic requirements efficiently",
      stat: "24/7",
      statLabel: "Student Support"
    },
    {
      icon: Zap,
      title: "Significant Impact on Students’ Lives",
      description: "Since our inception, El-dizer has disbursed over TZS 180,453,000 to more than 1,244 students, facilitating their access to critical resources and financial stability. This support has empowered students to manage emergencies, secure internships, and acquire necessary learning tools, thereby significantly contributing to their academic success and well-being",
      stat: "2 min",
      statLabel: "Average Approval"
    },
    {
      icon: Calendar,
      title: "Strategic Partnerships with Leading Institutions",
      description: "Our collaborations with esteemed financial institutions like NMB Bank and universities in Dodoma enhance the reliability and reach of our services. These partnerships ensure secure and efficient loan repayments and position us well for future growth, enabling us to extend our services to more institutions across Tanzania",
      stat: "100%",
      statLabel: "Flexible Schedules"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Why Students Choose Eldizer Financial Services
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We're more than just a Financial service - we're your partner in educational success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {minServicesData.map((service, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                <div className="mx-auto bg-white text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform px-1 py-1">
                  {/* <service.icon size={32} /> */}
                  <SvgIcon svgString={service.icon} />
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-blue-100 mb-6 leading-relaxed">{service.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
