import { ShoppingBag, User, Search, Menu, LogOut } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  
  // 1. Check if token exists
  const token = localStorage.getItem("token");

  // 2. Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); 
  };

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between bg-slate-900/80 backdrop-blur-lg border-b border-b-white/10">
      
      {/* Logo Area */}
      <div className="text-2xl font-serif font-bold text-rose-400 tracking-wider cursor-pointer" onClick={() => navigate("/")}>
        ANAS <span className="text-white font-light">HIJABS</span>
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-8 text-gray-300 font-medium">

  <li>
    <Link
      to="/home"
      className="hover:text-rose-400 transition-colors"
    >
      Home
    </Link>
  </li>

  <li>
    <Link
      to="/products"
      className="hover:text-rose-400 transition-colors"
    >
      Products
    </Link>
  </li>

  <li>
    <Link
      to="/about"
      className="hover:text-rose-400 transition-colors"
    >
      About Us
    </Link>
  </li>

</ul>

      {/* Action Icons */}
      <div className="flex items-center gap-5 text-gray-300">
        <Search className="w-5 h-5 hover:text-rose-400 cursor-pointer transition-colors" />
        
        {/* If token exists show Logout icon, else show User profile login icon */}
        {token ? (
          <LogOut className="w-5 h-5 hover:text-rose-400 cursor-pointer transition-colors" onClick={handleLogout} title="Logout" />
        ) : (
          <User className="w-5 h-5 hover:text-rose-400 cursor-pointer transition-colors" onClick={() => navigate("/login")} title="Login" />
        )}

        <div className="relative">
          <ShoppingBag className="w-5 h-5 hover:text-rose-400 cursor-pointer transition-colors" />
          <span className="absolute -top-2 -right-2 bg-rose-400 text-slate-950 text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">0</span>
        </div>
        <Menu className="md:hidden w-6 h-6 cursor-pointer" />
      </div>

    </nav>
  );
};

export default Navbar;