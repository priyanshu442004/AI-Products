import Hero from "../components/home/Hero";
import FeaturesGrid from "../components/home/FeaturesGrid";
import HowItWorks from "../components/home/HowItWork";
import Footer from "../components/home/Footer";
import FAQ from "../components/home/FAQ";
import Pricing from "../components/home/Pricing";
import Slider from "../components/home/Slider";
import Navbar from "../common/Navbar";


const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/fintech (2).jpg')",
        }}
      >
        {/* Strong base dark overlay for readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(2, 6, 23, 0.72), rgba(2, 6, 23, 0.55))'
          }}
        ></div>
        {/* Subtle brand-tinted gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF]/8 via-transparent to-[#8B5CF6]/8"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <FeaturesGrid />
        <HowItWorks />
        <Slider />
        <Pricing />
        <FAQ />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
