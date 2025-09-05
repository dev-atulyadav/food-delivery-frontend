import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Shield
} from "lucide-react";

const AuthPage = () => {
  const [currentView, setCurrentView] = useState("login"); // login, register, loginOtp, registerOtp
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    otp: ["", "", "", "", "", ""]
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);

  // OTP Timer Effect
  useEffect(() => {
    let timer;
    if ((currentView === "loginOtp" || currentView === "registerOtp") && otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentView, otpTimer]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...formData.otp];
    newOtp[index] = value;
    
    setFormData(prev => ({
      ...prev,
      otp: newOtp
    }));

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  };

  const validateForm = (view) => {
    const newErrors = {};

    if (view === "login") {
      if (!formData.email) newErrors.email = "Email is required";
      else if (!validateEmail(formData.email)) newErrors.email = "Invalid email format";
      
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    }

    if (view === "register") {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      
      if (!formData.email) newErrors.email = "Email is required";
      else if (!validateEmail(formData.email)) newErrors.email = "Invalid email format";
      
      if (!formData.phone) newErrors.phone = "Phone number is required";
      else if (!validatePhone(formData.phone)) newErrors.phone = "Phone number must be 10 digits";
      
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    }

    if (view === "loginOtp" || view === "registerOtp") {
      const otpString = formData.otp.join("");
      if (otpString.length !== 6) newErrors.otp = "Please enter complete 6-digit OTP";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm(currentView)) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (currentView === "login") {
        // Simulate sending OTP
        setCurrentView("loginOtp");
        setOtpTimer(60);
      } else if (currentView === "register") {
        // Simulate registration and OTP sending
        setCurrentView("registerOtp");
        setOtpTimer(60);
      } else if (currentView === "loginOtp") {
        // Simulate OTP verification and login
        alert("Login successful!");
        // Reset form or redirect
      } else if (currentView === "registerOtp") {
        // Simulate OTP verification and registration
        alert("Registration successful!");
        // Reset form or redirect
      }
    } catch (error) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOtpTimer(60);
      setFormData(prev => ({ ...prev, otp: ["", "", "", "", "", ""] }));
    } catch (error) {
      setErrors({ general: "Failed to resend OTP" });
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormFields = () => {
    switch (currentView) {
      case "login":
        return (
          <>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full pl-10 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
              />
              {errors.email && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center mt-2 text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </motion.div>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full pl-10 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {errors.password && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center mt-2 text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </motion.div>
              )}
            </div>
          </>
        );

      case "register":
        return (
          <>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full pl-10 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center mt-2 text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name}
                </motion.div>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full pl-10 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
              />
              {errors.email && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center mt-2 text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </motion.div>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="w-full pl-10 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center mt-2 text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.phone}
                </motion.div>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full pl-10 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {errors.password && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center mt-2 text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </motion.div>
              )}
            </div>
          </>
        );

      case "loginOtp":
      case "registerOtp":
        return (
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-lg mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Verify Your Identity
              </h3>
              <p className="text-white/80">
                We've sent a 6-digit code to {formData.email}
              </p>
            </div>

            <div className="flex justify-center space-x-3 mb-6">
              {formData.otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                  maxLength="1"
                />
              ))}
            </div>

            {errors.otp && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center mt-2 text-red-400 text-sm mb-4"
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.otp}
              </motion.div>
            )}

            <div className="text-center">
              <p className="text-white/60 text-sm mb-4">
                {otpTimer > 0 ? (
                  `Resend code in ${otpTimer}s`
                ) : (
                  <button
                    onClick={resendOtp}
                    disabled={isLoading}
                    className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
                  >
                    Resend Code
                  </button>
                )}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case "login":
        return "Welcome Back";
      case "register":
        return "Create Account";
      case "loginOtp":
        return "Verify Login";
      case "registerOtp":
        return "Verify Registration";
      default:
        return "";
    }
  };

  const getSubtitle = () => {
    switch (currentView) {
      case "login":
        return "Sign in to continue your culinary journey";
      case "register":
        return "Join us for amazing food experiences";
      case "loginOtp":
      case "registerOtp":
        return "";
      default:
        return "";
    }
  };

  const getButtonText = () => {
    switch (currentView) {
      case "login":
        return "Sign In";
      case "register":
        return "Create Account";
      case "loginOtp":
        return "Verify & Login";
      case "registerOtp":
        return "Verify & Register";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1170&auto=format&fit=crop')",
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/10 scale-75 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white mb-2"
            >
              {getTitle()}
            </motion.h1>
            {getSubtitle() && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white/80"
              >
                {getSubtitle()}
              </motion.p>
            )}
          </div>

          {/* Back Button for OTP screens */}
          {(currentView === "loginOtp" || currentView === "registerOtp") && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setCurrentView(currentView === "loginOtp" ? "login" : "register")}
              className="flex items-center text-white/80 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </motion.button>
          )}

          {/* Form */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {renderFormFields()}
              </motion.div>
            </AnimatePresence>

            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.general}
              </motion.div>
            )}

            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{getButtonText()}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </div>

          {/* Toggle between Login and Register */}
          {(currentView === "login" || currentView === "register") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mt-8"
            >
              <p className="text-white/60">
                {currentView === "login" ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => {
                    setCurrentView(currentView === "login" ? "register" : "login");
                    setErrors({});
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      password: "",
                      otp: ["", "", "", "", "", ""]
                    });
                  }}
                  className="text-orange-400 hover:text-orange-300 font-medium ml-1 transition-colors"
                >
                  {currentView === "login" ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;