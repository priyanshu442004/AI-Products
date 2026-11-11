import React from "react";
import slider1 from "../../assets/slider1.JPG"; // your image
import slider2 from "../../assets/slider2.JPG";
import slider3 from "../../assets/slider3.JPG";
import slider4 from "../../assets/slider4.JPG";
import slider5 from "../../assets/slider5.JPG";
import slider6 from "../../assets/slider6.JPG";
import slider7 from "../../assets/slider7.JPG";

export default function LogoSlider() {
  const logos = [slider1, slider2, slider3, slider4, slider5, slider6, slider7];

  return (
    <section className="w-full py-20 lg:py-24 overflow-hidden bg-[#F9FAFB]">
      <div className="mb-16 lg:mb-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[#0F172A] leading-snug font-bold text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em]">
          Trusted by 1000+ CA firms and enterprise finance teams{" "}
          <span className="block md:inline">for high-volume processing.</span>
        </p>
      </div>
      <div className="slider-track">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`logo-${index}`}
            className="h-20 sm:h-24 w-auto object-contain mx-8 sm:mx-12 inline-block opacity-80 hover:opacity-100 transition-opacity"
          />
        ))}

        {/* Duplicate for smooth infinite loop */}
        {logos.map((logo, index) => (
          <img
            key={`dup-${index}`}
            src={logo}
            alt={`logo-duplicate-${index}`}
            className="h-20 sm:h-24 w-auto object-contain mx-8 sm:mx-12 inline-block opacity-80 hover:opacity-100 transition-opacity"
          />
        ))}
      </div>
    </section>
  );
}
