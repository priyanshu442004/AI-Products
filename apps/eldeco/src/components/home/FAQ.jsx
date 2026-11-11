import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import faq from "../../assets/faq.png"; // your FAQ background image

const faqData = [
  {
    question: "What does FinSight do?",
    answer:
      "FinSight automates financial data extraction from documents such as bank statements, invoices, GST files, payroll reports, and audit papers—converting them into structured, analysis-ready outputs.",
  },
  {
    question: "Which document formats are supported?",
    answer:
      "FinSight supports PDF, Excel, CSV, and scanned images. You can upload individual files or bulk batches for processing.",
  },
  {
    question: "How accurate is the data extraction?",
    answer:
      "Our Cortex AI achieves 95–99% accuracy on most document types, highlighting low-confidence areas for quick human review.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Yes. All documents are encrypted end-to-end and processed securely. We adhere to enterprise-grade data privacy standards.",
  },
  {
    question: "Can FinSight export data into Tally or Excel?",
    answer:
      "Absolutely. You can export results to Excel, CSV, JSON, or integrate directly with ERP tools like Tally, Zoho, and SAP.",
  },
];

export default function FAQExact() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleQuestion = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-start">
      {/* Background image */}
      <img
        src={faq}
        alt="FAQ background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay with fintech theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF]/60 via-[#8B5CF6]/50 to-[#22D3EE]/40"></div>

      {/* Content container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-28">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.01em] leading-[1.2] mb-4">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto mt-5 w-24 h-1.5 bg-[#22D3EE] rounded-full"></div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqData.map((item, i) => (
            <div key={i} className="rounded-[14px] overflow-hidden">
              <button
                onClick={() => toggleQuestion(i)}
                className={`w-full flex items-center justify-between px-6 py-5 rounded-[14px] bg-white/95 backdrop-blur-md border transition-all duration-300 text-left ${
                  openIndex === i 
                    ? "border-[#1E40AF]/30 shadow-[0_4px_16px_rgba(30,64,175,0.12)]" 
                    : "border-[#E5E7EB]/60 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:border-[#E5E7EB] hover:-translate-y-0.5"
                }`}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className={`font-semibold text-base pr-4 leading-[1.4] ${
                  openIndex === i ? "text-[#1E40AF]" : "text-[#0F172A]"
                }`}>
                  {item.question}
                </span>
                <div className={`flex-shrink-0 transition-transform duration-300 ${
                  openIndex === i ? "text-[#1E40AF] rotate-180" : "text-[#64748B]"
                }`}>
                  <ChevronDown size={24} />
                </div>
              </button>

              <div
                id={`faq-answer-${i}`}
                className={`transition-all duration-300 ${
                  openIndex === i
                    ? "opacity-100 mt-2"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
                style={openIndex === i ? { maxHeight: 'none' } : {}}
              >
                <div className="px-6 pb-4">
                  <p className="text-base text-[#334155] bg-[#1E40AF]/5 rounded-[14px] px-5 py-4 leading-[1.6] border border-[#1E40AF]/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
