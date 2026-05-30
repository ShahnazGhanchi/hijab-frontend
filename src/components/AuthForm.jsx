import { useState } from "react";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import axios from "axios";

// 🚀 Parent component (App.jsx) state control karega, isliye props me setToken receive karenge
const AuthForm = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. .env file se Vercel ka backend URL get karein
      const baseUrl = import.meta.env.VITE_API_URL;
      // 2. Ab local link ki jagah dynamically live URL banayein
      const url = isLogin 
        ? `${baseUrl}/api/auth/login` 
        : `${baseUrl}/api/auth/register`;
      const requestData = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await axios.post(url, requestData);

      if (response.status >= 200 && response.status < 300) {
        const userToken = response.data.token || 
                          (response.data.user && response.data.user.token) || 
                          response.data.jwtToken;

        if (userToken) {
          localStorage.setItem("token", userToken);
          if (setToken) setToken(userToken); // 🚀 Yeh direct App.jsx ko trigger karega dashboard render karne ke liye
        }

        alert(response.data.message || response.data.msg || "Success!");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      const errorMsg = error.response?.data?.msg || error.response?.data?.message || "Kuch garbar ho gayi!";
      alert(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090D16] text-white px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-md p-8 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] z-10">
       <h2 className="text-3xl font-bold text-center mb-2 text-rose-500">
  {isLogin ? "Welcome Back" : "Create Account"}
</h2>
        <p className="text-gray-400 text-sm text-center mb-8">
          {isLogin ? "Enter your details to access your account" : "Join us to experience the luxury dashboard"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block">Username</label>
              <div className="relative flex items-center">
                <User className="absolute left-3.5 w-5 h-5 text-gray-500" />
                <input 
                  type="text" 
                  name="username" 
                  value={formData.username} 
                  onChange={handleChange} 
                  className="w-full pl-11 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm text-white placeholder-gray-600"
                  placeholder="shahnaz_ghanchi"
                  required 
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-5 h-5 text-gray-500" />
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full pl-11 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm text-white placeholder-gray-600"
                placeholder="example@domain.com"
                required 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-5 h-5 text-gray-500" />
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                className="w-full pl-11 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm text-white placeholder-gray-600"
                placeholder="••••••••"
                required 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-3 mt-4 font-semibold text-sm text-black bg-rose-500 from-cyan-400 to-blue-500 rounded-xl hover:opacity-95 active:scale-[0.98] transition-all shadow-lg shadow-cyan-500/10 flex items-center justify-center gap-2 group"
          >
            <span>{isLogin ? "Sign In" : "Get Started"}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          {isLogin ? "New to the platform?" : "Already have an account?"}{" "}
          <span 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-rose-500 font-medium hover:underline cursor-pointer transition-all ml-1"
          >
            {isLogin ? "Create an account" : "Log in here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;