import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Home, Sparkles, DollarSign, Info } from "lucide-react";
import logo from "../assets/eldeco.png";
import { useAuth } from "../firebase/useAuth";
import { DynamicNavigation } from "../components/ui/DynamicNavigation";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Map route paths to navigation IDs
  const getActiveLinkId = () => {
    const path = location.pathname;
    if (path === "/" || path === "") return "home";
    if (path === "/features") return "features";
    if (path === "/pricing") return "pricing";
    if (path === "/about") return "about";
    return null;
  };

  // Navigation links for DynamicNavigation
  const navLinks = [
    {
      id: "home",
      label: "Home",
      href: "/",
      icon: <Home className="w-4 h-4" />,
    },
    {
      id: "features",
      label: "Features",
      href: "/features",
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      id: "pricing",
      label: "Pricing",
      href: "/pricing",
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      id: "about",
      label: "About",
      href: "/about",
      icon: <Info className="w-4 h-4" />,
    },
  ];

  // Auth buttons component
  const authButtons = !loading && (
    <>
      {currentUser ? (
        <Link
          to="/dashboard"
          className="bg-gradient-to-r from-[#1E40AF] to-[#8B5CF6] hover:from-[#1E3A8A] hover:to-[#7C3AED] text-white px-7 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-[#1E40AF]/30 hover:shadow-xl hover:shadow-[#8B5CF6]/40 transform hover:scale-105 transition-all duration-300"
        >
          Dashboard
        </Link>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-[#334155] hover:text-[#1E40AF] px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-[#F9FAFB]"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="relative bg-gradient-to-r from-[#1E40AF] to-[#8B5CF6] hover:from-[#1E3A8A] hover:to-[#7C3AED] text-white px-8 py-3 rounded-xl text-sm font-bold shadow-xl shadow-[#1E40AF]/40 hover:shadow-2xl hover:shadow-[#8B5CF6]/50 transform hover:scale-105 transition-all duration-300 before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 overflow-hidden"
          >
            <span className="relative z-10">Get Started</span>
          </Link>
        </div>
      )}
    </>
  );

  // Mobile menu items
  const mobileMenuItems = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `block px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
            isActive
              ? "text-[#1E40AF] bg-[#1E40AF]/10 shadow-sm"
              : "text-[#334155] hover:text-[#1E40AF] hover:bg-[#F9FAFB]"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/features"
        onClick={() => {}}
        className={({ isActive }) =>
          `block px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
            isActive
              ? "text-[#1E40AF] bg-[#1E40AF]/10 shadow-sm"
              : "text-[#334155] hover:text-[#1E40AF] hover:bg-[#F9FAFB]"
          }`
        }
      >
        Features
      </NavLink>

      <NavLink
        to="/pricing"
        onClick={() => {}}
        className={({ isActive }) =>
          `block px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
            isActive
              ? "text-[#1E40AF] bg-[#1E40AF]/10 shadow-sm"
              : "text-[#334155] hover:text-[#1E40AF] hover:bg-[#F9FAFB]"
          }`
        }
      >
        Pricing
      </NavLink>

      <NavLink
        to="/about"
        onClick={() => {}}
        className={({ isActive }) =>
          `block px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
            isActive
              ? "text-[#1E40AF] bg-[#1E40AF]/10 shadow-sm"
              : "text-[#334155] hover:text-[#1E40AF] hover:bg-[#F9FAFB]"
          }`
        }
      >
        About Us
      </NavLink>

      {!loading && (
        <>
          {currentUser ? (
            <Link
              to="/dashboard"
              className="block w-full text-center mt-4 bg-gradient-to-r from-[#1E40AF] to-[#8B5CF6] hover:from-[#1E3A8A] hover:to-[#7C3AED] text-white px-4 py-3.5 rounded-xl text-base font-semibold shadow-lg shadow-[#1E40AF]/30 transition-all duration-300"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-3.5 rounded-xl text-base font-medium text-[#334155] hover:text-[#1E40AF] hover:bg-[#F9FAFB] transition-all duration-200"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="block w-full text-center mt-4 bg-gradient-to-r from-[#1E40AF] to-[#8B5CF6] hover:from-[#1E3A8A] hover:to-[#7C3AED] text-white px-4 py-3.5 rounded-xl text-base font-bold shadow-xl shadow-[#1E40AF]/40 hover:shadow-2xl transition-all duration-300"
              >
                Get Started
              </Link>
            </>
          )}
        </>
      )}
    </>
  );

  return (
    <DynamicNavigation
      links={navLinks}
      activeLink={getActiveLinkId()}
      logo={logo}
      logoText="ELDECO"
      logoSubtext="Financial Intelligence"
      authButtons={authButtons}
      mobileMenuItems={mobileMenuItems}
      scrolled={scrolled}
      backgroundColor="rgba(255, 255, 255, 0.95)"
      textColor="#0F172A"
      highlightColor="rgba(30, 64, 175, 0.1)"
      glowIntensity={3}
      className=""
      showLabelsOnMobile={false}
      enableRipple={true}
    />
  );
};

export default Navbar;
