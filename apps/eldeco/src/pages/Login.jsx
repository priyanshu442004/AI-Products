
import  { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { signInWithEmail, signInWithGoogle } from "../firebase/auth";
import { useAuth } from "../firebase/useAuth";
import Navbar from "../common/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, loading: authLoading } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && currentUser) {
      navigate("/dashboard", { replace: true });
    }
  }, [currentUser, authLoading, navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const result = await signInWithEmail(email, password);
    setLoading(false);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Failed to sign in. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const result = await signInWithGoogle();
      
      if (result.success) {
        navigate("/dashboard", { replace: true });
      } else {
        setLoading(false);
        setError(result.error || "Failed to sign in with Google. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return ( <> 
    <Navbar />
    <div className="min-h-screen w-full bg-[#F9FAFB] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl bg-[#FFFFFF] rounded-3xl shadow-premium-xl overflow-hidden border border-[#E5E7EB]">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          
          {/* LEFT SIDE - Branded Section */}
          <div className="relative w-full lg:w-1/2 bg-gradient-to-br from-[#1E40AF] to-[#8B5CF6] p-12 lg:p-16 flex flex-col justify-between overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-10 w-60 h-60 bg-white/8 rounded-full blur-2xl"></div>
            <div className="absolute top-10 left-1/2 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-[-0.01em] leading-[1.15]">
                WELCOME
              </h1>
              <h4 className="text-base md:text-lg text-white/90 font-medium tracking-[-0.01em] mb-6 leading-[1.3]">
                YOUR SMART FINANCE COMPANION
              </h4>
              
              <div className="w-24 h-1 bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] rounded-full mb-8"></div>
              
              <p className="text-white/90 text-base leading-[1.6] max-w-md">
                FinSight helps you analyze, track, and optimize your financial decisions with AI-powered accuracy. 
                Log in to continue managing your insights and personalized dashboards.
              </p>
            </div>
            
            {/* Brand Element */}
            <div className="relative z-10 mt-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/90 text-sm font-medium">AI-Powered Platform</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Login Form */}
          <div className="w-full lg:w-1/2 bg-white p-10 lg:p-14 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-2 tracking-[-0.01em] leading-[1.2]">
                Sign in to your account
              </h1>
              <p className="text-base text-[#475569] leading-[1.6]">
                Access your personalized finance dashboard and insights.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleEmailLogin} className="space-y-5">
              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400 w-5 h-5" />
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

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-[#475569] cursor-pointer hover:text-[#0F172A] transition-colors">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-[#1E40AF] border-[#E5E7EB] rounded focus:ring-[#1E40AF]/50 focus:ring-2 mr-2 cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>
                <a 
                  href="#" 
                  className="text-[#1E40AF] hover:text-[#1E3A8A] font-semibold transition-colors"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-[#1E40AF] to-[#8B5CF6] hover:from-[#1E3A8A] hover:to-[#7C3AED] text-white font-semibold rounded-xl shadow-lg shadow-[#1E40AF]/30 hover:shadow-xl hover:shadow-[#1E40AF]/40 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? "Signing in..." : "Sign in"}
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

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-3.5 bg-[#FFFFFF] border-2 border-[#E5E7EB] hover:border-[#E5E7EB] text-[#475569] font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FcGoogle className="w-5 h-5" />
              Sign in with Google
            </button>

            {/* Sign Up Link */}
            <p className="mt-8 text-center text-sm text-[#475569]">
              Don't have an account?{" "}
              <Link 
                to="/signup" 
                className="text-[#2563EB] hover:text-[#1d4ed8] font-semibold underline decoration-2 underline-offset-4 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default Login;
