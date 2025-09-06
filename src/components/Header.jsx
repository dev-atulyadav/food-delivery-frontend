import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Menu, X, ChefHat, User2 } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navLink = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Menu",
      link: "/menu",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-xl ${
        isScrolled ? " bg-white/30 shadow-lg" : "bg-slate-900/20"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-600 to-slate-300 bg-clip-text text-transparent">
              TasteHub
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLink.map((item, idx) => (
              <motion.button
                key={idx}
                className={`${
                  isScrolled ? "text-black" : "text-white"
                } hover:text-orange-500 font-medium transition-colors duration-200`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={item.link}>{item.name}</Link>
              </motion.button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/auth/user">
              <motion.button
                className="relative p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <User2 className="w-5 h-5 text-slate-300" />
              </motion.button>
            </Link>
            <Link to="/cart">
              <motion.button
                className="relative p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingCart className="w-5 h-5 text-slate-300" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </motion.button>
            </Link>
            <Link to="/auth">
              <motion.button
                className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(251, 146, 60, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </motion.button>
            </Link>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-200/20 shadow-xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="px-4 py-6 space-y-4">
                {navLink.map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.link}
                    className="block text-slate-600 hover:text-orange-500 font-medium py-2"
                    whileHover={{ x: 10 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.button
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full font-medium shadow-lg mt-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </motion.button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
