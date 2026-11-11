import React from "react";
import { CheckCircle, Star, HelpCircle } from "lucide-react";
import Navbar from "../common/Navbar";

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
    <> 
        <Navbar />
    
    
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-10">
          Simple, Transparent Pricing for Financial Intelligence
        </h1>
        <p className="text-lg text-gray-800 max-w-2xl mx-auto">
          Choose the plan that automate your learning journey. No hidden fees —
          ever.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
              plan.popular ? "ring-2 ring-[#105472] scale-[1.02]" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute pt-9 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-[#105472] text-white text-xs font-bold px-4 py-1 rounded-full flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  MOST POPULAR
                </span>
              </div>
            )}

            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {plan.name}
              </h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-extrabold text-gray-900">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-gray-500 ml-2">{plan.period}</span>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-4 rounded-xl font-semibold transition-colors ${
                  plan.popular
                    ? "bg-[#105472] hover:bg-[#06b6d4] text-white"
                    : plan.name === "Enterprise"
                    ? "bg-gray-800 hover:bg-gray-900 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>);
};

export default Pricing;
