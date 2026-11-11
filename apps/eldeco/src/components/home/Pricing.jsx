import React from "react";
import { CheckCircle, Star, HelpCircle } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "₹2,591",
      period: "/month",
      description:
        "Perfect for individual CAs, finance professionals, and students starting their journey.",
      features: [
        "50 Document Processings /month (Smart Upload System)",
        "AI Extraction & Classification",
        "Bank Statements & Invoices Only",
        "Standard Output Documents",
        "Email Support & Community Access",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Growth",
      price: "₹8,849",
      period: "/month",
      description:
        "Ideal for small-to-mid CA firms and finance teams needing increased efficiency and analytics.",
      features: [
        "Unlimited Document Uploads",
        "Full Cortex AI Processing & Validation",
        "All Supported Document Types (GST, Payroll, Audit)",
        "Advanced Analytics Dashboard",
        "Auto-Generated DOC Reports",
        ],
      cta: "Most Popular",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description:
        "Tailored for large organizations, banks, and major financial institutions requiring integration and scale.",
      features: [
        "ERP System Integrations (Tally, SAP)",
        "Automated Monthly Closings",
        "Realtime Financial Dashboards",
        "Custom Data Output & Secure Storage",
        "Dedicated Account Manager",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-6 tracking-[-0.01em] leading-[1.15]">
          Simple, Transparent Pricing
        </h1>
        <p className="text-base text-[#334155] max-w-2xl mx-auto font-normal leading-[1.6]">
          Choose the plan that automates your financial journey. No hidden fees —
          ever.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-7">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-[14px] overflow-hidden transition-all duration-300 border ${
              plan.popular 
                ? "ring-2 ring-[#1E40AF]/20 border-[#1E40AF]/30 shadow-[0_4px_16px_rgba(30,64,175,0.12)] scale-[1.02] md:scale-[1.05] hover:shadow-[0_8px_32px_rgba(30,64,175,0.18)] hover:-translate-y-1" 
                : "border-[#E5E7EB]/60 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:border-[#E5E7EB] hover:-translate-y-1"
            }`}
          >
            {plan.popular && (
              <div className="absolute pt-10 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <span className="bg-gradient-to-r from-[#1E40AF] to-[#8B5CF6] text-white text-xs font-bold px-4 py-2 rounded-full flex items-center shadow-[0_4px_12px_rgba(30,64,175,0.35)]">
                  <Star className="w-3 h-3 mr-1.5 fill-current" />
                  MOST POPULAR
                </span>
              </div>
            )}

            {plan.popular && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1E40AF] to-[#8B5CF6]"></div>
            )}

            <div className="p-6 pt-12">
              <h3 className="text-xl font-bold text-[#0F172A] mb-3 tracking-[-0.01em] leading-[1.3]">
                {plan.name}
              </h3>
              <p className="text-base text-[#334155] mb-8 leading-[1.6]">{plan.description}</p>

              <div className="flex items-baseline mb-8">
                <span className={`text-4xl md:text-5xl font-extrabold ${
                  plan.popular 
                    ? "bg-gradient-to-r from-[#1E40AF] to-[#8B5CF6] bg-clip-text text-transparent" 
                    : "text-[#0F172A]"
                }`}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-[#64748B] ml-2 font-medium">{plan.period}</span>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 mr-3 ${
                      plan.popular ? "text-[#1E40AF]" : "text-[#22D3EE]"
                    }`} />
                    <span className="text-base text-[#334155] leading-[1.6]">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3.5 px-4 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-[#1E40AF] to-[#8B5CF6] hover:from-[#1E3A8A] hover:to-[#7C3AED] text-white shadow-[0_4px_16px_rgba(30,64,175,0.35)] hover:shadow-[0_8px_24px_rgba(30,64,175,0.45)]"
                    : plan.name === "Enterprise"
                    ? "bg-[#0F172A] hover:bg-[#1E293B] text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)]"
                    : "bg-[#F9FAFB] hover:bg-[#E5E7EB] text-[#0F172A] border border-[#E5E7EB] hover:border-[#E5E7EB]"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
