import React from 'react';
import { 
  Upload, 
  Cpu, 
  Eye, 
  Download,
  ChevronRight
} from 'lucide-react';

const HowItWorks = () => {

  const steps = [
    {
      number: "01",
      icon: <Upload className="w-12 h-12 text-[#1E40AF]" />,
      title: "Sales MIS",
      description: "Drag & drop or select your financial documents",
      bgColor: "bg-[#1E40AF]/10",
      borderColor: "border-[#1E40AF]/30"
    },
    {
      number: "02",
      icon: <Cpu className="w-12 h-12 text-[#8B5CF6]" />,
      title: "AI Processes",
      description: "Smart AI extracts and analyzes your data",
      bgColor: "bg-[#8B5CF6]/10",
      borderColor: "border-[#8B5CF6]/30"
    },
    {
      number: "03",
      icon: <Eye className="w-12 h-12 text-[#22D3EE]" />,
      title: "Review Results",
      description: "Verify and edit the extracted information",
      bgColor: "bg-[#22D3EE]/10",
      borderColor: "border-[#22D3EE]/30"
    },
    {
      number: "04",
      icon: <Download className="w-12 h-12 text-[#8B5CF6]" />,
      title: "Export Output",
      description: "Download structured data in your preferred format",
      bgColor: "bg-[#8B5CF6]/10",
      borderColor: "border-[#8B5CF6]/30"
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4 tracking-[-0.01em] leading-[1.2]">
            How It Works
          </h2>
          <p className="mt-4 text-base text-[#334155] max-w-2xl mx-auto font-normal leading-[1.6]">
            Transform your documents into actionable insights in just four simple steps
          </p>
        </div>

        {/* Desktop - Horizontal Layout */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting Line - Positioned at circle center (88px = half of 176px circle) */}
            <div className="absolute top-[88px] left-0 right-0 h-0.5 bg-gradient-to-r from-[#1E40AF]/30 via-[#8B5CF6]/30 to-[#22D3EE]/30 rounded-full"></div>
            
            <div className="flex justify-between items-start gap-4">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center relative flex-1">

                  {/* Gradient Circle */}
                  <div className={`w-44 h-44 rounded-full bg-white border-4 ${step.borderColor} shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex items-center justify-center mb-6 relative group-hover:scale-105 transition-transform duration-300 z-10`}>
                    <div className={`w-full h-full rounded-full flex items-center justify-center ${step.bgColor}`}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="text-center px-2">
                    <div className="text-sm font-bold text-[#64748B] mb-2">STEP {step.number}</div>
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-3 tracking-[-0.01em] leading-[1.3]">
                      {step.title}
                    </h3>
                    <p className="text-base text-[#334155] leading-[1.6]">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow - Centered on the connecting line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-[82px] right-0 translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                      <div className="bg-white rounded-full p-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-[#E5E7EB]">
                        <ChevronRight className="w-5 h-5 text-[#8B5CF6]" strokeWidth={2.5} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile - Vertical Layout */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1E40AF]/30 via-[#8B5CF6]/30 to-[#22D3EE]/30 -z-10 rounded-full"></div>
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start">
                  
                  {/* Gradient Circle Mobile */}
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-full bg-white border-4 ${step.borderColor} shadow-lg flex items-center justify-center relative`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step.bgColor}`}>
                        {step.icon}
                      </div>
                    </div>

                    {/* Arrow */}
                    {index < steps.length - 1 && (
                      <div className="absolute left-1/2 top-full -translate-x-1/2 text-[#8B5CF6]/50">
                        <ChevronRight className="w-8 h-8 transform rotate-90" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="ml-6 pt-2 flex-1">
                    <div className="text-xs font-bold text-[#64748B] mb-1">STEP {step.number}</div>
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2 tracking-[-0.01em] leading-[1.3]">
                      {step.title}
                    </h3>
                    <p className="text-base text-[#334155] leading-[1.6]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-[#E5E7EB] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300">
                <div className="flex items-start">
                  
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mr-4 ${step.bgColor} border ${step.borderColor}`}>
                    {step.icon}
                  </div>

                  <div className="flex-1">
                    <div className="text-xs font-bold text-[#64748B] mb-1">
                      STEP {step.number}
                    </div>
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2 tracking-[-0.01em] leading-[1.3]">
                      {step.title}
                    </h3>
                    <p className="text-base text-[#334155] leading-[1.6]">
                      {step.description}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
