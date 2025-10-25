import React from 'react';
import { Award, TrendingUp, Users, Globe, Briefcase, Target, Building2, Zap } from 'lucide-react';

const About = () => {
  const achievements = [
    {
      icon: Award,
      title: 'Industry Recognition',
      description: 'Top 10 VC Firm - Forbes 2024',
      details: 'Recognized for consistent performance and innovation in investment strategies'
    },
    {
      icon: TrendingUp,
      title: 'Proven Returns',
      description: '35% Average IRR',
      details: 'Consistently outperforming market benchmarks across all investment cycles'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: '50+ Investment Professionals',
      details: 'Diverse team of industry veterans with deep sector expertise'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'International Presence',
      details: 'Strategic offices in New York, London, Singapore, and Silicon Valley'
    }
  ];

  const focusAreas = [
    {
      icon: Zap,
      title: 'Artificial Intelligence',
      description: 'Machine learning, automation, and AI-driven solutions',
      companies: '25+ portfolio companies'
    },
    {
      icon: Building2,
      title: 'Healthcare Innovation',
      description: 'Digital health, biotech, and medical device technologies',
      companies: '20+ portfolio companies'
    },
    {
      icon: Briefcase,
      title: 'Financial Technology',
      description: 'Digital banking, payments, and blockchain solutions',
      companies: '30+ portfolio companies'
    },
    {
      icon: Target,
      title: 'Clean Energy',
      description: 'Renewable energy, sustainability, and green technology',
      companies: '15+ portfolio companies'
    }
  ];

  const leadership = [
    {
      name: 'Sarah Chen',
      role: 'Managing Partner',
      experience: '20+ years in venture capital',
      background: 'Former Goldman Sachs, Harvard MBA'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Senior Partner',
      experience: '18+ years in private equity',
      background: 'Former McKinsey, Stanford MBA'
    },
    {
      name: 'Emily Johnson',
      role: 'Investment Director',
      experience: '15+ years in growth equity',
      background: 'Former Bain Capital, Wharton MBA'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main About Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
<h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-300 via-amber-500 to-orange-600 text-transparent bg-clip-text mb-8">
  About StartupMVP
</h2>


            <p className="text-black text-lg leading-relaxed mb-6">
              With over two decades of experience in venture capital and private equity, Quantum Capital has established itself as a premier investment firm focused on identifying and nurturing the next generation of market leaders.
            </p>
            <p className="text-black text-lg leading-relaxed mb-8">
              Our team of seasoned professionals brings deep industry expertise and a proven track record of successful exits, having generated over $8B in realized returns for our investors across multiple economic cycles.
            </p>
            
            {/* Key Differentiators */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-black rounded-full"></div>
                <span className="text-blue-800 font-medium">Data-driven investment decisions</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-black rounded-full"></div>
                <span className="text-blue-800 font-medium">Hands-on value creation approach</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-black rounded-full"></div>
                <span className="text-blue-800 font-medium">Global network of industry experts</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-black rounded-full"></div>
                <span className="text-blue-800 font-medium">ESG-focused investment framework</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-yellow-50 rounded-2xl p-6 border border-yellow-100 hover:yellow-blue-300 transition-colors group">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:bg-black transition-colors">
                    <achievement.icon className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-black font-semibold text-lg mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-black font-medium mb-2">
                      {achievement.description}
                    </p>
                    <p className="text-black text-sm">
                      {achievement.details}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Focus Areas */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-black mb-4">
              Investment Focus Areas
            </h3>
            <p className="text-black text-lg max-w-3xl mx-auto">
              We concentrate our investments in high-growth sectors where we have deep expertise and can add significant value.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {focusAreas.map((area, index) => (
              <div key={index} className="text-center p-6 bg-yellow-50 rounded-2xl border border-yellow-100 hover:border-yellow-300 hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-black transition-colors">
                  <area.icon className="text-white" size={28} />
                </div>
                <h4 className="text-black font-semibold text-lg mb-3">
                  {area.title}
                </h4>
                <p className="text-black text-sm mb-3 leading-relaxed">
                  {area.description}
                </p>
                <div className="text-black font-medium text-sm">
                  {area.companies}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="bg-gradient-to-r from-black to-black rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Leadership Team</h3>
            <p className="group px-8 py-4 font-bold bg-gradient-to-r from-yellow-300 via-amber-500 to-orange-600 text-transparent bg-clip-text hover:bg-black hover:text-white rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl">
              Our experienced leadership team brings decades of investment expertise and industry knowledge.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <div key={index} className="text-center group px-8 py-4 font-bold bg-white/10 hover:bg-gradient-to-r from-yellow-300 via-amber-500 to-orange-600 text-black hover:text-white text-lg shadow-lg hover:shadow-xl rounded-2xl p-6 backdrop-blur-sm hover:bg-white/20 transition-colors hover:animate-pulse">
                <div className="w-20 h-20 bg- rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="text-yellow-100 hover:text-white" size={32} />
                </div>
                <h4 className="text-xl font-bold mb-2">{leader.name}</h4>
                <p className="text-black font-semibold mb-2">{leader.role}</p>
                <p className="text-black text-sm mb-2">{leader.experience}</p>
                <p className="text-black text-sm">{leader.background}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Company Values */}
        <div className="mt-20 text-center">
  <h3 className="text-3xl font-bold text-black mb-8">Our Values</h3>
  <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
    <div className="p-6">
      <div className="w-12 h-12 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
        <Target className="text-white" size={24} />
      </div>
      <h4 className="text-blue-900 font-semibold text-lg mb-3">Excellence</h4>
      <p className="text-black">
        We strive for excellence in every investment decision and partnership.
      </p>
    </div>
    <div className="p-6">
      <div className="w-12 h-12 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
        <Globe className="text-white" size={24} />
      </div>
      <h4 className="text-blue-900 font-semibold text-lg mb-3">Integrity</h4>
      <p className="text-black">
        Our work is grounded in transparency, trust, and strong ethical principles.
      </p>
    </div>
    <div className="p-6">
      <div className="w-12 h-12 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
        <Zap className="text-white" size={24} />
      </div>
      <h4 className="text-blue-900 font-semibold text-lg mb-3">Innovation</h4>
      <p className="text-black">
        We support disruptive ideas that redefine industries and push boundaries.
      </p>
    </div>
  </div>
  </div>
      </div>
    </section>
  );
};

export default About;
