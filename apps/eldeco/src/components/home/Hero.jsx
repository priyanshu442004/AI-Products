import React from "react";
import { Link } from "react-router-dom";
import { Upload, ArrowRight } from "lucide-react";
import { TypingText } from "../ui/TypingText";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[90vh] bg-transparent overflow-visible">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#1E40AF]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#8B5CF6]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#22D3EE]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 overflow-visible">
        <div className="flex flex-col items-center justify-center text-center overflow-visible">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-sm text-[#0F172A] text-sm font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-[#E5E7EB]/80">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22D3EE] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1E40AF]"></span>
            </span>
            AI-Powered Financial Intelligence
          </div>

          {/* Text Content Container */}
          <div className="w-full max-w-[1000px] mx-auto px-4 overflow-visible">
            {/* Main Heading */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center tracking-[0.01em]"
              style={{
                wordBreak: 'normal',
                overflowWrap: 'normal',
                hyphens: 'none',
                whiteSpace: 'normal',
                overflow: 'visible',
                height: 'auto',
                maxHeight: 'none',
                lineHeight: '1.25',
                paddingTop: '0.5em',
                paddingBottom: '0.5em',
                transform: 'none'
              }}
            >
              <TypingText
                as="span"
                className="text-[#F8FAFC] font-bold block"
                fontSize="text-4xl md:text-5xl lg:text-6xl"
                fontWeight="font-bold"
                color="text-[#F8FAFC]"
                letterSpacing="tracking-[0.01em]"
                align="center"
                delay={0.1}
                duration={0.8}
              >
                Transform Your Financial
              </TypingText>
              <TypingText
                as="span"
                className="block mt-0.2 font-bold"
                fontSize="text-4xl md:text-5xl lg:text-6xl"
                fontWeight="font-bold"
                letterSpacing="tracking-[0.01em]"
                align="center"
                delay={1.0}
                duration={0.8}
                style={{
                  background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  wordBreak: 'normal',
                  overflowWrap: 'normal',
                  hyphens: 'none',
                  whiteSpace: 'normal'
                }}
              >
                Documents Instantly
              </TypingText>
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-lg text-[#CBD5E1] mb-8 text-left leading-[1.8] font-medium opacity-90">
              Upload your documents and let our AI extract, analyze, and organize your financial data with 
              <span className="font-semibold text-[#E2E8F0]"> unprecedented accuracy</span>
            </p>
          </div>

          {/* CTA Button - Primary action with strong visual dominance */}
          <Link
            to="/login"
            className="group inline-flex items-center gap-3 px-10 py-4.5 text-white text-lg font-semibold rounded-xl transform hover:scale-[1.05] transition-all duration-300 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
              boxShadow: '0 20px 40px rgba(37, 99, 235, 0.45)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 24px 48px rgba(37, 99, 235, 0.55), 0 0 0 4px rgba(37, 99, 235, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.45)';
            }}
          >
            <Upload className="w-6 h-6 relative z-10" />
            <span className="relative z-10">Upload Your Documents</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
          </Link>

          {/* Additional Info */}
          <p className="mt-8 text-sm text-[#CBD5E1] font-semibold opacity-90">
            New to FinSight?{" "}
            <Link 
              to="/signup" 
              className="text-[#93C5FD] hover:text-[#60A5FA] font-bold underline decoration-2 underline-offset-4 transition-all duration-200 hover:underline-offset-2 hover:decoration-[#60A5FA]"
            >
              Create an account
            </Link>
            {" "}to get started
          </p>

          {/* Stats or Features Preview - Refined for better contrast */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-4xl">
            <div className="bg-white/90 backdrop-blur-md rounded-[14px] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-[#E5E7EB]/80 hover:border-[#E5E7EB] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:-translate-y-1">
              <div className="text-4xl font-bold text-[#1E40AF] mb-2">99.9%</div>
              <div className="text-[#475569] text-sm font-semibold">Accuracy Rate</div>
            </div>
            <div className="bg-white/90 backdrop-blur-md rounded-[14px] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-[#E5E7EB]/80 hover:border-[#E5E7EB] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:-translate-y-1">
              <div className="text-4xl font-bold text-[#8B5CF6] mb-2">&lt;30s</div>
              <div className="text-[#475569] text-sm font-semibold">Processing Time</div>
            </div>
            <div className="bg-white/90 backdrop-blur-md rounded-[14px] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-[#E5E7EB]/80 hover:border-[#E5E7EB] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:-translate-y-1">
              <div className="text-4xl font-bold text-[#22D3EE] mb-2">1000+</div>
              <div className="text-[#475569] text-sm font-semibold">Trusted Users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#64748B] rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-[#1E40AF] rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
