import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { signUpWithEmail, signInWithGoogle } from "../firebase/auth";
import Navbar from "../common/Navbar";

const Signup = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const result = await signUpWithEmail(email, password, fullName);
    setLoading(false);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Failed to create account. Please try again.");
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);

    try {
      const result = await signInWithGoogle();
      
      if (result.success) {
        navigate("/dashboard", { replace: true });
      } else {
        setLoading(false);
        setError(result.error || "Failed to sign up with Google. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return ( 
     <> 
        <Navbar />
  
    
    
    
    <div className="min-h-screen w-full bg-[#F9FAFB] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl bg-[#FFFFFF] rounded-3xl shadow-premium-xl overflow-hidden border border-[#E5E7EB]">
        <div className="flex flex-col lg:flex-row min-h-[700px]">
          
          {/* LEFT SIDE - Branded Section */}
          <div className="relative w-full lg:w-1/2 bg-gradient-to-br from-[#1E40AF] to-[#8B5CF6] p-12 lg:p-16 flex flex-col justify-between overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-10 w-60 h-60 bg-white/8 rounded-full blur-2xl"></div>
            <div className="absolute top-10 left-1/2 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-[-0.01em] leading-[1.15]">
                CREATE YOUR<br />FINSIGHT ACCOUNT
              </h1>
              
              <div className="w-24 h-1 bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] rounded-full mb-8"></div>
              
              <p className="text-white/90 text-base leading-[1.6] max-w-md font-medium">
                Sign up to access insights, dashboards, and smart planning tools.
              </p>
            </div>
            
            {/* Brand Element */}
            <div className="relative z-10 mt-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/90 text-sm font-medium">Start Your Journey Today</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Signup Form */}
          <div className="w-full lg:w-1/2 bg-white p-10 lg:p-14 flex flex-col justify-center overflow-y-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-2 tracking-[-0.01em] leading-[1.2]">
                Sign Up
              </h1>
              <p className="text-base text-[#475569] leading-[1.6]">
                Create your account to get started
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleEmailSignup} className="space-y-4">
              {/* Full Name Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400 w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/50 focus:border-[#1E40AF] transition-all duration-200"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400 w-5 h-5" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/50 focus:border-[#1E40AF] transition-all duration-200"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400 w-5 h-5" />
                </div>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-24 py-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/50 focus:border-[#1E40AF] transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#1E40AF] hover:text-[#1E3A8A] font-semibold text-sm transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span className="ml-2">{showPass ? "HIDE" : "SHOW"}</span>
                </button>
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400 w-5 h-5" />
                </div>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-24 py-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/50 focus:border-[#1E40AF] transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#1E40AF] hover:text-[#1E3A8A] font-semibold text-sm transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span className="ml-2">{showConfirm ? "HIDE" : "SHOW"}</span>
                </button>
              </div>

              {/* Create Account Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-3.5 bg-gradient-to-r from-[#1E40AF] to-[#8B5CF6] hover:from-[#1E3A8A] hover:to-[#7C3AED] text-white font-semibold rounded-xl shadow-lg shadow-[#1E40AF]/30 hover:shadow-xl hover:shadow-[#1E40AF]/40 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#64748B] font-semibold">OR</span>
              </div>
            </div>

            {/* Google Signup Button */}
            <button
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full py-3.5 bg-[#FFFFFF] border-2 border-[#E5E7EB] hover:border-[#1E40AF]/30 text-[#334155] font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FcGoogle className="w-5 h-5" />
              Sign up with Google
            </button>

            {/* Sign In Link */}
            <p className="mt-8 text-center text-sm text-[#64748B]">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-[#1E40AF] hover:text-[#1E3A8A] font-semibold underline decoration-2 underline-offset-4 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
 </>  );
};

export default Signup;
