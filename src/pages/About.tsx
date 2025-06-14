
import TopHeader from '../components/TopHeader';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Award, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Student-First Approach",
      description: "Every decision we make is guided by what's best for student success and financial wellbeing."
    },
    {
      icon: Target,
      title: "Transparency",
      description: "Clear terms, honest pricing, and no hidden fees. We believe students deserve complete transparency."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Building a supportive community where students can thrive academically and financially."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to providing exceptional service and innovative financial solutions for education."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former university financial aid director with 15+ years of experience helping students navigate educational financing.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1c7?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Technology leader passionate about creating user-friendly financial tools that empower student success.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Head of Student Success",
      bio: "Educational psychologist dedicated to removing financial barriers to higher education achievement.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const milestones = [
    { year: "2019", event: "StudyEase founded with mission to help 1,000 students" },
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
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white pt-32 pb-20">
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
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                StudyEase was born from a simple observation: too many brilliant students were struggling not with their coursework, 
                but with the financial burden of education. Our founders, having worked in university financial aid for decades, 
                saw firsthand how financial stress was impacting student success.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                In 2019, we set out to change this narrative. We created a company that truly understands student life – 
                the irregular income, the tight budgets, the timing mismatches between expenses and financial aid. 
                Today, we're proud to serve over 50,000 students nationwide.
              </p>
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
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-purple-600">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To eliminate financial barriers in education by providing transparent, flexible payment solutions 
                  that align with student life and academic success. We're committed to empowering every student 
                  to focus on learning, not financial stress.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-blue-600">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-600 leading-relaxed">
                  A world where every student has access to quality education, regardless of their financial situation. 
                  We envision a future where financial flexibility enables academic excellence and creates opportunities 
                  for all students to achieve their dreams.
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
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
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
                  <CardDescription className="text-purple-600 font-semibold">{member.role}</CardDescription>
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
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center font-bold text-lg mr-8">
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
