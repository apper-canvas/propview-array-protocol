import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";

const Header = ({ onSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (searchTerm) => {
    if (onSearch) {
      onSearch(searchTerm);
    }
    if (location.pathname !== "/") {
      navigate("/?search=" + encodeURIComponent(searchTerm));
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="bg-gradient-to-r from-primary to-blue-600 p-2 rounded-xl">
                <ApperIcon name="Home" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-display bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  PropView
                </h1>
                <p className="text-xs text-slate-500">Modern Real Estate</p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <button
                onClick={() => navigate("/")}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive("/")
                    ? "text-primary bg-primary/10"
                    : "text-slate-600 hover:text-primary hover:bg-slate-50"
                }`}
              >
                <ApperIcon name="Grid3x3" size={18} />
                <span>Browse Properties</span>
              </button>
              <button
                onClick={() => navigate("/saved")}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive("/saved")
                    ? "text-primary bg-primary/10"
                    : "text-slate-600 hover:text-primary hover:bg-slate-50"
                }`}
              >
                <ApperIcon name="Heart" size={18} />
                <span>Saved</span>
              </button>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-primary transition-colors"
          >
            <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  navigate("/");
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-left transition-all duration-200 ${
                  isActive("/")
                    ? "text-primary bg-primary/10"
                    : "text-slate-600 hover:text-primary hover:bg-slate-50"
                }`}
              >
                <ApperIcon name="Grid3x3" size={20} />
                <span>Browse Properties</span>
              </button>
              <button
                onClick={() => {
                  navigate("/saved");
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-left transition-all duration-200 ${
                  isActive("/saved")
                    ? "text-primary bg-primary/10"
                    : "text-slate-600 hover:text-primary hover:bg-slate-50"
                }`}
              >
                <ApperIcon name="Heart" size={20} />
                <span>Saved Properties</span>
              </button>
            </nav>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;