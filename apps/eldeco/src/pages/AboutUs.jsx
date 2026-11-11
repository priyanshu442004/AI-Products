import Navbar from "../common/Navbar";
import { 
  Target, 
  Users, 
  Zap, 
  Shield, 
  TrendingUp,
  FileText,
  Brain,
  CheckCircle
} from "lucide-react";
import logo from "../assets/eldeco.png";

const AboutUs = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Our Mission",
      description: "To revolutionize financial document processing by making it faster, more accurate, and accessible to businesses of all sizes."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Innovation",
      description: "We leverage cutting-edge AI technology to automate tedious financial workflows and free up time for strategic decision-making."
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Security First",
      description: "Your financial data is encrypted end-to-end and processed with enterprise-grade security standards."
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Customer Focus",
      description: "We're committed to understanding your needs and continuously improving our platform based on your feedback."
    }
  ];

  const features = [
    "AI-powered document extraction with 95-99% accuracy",
    "Support for multiple formats: PDF, Excel, CSV, and images",
    "Real-time processing and analysis",
    "Secure cloud-based infrastructure",
    "Export to Excel, CSV, JSON, and ERP integrations",
    "Comprehensive financial insights and reporting"
  ];

  return (  <> 
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-blue-50/20 to-purple-50/20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#1E40AF]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#8B5CF6]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1E40AF]/20 via-[#8B5CF6]/20 to-[#22D3EE]/20 blur-xl opacity-50"></div>
                <div className="relative p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#E5E7EB] shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                  <img src={logo} alt="FinSight Logo" className="h-16 w-16 lg:h-20 lg:w-20" />
                </div>
              </div>
            </div>

            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm text-[#0F172A] text-sm font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#E5E7EB]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22D3EE] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1E40AF]"></span>
              </span>
              Our Story
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#0F172A] mb-6 leading-[1.15] tracking-[-0.01em]">
              About FinSight
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-[#334155] max-w-3xl mx-auto leading-[1.6] font-medium">
              Transforming financial document processing with intelligent automation
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] border-2 border-[#E5E7EB] p-8 md:p-12 lg:p-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-8 tracking-[-0.01em] leading-[1.2]">
              Our Story
            </h2>
            <div className="space-y-6 text-base md:text-lg text-[#334155] leading-[1.7] font-normal">
              <p>
                FinSight was born from a simple observation: finance teams spend countless hours 
                manually processing documents, extracting data, and reconciling financial records. 
                This tedious work not only consumes valuable time but also introduces human error 
                that can have significant consequences.
              </p>
              <p>
                We set out to change that. By combining advanced artificial intelligence with 
                intuitive design, FinSight automates the entire financial document processing 
                workflow—from extraction to analysis to reporting. What used to take hours now 
                takes minutes, with accuracy rates of 95-99%.
              </p>
              <p>
                Today, FinSight serves businesses across industries, helping finance teams 
                focus on what matters most: strategic analysis and decision-making. We're 
                committed to making financial intelligence accessible, secure, and effortless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 lg:py-32 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-4 tracking-[-0.01em] leading-[1.2]">
              Our Values
            </h2>
            <p className="text-base md:text-lg text-[#64748B] max-w-2xl mx-auto leading-[1.6] font-medium">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white rounded-[20px] p-7 lg:p-8 shadow-[0_4px_12px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] border-2 border-[#E5E7EB] hover:border-[#1E40AF]/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-6 w-14 h-14 rounded-xl bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                  {value.icon}
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-[#0F172A] mb-4 tracking-[-0.01em] leading-[1.3]">
                  {value.title}
                </h3>
                <p className="text-[#64748B] leading-[1.6] font-medium">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] border-2 border-[#E5E7EB] p-8 md:p-12 lg:p-16">
            <div className="flex items-center gap-4 mb-10 lg:mb-12">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] flex items-center justify-center shadow-[0_4px_12px_rgba(30,64,175,0.15)]">
                <Brain className="w-7 h-7 text-[#1E40AF]" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-[-0.01em] leading-[1.2]">
                What We Offer
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start group">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center mr-4 mt-1 flex-shrink-0 shadow-[0_2px_8px_rgba(16,185,129,0.25)] group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-[#334155] text-base md:text-lg leading-[1.7] font-medium flex-1">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] flex items-center justify-center mx-auto mb-6 shadow-[0_4px_12px_rgba(30,64,175,0.15)]">
              <TrendingUp className="w-8 h-8 lg:w-10 lg:h-10 text-[#1E40AF]" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-6 tracking-[-0.01em] leading-[1.2]">
              Powered by Advanced AI
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-[#64748B] max-w-3xl mx-auto leading-[1.7] font-medium">
              Our Cortex AI engine uses machine learning and natural language processing 
              to understand, extract, and analyze financial documents with unprecedented 
              accuracy and speed.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 lg:py-40 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E40AF] via-[#7C3AED] to-[#8B5CF6]"></div>
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-8 shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
            <FileText className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.2] tracking-[-0.01em]">
            Ready to Transform Your Financial Workflow?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 leading-[1.7] font-medium max-w-2xl mx-auto">
            Join thousands of businesses already using FinSight to streamline their 
            financial operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`${import.meta.env.BASE_URL}signup`}
              className="group inline-flex items-center justify-center gap-2 bg-white text-[#1E40AF] px-8 py-4 rounded-xl font-semibold hover:bg-[#F8FAFC] shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)] transform hover:scale-[1.02] transition-all duration-300"
            >
              Get Started Free
            </a>
            <a
              href={`${import.meta.env.BASE_URL}pricing`}
              className="group inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/80 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 hover:border-white backdrop-blur-sm transition-all duration-300 transform hover:scale-[1.02]"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </div>
  </>);
};

export default AboutUs;


