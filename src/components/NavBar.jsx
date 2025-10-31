import React, { useEffect, useState } from "react";
import {
  Search,
  ShoppingBag,
  Sun,
  Moon,
  User,
  X,
  Menu,
  ChefHat,
  Bell,
  Heart,
} from "lucide-react";
import { useThemeContext } from "../Theme/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../redux/slices/authSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeContext();
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount] = useState(3);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Mock mode: don't redirect to login; optionally fetch mock profile
    if (!user && token) {
      dispatch(userProfile());
    }
  }, [token, user, dispatch]);

  const isDark = mode === "dark";

  return (
    <>
      {/* Main Navbar */}
      <header
        className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-500
        ${
          isScrolled
            ? "backdrop-blur-xl bg-white/5 shadow-2xl"
            : "bg-transparent"
        }
        ${isDark ? "text-white" : "text-gray-800"}
      `}
      >
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl">
                  <ChefHat size={28} className="text-white" />
                </div>
              </div>
              <h1 className="font-bold text-3xl bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Foody
              </h1>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-12">
              <div className="relative w-full group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div
                  className={`
                  relative flex items-center w-full h-12 rounded-2xl border transition-all duration-300
                  ${
                    isDark
                      ? "bg-white/5 border-white/10 backdrop-blur-xl"
                      : "bg-black/5 border-black/10 backdrop-blur-xl"
                  }
                  group-hover:border-orange-500/30 group-focus-within:border-orange-500/50
                `}
                >
                  <Search
                    size={20}
                    className="ml-4 text-gray-400 group-focus-within:text-orange-500 transition-colors"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search delicious food..."
                    className="flex-1 bg-transparent border-none px-4 text-sm placeholder-gray-400"
                    style={{ outline: "none" }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mr-4 p-1 rounded-full hover:bg-white/10 transition-colors"
                    >
                      <X size={16} className="text-gray-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Notifications */}
              <button
                className={`
                relative p-3 rounded-xl transition-all duration-300 group
                ${isDark ? "hover:bg-white/10" : "hover:bg-black/10"}
              `}
              >
                <Bell
                  size={22}
                  className="group-hover:scale-110 transition-transform"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </button>

              {/* Wishlist */}
              <button
                className={`
                relative p-3 rounded-xl transition-all duration-300 group
                ${isDark ? "hover:bg-white/10" : "hover:bg-black/10"}
              `}
              >
                <Heart
                  size={22}
                  className="group-hover:scale-110 transition-transform"
                />
              </button>

              {/* Cart */}
              <button
                onClick={() => navigate("/cart")}
                className={`
                  relative p-3 rounded-xl transition-all duration-300 group
                  ${isDark ? "hover:bg-white/10" : "hover:bg-black/10"}
                `}
              >
                <ShoppingBag
                  size={22}
                  className="group-hover:scale-110 transition-transform"
                />
                {cartCount > 0 && (
                  <div className="absolute -top-1 -right-1 min-w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                    {cartCount}
                  </div>
                )}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`
                  p-3 rounded-xl transition-all duration-500 group relative overflow-hidden
                  ${isDark ? "hover:bg-white/10" : "hover:bg-black/10"}
                `}
              >
                <div
                  className={`transition-transform duration-500 ${
                    isDark ? "rotate-0" : "rotate-180"
                  }`}
                >
                  {isDark ? (
                    <Sun
                      size={22}
                      className="group-hover:scale-110 transition-transform text-yellow-400"
                    />
                  ) : (
                    <Moon
                      size={22}
                      className="group-hover:scale-110 transition-transform text-blue-400"
                    />
                  )}
                </div>
              </button>

              {/* User Profile */}
              {user ? (
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-red-500/10 transition-all duration-300 group"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-sm group-hover:scale-105 transition-transform">
                      {user?.fullName?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                  </div>
                  <div className="hidden xl:block text-left">
                    <div className="text-sm font-medium">
                      {user?.fullName || "User"}
                    </div>
                    <div className="text-xs opacity-60">Premium Member</div>
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => navigate("/account/login")}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <User size={18} />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className={`
                  p-2 rounded-xl transition-all duration-300
                  ${isDark ? "hover:bg-white/10" : "hover:bg-black/10"}
                `}
              >
                <Search size={22} />
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="relative p-2 rounded-xl"
              >
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <div className="absolute -top-1 -right-1 min-w-5 h-5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </div>
                )}
              </button>

              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className={`
                  p-2 rounded-xl transition-all duration-300
                  ${isDark ? "hover:bg-white/10" : "hover:bg-black/10"}
                `}
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        <div
          className={`
          lg:hidden fixed inset-0 z-50 transition-all duration-500
          ${showSearch ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSearch(false)}
          />
          <div
            className={`
            absolute top-0 left-0 w-full p-6 transition-transform duration-500
            ${isDark ? "bg-gray-900/95" : "bg-white/95"}
            ${showSearch ? "translate-y-0" : "-translate-y-full"}
            backdrop-blur-xl border-b border-white/10
          `}
          >
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search delicious food..."
                  className={`
                    w-full h-12 pl-12 pr-4 rounded-2xl border outline-none
                    ${
                      isDark
                        ? "bg-white/10 border-white/20 text-white placeholder-gray-400"
                        : "bg-black/5 border-black/20 text-gray-800 placeholder-gray-500"
                    }
                  `}
                  autoFocus
                />
              </div>
              <button
                onClick={() => setShowSearch(false)}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`
          lg:hidden fixed inset-0 z-40 transition-all duration-500
          ${showMobileMenu ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMobileMenu(false)}
          />
          <div
            className={`
            absolute top-0 right-0 w-80 max-w-full h-full p-6 transition-transform duration-500
            ${isDark ? "bg-gray-900/95" : "bg-white/95"}
            ${showMobileMenu ? "translate-x-0" : "translate-x-full"}
            backdrop-blur-xl border-l border-white/10
          `}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 text-left"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
                <span>Switch to {isDark ? "Light" : "Dark"} Mode</span>
              </button>

              <button className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 text-left">
                <Bell size={20} />
                <span>Notifications</span>
                <div className="ml-auto w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <button className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 text-left">
                <Heart size={20} />
                <span>Wishlist</span>
              </button>

              {user ? (
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 text-left"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {user?.fullName?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <div className="font-medium">
                      {user?.fullName || "User"}
                    </div>
                    <div className="text-sm opacity-60">View Profile</div>
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => navigate("/account/login")}
                  className="w-full flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300"
                >
                  <User size={18} />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-20" />
    </>
  );
};

export default NavBar;
