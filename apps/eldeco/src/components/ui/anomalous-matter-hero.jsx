import React from "react";

export function AnomalousMatterHero({
  title = "FinSight AI: Financial Intelligence",
  subtitle = "Transform your financial documents into actionable insights.",
  description = "Experience the future of financial document processing. Our AI-powered platform extracts, analyzes, and transforms your financial data with unprecedented accuracy and speed.",
}) {
  return (
    <section
      role="banner"
      className="relative w-full min-h-screen bg-white text-gray-900"
    >
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen py-12 text-center">
        <div className="max-w-3xl px-4 animate-fade-in-long">
          <h1 className="text-sm font-mono tracking-widest text-gray-600 uppercase">
            {title}
          </h1>
          <p className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-gray-900">
            {subtitle}
          </p>
          <p className="mt-6 max-w-xl mx-auto text-base leading-relaxed text-gray-700">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

