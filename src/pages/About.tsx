
import TopHeader from '../components/TopHeader';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Award, Heart, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { websiteService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface AboutData {
  vision: string; 
  mission: string;
  content: string;
  all_values: [];
  image_url?: string;
}
interface CoreValueData {
  icon: string; 
  name: string;
  content: string;
}
interface TeamMemberData {
  name: string; 
  position: string;
  bio: string;
  image_url: string;
}

const About = () => {
   const [aboutUs,setAboutUs] =useState<AboutData | null>(null);
   const [coreValues,setCoreValues] =useState<CoreValueData []>([]);
   const [teamMembers,setTeamMembers] =useState<TeamMemberData []>([]);

   const {toast} =useToast();
   const fetchAboutUs = async () => {
    try {
      const response = await websiteService.getAboutUs();
      setAboutUs(response.about);
      setCoreValues(response.core_values);
      setTeamMembers(response.team_members);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to load services',
        variant: "destructive",
      });
    } finally {
      //setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutUs();
  }, []);

  if (!aboutUs) {
    return null;
  }


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
              {aboutUs.content}
              </p>
               <div className="space-y-4">
             {
                aboutUs.all_values.map((value: string, idx: number) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500" size={24} />
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))
              }
            </div>
            </div>
            <div>
              <img 
                src={aboutUs.image_url} 
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
                {aboutUs.mission}
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-[#272f3b]">
              <CardHeader>
                <CardTitle className="text-[#272f3b]">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-600 leading-relaxed">
                {aboutUs.vision}
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
            {coreValues.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto bg-gradient-to-r from-[#df412d] to-[#df412d] text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <value.icon size={32} />
                  </div>
                  <CardTitle className="text-xl">{value.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.content}</p>
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
            <p className="text-xl text-gray-600">Experienced leaders dedicated to our success</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <img 
                    src={member.image_url} 
                    alt={member.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                  />
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-[#df412d] font-semibold">{member.position}</CardDescription>
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
      {/* <section className="py-20 bg-white">
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
      </section> */}

      <Footer />
    </div>
  );
};

export default About;
