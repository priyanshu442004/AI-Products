// import { BarChart3, ShieldCheck, PieChart, Sparkles } from "lucide-react";

// export default function Features() {
//   const features = [
//     {
//       title: "Smart Financial Insights",
//       desc: "Get AI-powered analytics to understand your spending, investments, and savings patterns.",
//       icon: <BarChart3 className="w-10 h-10 text-blue-600" />,
//     },
//     {
//       title: "Secure & Encrypted",
//       desc: "Your data is fully protected with enterprise-grade encryption and secure authentication.",
//       icon: <ShieldCheck className="w-10 h-10 text-green-600" />,
//     },
//     {
//       title: "Investment Tracking",
//       desc: "Track your mutual funds, stocks, SIPs, and returns — all in one dashboard.",
//       icon: <PieChart className="w-10 h-10 text-purple-600" />,
//     },
//     {
//       title: "AI Recommendations",
//       desc: "FinSight suggests personalised financial improvements based on your profile.",
//       icon: <Sparkles className="w-10 h-10 text-yellow-500" />,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-800 px-6 md:px-16 py-16">
      
//       {/* Hero Section */}
//       <div className="text-center max-w-3xl mx-auto mb-16">
//         <h1 className="text-4xl font-bold text-blue-700">
//           Powerful Features to Level Up Your Finances
//         </h1>
//         <p className="mt-4 text-gray-600 text-lg">
//           FinSight helps you make smarter financial decisions with clean dashboards,  
//           real-time insights, and AI-powered recommendations.
//         </p>
//       </div>

//       {/* Features Grid */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
//         {features.map((f, index) => (
//           <div key={index} className="bg-white shadow-md rounded-xl p-6 border hover:shadow-xl transition">
//             <div className="mb-4">{f.icon}</div>
//             <h3 className="text-xl font-semibold text-gray-900">{f.title}</h3>
//             <p className="mt-2 text-gray-600">{f.desc}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import Navbar from "../common/Navbar";

import {
  BarChart3,
  ShieldCheck,
  Wallet,
  Brain,
  TrendingUp,
  PieChart,
  Sparkles,
  LineChart,
  CreditCard,
} from "lucide-react";

import { Link } from "react-router-dom";


// ================ CORE FEATURES (3 BIG SECTIONS) ==================
const coreFeatures = [
  {
    id: "ai-insights",
    icon: <Brain className="text-blue-600" size={32} />,
    title: "AI-Powered Financial Insights",
    description:
      "Understand your spending, saving, and investment patterns instantly with AI-driven recommendations.",
    details: [
      "Detect overspending patterns with intelligent alerts",
      "Smart saving recommendations based on monthly habits",
      "AI-generated insights shown in clean visual dashboards",
    ],
  },
  {
    id: "investment-tracking",
    icon: <TrendingUp className="text-indigo-600" size={32} />,
    title: "Investment Performance Tracking",
    description:
      "View real-time performance of your stocks, mutual funds, SIPs, and digital assets in one unified dashboard.",
    details: [
      "Track returns across all asset classes",
      "Auto-categorized risk profiles",
      "Monthly & yearly performance graphs",
    ],
  },
  {
    id: "secure-finance",
    icon: <ShieldCheck className="text-green-600" size={32} />,
    title: "Bank-Level Security & Encryption",
    description:
      "Your data stays protected with enterprise-grade encryption & secure authentication protocols.",
    details: [
      "Two-factor & biometrics compatible",
      "Encrypted financial history",
      "Personal data never shared with third parties",
    ],
  },
];


// ================ SUPPORTING FEATURES GRID ==================
const supportingFeatures = [
  {
    icon: <PieChart size={22} />,
    title: "Automated Trial Balance Import",
    description:
      "Upload any Trial Balance file — Excel, CSV, or PDF — and FinSight automatically extracts, validates, and maps your financial data.",
  },
  {
    icon: <LineChart size={22} />,
    title: "Financial Statements Generation",
    description:
      "Instantly convert raw trial balance into full financial statements including Profit & Loss, Balance Sheet, Cash Flow.",
  },
  {
    icon: <Wallet size={22} />,
    title: "Ratio & KPI Analysis",
    description:
      "FinSight automatically calculates key ratios such as Liquidity,Profitability,Efficiency and Leverage so you immediately understand business performance.",
  },
  {
    icon: <CreditCard size={22} />,
    title: "AI-Driven Insights",
    description:
      "Get automated commentary and insights—FinSight explains your financial results in simple language without needing an accountant.",
  },
  {
    icon: <Sparkles size={22} />,
    title: " Variance & Trend Tracking",
    description:
      "Track month-over-month and year-over-year changes with automated trend lines, comparisons, and financial benchmarking.",
  },
  {
    icon: <BarChart3 size={22} />,
    title: "Automated Report Generation",
    description:
      "Download ready-to-share financial reports in PDF & Excel, customized for management and compliance presentations.",
  },
];


const FeaturesPage = () => {
  return ( 
    <> 
        <Navbar />
       
    
    

    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-blue-50/20 to-purple-50/20">

      {/* HERO SECTION */}
      <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#1E40AF]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#8B5CF6]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm text-[#0F172A] text-sm font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#E5E7EB]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22D3EE] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1E40AF]"></span>
            </span>
            Powerful Features
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#0F172A] leading-[1.15] tracking-[-0.01em] mb-6">
            Designed for
            <span className="block mt-3 bg-gradient-to-r from-[#1E40AF] to-[#8B5CF6] bg-clip-text text-transparent">
              Smarter Financial Decisions
            </span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-[#334155] max-w-3xl mx-auto leading-[1.6] mb-10 font-medium">
            FinSight helps you analyze money flow, track investments, and grow 
            your finances using clean dashboards and intelligent automation.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] text-white text-base font-semibold rounded-xl shadow-[0_4px_16px_rgba(30,64,175,0.35)] hover:shadow-[0_8px_24px_rgba(30,64,175,0.45)] transform hover:scale-[1.02] transition-all duration-300"
            >
              Explore Dashboard
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm text-[#0F172A] border-2 border-[#E5E7EB] rounded-xl font-semibold hover:bg-white hover:border-[#1E40AF]/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-200"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>


      {/* CORE FEATURES SECTIONS (3 MAIN FEATURES) */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {coreFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-12 lg:gap-16 mb-24 lg:mb-32 items-center`}
            >
              <div className="md:w-1/2 space-y-6">
                <div className="w-16 h-16 rounded-[14px] bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] flex items-center justify-center mb-6 shadow-[0_4px_12px_rgba(30,64,175,0.15)]">
                  {feature.icon}
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-4 leading-[1.2] tracking-[-0.01em]">
                  {feature.title}
                </h2>

                <p className="text-lg md:text-xl text-[#334155] mb-8 leading-[1.6] font-medium">
                  {feature.description}
                </p>

                <ul className="space-y-4">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-start text-[#334155]">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-[0_2px_8px_rgba(16,185,129,0.25)]">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-base leading-[1.6] font-medium">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Document Preview */}
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] border-2 border-[#E5E7EB] rounded-[20px] w-full max-w-md overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300">
                  {feature.id === "ai-insights" ? (
                    <img 
                      src={`${import.meta.env.BASE_URL}AI powered.png`} 
                      alt="AI-Powered Financial Insights Dashboard Preview" 
                      className="w-full h-auto object-cover"
                    />
                  ) : feature.id === "investment-tracking" ? (
                    <img 
                      src={`${import.meta.env.BASE_URL}Investment.png`} 
                      alt="Investment Performance Tracking Dashboard Preview" 
                      className="w-full h-auto object-cover"
                    />
                  ) : (
                    <div className="h-80 flex items-center justify-center text-[#64748B]">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                          <ShieldCheck className="w-8 h-8 text-[#1E40AF]" />
                        </div>
                        <p className="font-semibold text-[#0F172A]">Security Dashboard Preview</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>  
          ))}

        </div>
      </section>


      {/* SUPPORTING FEATURES GRID */}
      <section className="py-16 md:py-24 lg:py-32 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-4 leading-[1.2] tracking-[-0.01em]">
              More Tools to Grow Your Financial Confidence
            </h2>
            <p className="text-base md:text-lg text-[#64748B] max-w-2xl mx-auto leading-[1.6] font-medium">
              Every feature is crafted to give you clarity, control, 
              and confidence in your personal finance journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {supportingFeatures.map((f, index) => (
              <div
                key={index}
                className="group bg-white p-6 lg:p-8 rounded-[20px] border-2 border-[#E5E7EB] hover:border-[#1E40AF]/30 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(30,64,175,0.12)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] flex items-center justify-center text-[#1E40AF] flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_2px_8px_rgba(30,64,175,0.15)]">
                    {f.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#0F172A] mb-2 text-lg leading-[1.3]">{f.title}</h3>
                    <p className="text-sm text-[#64748B] leading-[1.6]">{f.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      
    </div>
  </>);
};

export default FeaturesPage;
