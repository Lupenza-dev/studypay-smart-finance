
import TopHeader from '../components/TopHeader';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Award, Heart, CheckCircle } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Build Credit Score",
      description: "To make credit system for student through uni-loan so through good credit history they have may be able to be trusted by other financial institution."
    },
    {
      icon: Target,
      title: "Access to Digital Gadgets",
      description: "To make sure that all student do have access to digital learning device to help student from poor family to copy with new digital world as earlier as possible."
    },
    {
      icon: Users,
      title: "Riskfree Loan to Graduates",
      description: "To have youth bank which may be able to help graduate in entrepreneurship through credit score they got since they where in university."
    },
    {
      icon: Award,
      title: "Fast loan Application",
      description: "Student fast loan applications streamline funding, offering swift, accessible financial aid for education expenses, minimizing paperwork and enhancing efficiency."
    }
  ];

  const team = [
    {
      name: "Elibariki Laizer",
      role: "CEO & Founder",
      bio: "Former university financial aid director with 5+ years of experience helping students navigate educational financing.",
      image: "laizer.png"
    },
    {
      name: "Luhangano Lupenza",
      role: "CTO",
      bio: "Technology leader passionate about creating user-friendly financial tools that empower student success.",
      image: "lupenza.jpg"
    },
    // {
    //   name: "Dr. Emily Rodriguez",
    //   role: "Head of Student Success",
    //   bio: "Educational psychologist dedicated to removing financial barriers to higher education achievement.",
    //   image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
    // }
  ];

  const milestones = [
    { year: "2019", event: "Eldizer Finance founded with mission to help 1,000 students" },
    { year: "2020", event: "Partnered with first 50 universities nationwide" },
    { year: "2021", event: "Reached 10,000 students served milestone" },
    { year: "2022", event: "Launched innovative textbook financing program" },
    { year: "2023", event: "Expanded to 500+ university partnerships" },
    { year: "2024", event: "Now serving 50,000+ students across the country" }
  ];

  return (
    <div className="min-h-screen">
      <TopHeader />
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#272f3b] to-[#3b4d63] text-white pt-36 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Empowering Student Success</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We believe every student deserves access to quality education without financial stress. 
            That's why we're dedicated to creating flexible, transparent payment solutions that work with your student life.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Who We Are</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              El-dizer financial service is only financial service (fintech) in Tanzania that serves scholar from different higher learning institution as well as public servant to get access over a number of credit facilities so that they can simplify their day to day demands and wants through digital platform such as application, website and social media
              </p>
              {/* <p className="text-lg text-gray-600 leading-relaxed">
                In 2019, we set out to change this narrative. We created a company that truly understands student life – 
                the irregular income, the tight budgets, the timing mismatches between expenses and financial aid. 
                Today, we're proud to serve over 50,000 students nationwide.
              </p> */}
               <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={24} />
                <span className="text-gray-700">Digital Accessibility and Convenience</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={24} />
                <span className="text-gray-700">Transparent and Fair Practices</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={24} />
                <span className="text-gray-700">Fast Approval and Disbursement</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={24} />
                <span className="text-gray-700">Customer Support and Relationship Management</span>
              </div>
            </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" 
                alt="Students collaborating"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Mission & Vision</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-l-4 border-l-[#df412d]">
              <CardHeader>
                <CardTitle className="text-[#df412d]">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-600 leading-relaxed">
                To walk along with scholars and public servant in day to day manner, providing services that enrich their livelihood
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-[#272f3b]">
              <CardHeader>
                <CardTitle className="text-[#272f3b]">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-600 leading-relaxed">
                To be one of the outstanding financial company that can solve financial challenge from university student, graduate, entrepreneur as well as public servant
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Enabling financial independence</h2>
            <p className="text-xl text-gray-600">Facilitating self-reliance through accessible and empowering financial solutions.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto bg-gradient-to-r from-[#df412d] to-[#df412d] text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <value.icon size={32} />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600">Experienced leaders dedicated to student success</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                  />
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-[#df412d] font-semibold">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Milestones */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones in our mission to help students</p>
          </div>
          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-[#df412d] to-[#df412d] text-white w-20 h-20 rounded-full flex items-center justify-center font-bold text-lg mr-8">
                  {milestone.year}
                </div>
                <div className="flex-1">
                  <p className="text-lg text-gray-700">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
