import {
  ArrowRight,
  Building,
  ChevronRight,
  FileText,
  TrendingUp
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const features = [
    {
      icon: <Building className="w-8 h-8" />,
      title: "Real Industry Problems",
      description: "Solve actual challenges faced by companies in production environments"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Resume-Ready Projects",
      description: "Build a portfolio of practical projects you can showcase to employers"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Skill Development",
      description: "Progress through difficulty levels and master industry-standard practices"
    }
  ];

  const stats = [
    { number: "4", label: "Student Developers" },
    { number: "8", label: "Industry Problems" },
    { number: "1", label: "Projects Completed" }
  ];

  const challengeCategories = [
    {
      title: "Web Development",
      problems: 180,
      level: "Beginner to Advanced",
      color: "from-blue-500 to-cyan-500",
      icon: "🌐",
      description: "Build responsive websites and web applications"
    },
    {
      title: "Mobile Development",
      problems: 120,
      level: "Intermediate",
      color: "from-purple-500 to-pink-500",
      icon: "📱",
      description: "Create native and cross-platform mobile apps"
    },
    {
      title: "Backend Systems",
      problems: 150,
      level: "Intermediate to Advanced",
      color: "from-green-500 to-emerald-500",
      icon: "⚙️",
      description: "Design scalable APIs and database systems"
    },
    {
      title: "Data Science",
      problems: 95,
      level: "Advanced",
      color: "from-orange-500 to-red-500",
      icon: "📊",
      description: "Analyze data and build ML models"
    }
  ];

  return (
    <div className="min-h-screen pt-[80px] bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Build Your
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {" "}Developer Skills
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Solve real industry problems, gain practical experience, and create a portfolio 
              that makes you stand out to employers
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to={"/problems"} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105">
                Start Solving Problems
                <ArrowRight className="inline ml-2 w-5 h-5" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose Synergy Solver?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get hands-on experience with real problems and build the skills employers are looking for
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors">
                <div className="text-purple-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Build Your Experience?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of students who are already building impressive portfolios
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={"/signup"} className="bg-white text-purple-900 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Today
            </Link>
            <Link to="/problems" className="border border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-colors">
              Explore Challenges
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
}

export default Home;