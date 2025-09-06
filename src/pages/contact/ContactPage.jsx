import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  User,
  FileText,
  CheckCircle,
  AlertCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Globe,
  Headphones,
  ShieldCheck,
  Heart,
  HelpCircle,
  Users,
  Building,
  Briefcase
} from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "general",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeOffice, setActiveOffice] = useState(0);

  // Contact categories
  const categories = [
    { value: "general", label: "General Inquiry", icon: MessageCircle },
    { value: "support", label: "Customer Support", icon: Headphones },
    { value: "partnership", label: "Restaurant Partnership", icon: Building },
    { value: "business", label: "Business Inquiry", icon: Briefcase },
    { value: "feedback", label: "Feedback & Suggestions", icon: Heart },
    { value: "technical", label: "Technical Issues", icon: ShieldCheck }
  ];

  // Office locations
  const offices = [
    {
      city: "New Delhi",
      type: "Headquarters",
      address: "123 Food Street, Connaught Place\nNew Delhi - 110001",
      phone: "+91 11 4567 8900",
      email: "delhi@tastehub.com",
      hours: "Mon - Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 4:00 PM",
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop"
    },
    {
      city: "Mumbai",
      type: "Operations Center",
      address: "456 Spice Avenue, Bandra West\nMumbai - 400050",
      phone: "+91 22 7890 1234", 
      email: "mumbai@tastehub.com",
      hours: "Mon - Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 4:00 PM",
      image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=300&fit=crop"
    },
    {
      city: "Bangalore",
      type: "Tech Hub",
      address: "789 Innovation Drive, Koramangala\nBangalore - 560095",
      phone: "+91 80 2345 6789",
      email: "bangalore@tastehub.com", 
      hours: "Mon - Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 4:00 PM",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    }
  ];

  // Quick contact options
  const quickContacts = [
    {
      title: "Customer Support",
      description: "Need help with your order?",
      icon: Headphones,
      contact: "1800-TASTE-HUB",
      subtext: "24/7 Support Available",
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "Restaurant Partners",
      description: "Want to join our platform?",
      icon: Building,
      contact: "partners@tastehub.com", 
      subtext: "Business Inquiries",
      color: "from-green-400 to-green-600"
    },
    {
      title: "Media & Press",
      description: "Press inquiries and media kit",
      icon: Users,
      contact: "media@tastehub.com",
      subtext: "Media Relations",
      color: "from-purple-400 to-purple-600"
    },
    {
      title: "Careers",
      description: "Join our amazing team",
      icon: Briefcase,
      contact: "careers@tastehub.com",
      subtext: "We're Hiring!",
      color: "from-orange-400 to-red-500"
    }
  ];

  // FAQ items
  const faqs = [
    {
      question: "How can I track my order?",
      answer: "You can track your order in real-time through our app or website. You'll receive SMS updates at every step."
    },
    {
      question: "What areas do you deliver to?",
      answer: "We currently deliver to Delhi NCR, Mumbai, Bangalore, and are expanding to more cities soon."
    },
    {
      question: "How can I become a restaurant partner?",
      answer: "Contact our partnership team at partners@tastehub.com or fill out the partnership form on our website."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI, net banking, and popular digital wallets."
    }
  ];

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "general",
        message: ""
      });
    } catch (error) {
      setErrors({ general: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1170&auto=format&fit=crop')",
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-12 text-center max-w-md w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-white mb-4">Message Sent!</h2>
          <p className="text-white/80 mb-8">
            Thanks for reaching out! We've received your message and will get back to you within 24 hours.
          </p>
          
          <motion.button
            onClick={() => setIsSubmitted(false)}
            className="px-8 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Another Message
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1170&auto=format&fit=crop')",
        }}
      />
      
      <div className="relative">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                <MessageCircle className="w-5 h-5 text-orange-400" />
                <span className="text-white font-medium">Get In Touch</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                We'd Love to
                <span className="block bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  Hear From You
                </span>
              </h1>
              
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                Have questions, suggestions, or need support? Our team is here to help you have the best possible 
                experience with TasteHub. Reach out to us anytime!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Contact Cards */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Quick Contact</h2>
              <p className="text-white/60 text-lg">Choose the best way to reach us for your specific needs</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {quickContacts.map((contact, index) => (
                <motion.div
                  key={contact.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300 h-full">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${contact.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <contact.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{contact.title}</h3>
                    <p className="text-white/60 text-sm mb-4">{contact.description}</p>
                    <div className="text-orange-400 font-medium mb-1">{contact.contact}</div>
                    <div className="text-white/50 text-xs">{contact.subtext}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Office Info */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-8">Send us a Message</h3>
                
                <div className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                          placeholder="Your name"
                        />
                      </div>
                      {errors.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center mt-1 text-red-400 text-sm"
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.name}
                        </motion.div>
                      )}
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                          placeholder="your@email.com"
                        />
                      </div>
                      {errors.email && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center mt-1 text-red-400 text-sm"
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.email}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Phone & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                          className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                          placeholder="Your phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange("category", e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                      >
                        {categories.map(cat => (
                          <option key={cat.value} value={cat.value} className="bg-slate-800">
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Subject *</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center mt-1 text-red-400 text-sm"
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.subject}
                      </motion.div>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Message *</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        rows="6"
                        className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>
                    {errors.message && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center mt-1 text-red-400 text-sm"
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.message}
                      </motion.div>
                    )}
                  </div>

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

                  {/* Submit Button */}
                  <motion.button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* Office Locations */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-bold text-white">Our Offices</h3>
                
                {/* Office Tabs */}
                <div className="flex space-x-2 bg-white/10 backdrop-blur-sm rounded-xl p-2">
                  {offices.map((office, index) => (
                    <button
                      key={office.city}
                      onClick={() => setActiveOffice(index)}
                      className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 text-sm font-medium ${
                        activeOffice === index
                          ? "bg-gradient-to-r from-orange-400 to-red-500 text-white"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      {office.city}
                    </button>
                  ))}
                </div>

                {/* Active Office Details */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeOffice}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden"
                  >
                    <img
                      src={offices[activeOffice].image}
                      alt={offices[activeOffice].city}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-white">{offices[activeOffice].city}</h4>
                        <span className="px-3 py-1 bg-orange-400/20 text-orange-400 rounded-full text-sm">
                          {offices[activeOffice].type}
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-5 h-5 text-white/60 mt-0.5" />
                          <div>
                            <p className="text-white/80 text-sm whitespace-pre-line">
                              {offices[activeOffice].address}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-white/60" />
                          <p className="text-white/80 text-sm">{offices[activeOffice].phone}</p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-white/60" />
                          <p className="text-white/80 text-sm">{offices[activeOffice].email}</p>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <Clock className="w-5 h-5 text-white/60 mt-0.5" />
                          <div>
                            <p className="text-white/80 text-sm whitespace-pre-line">
                              {offices[activeOffice].hours}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-white/60 text-lg">Quick answers to common questions</p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                        <HelpCircle className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">{faq.question}</h4>
                      <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Media & Additional Info */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
                <p className="text-white/60 mb-8">Stay connected for updates, offers, and food inspiration</p>
                
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: Facebook, color: "from-blue-500 to-blue-600", label: "Facebook" },
                    { icon: Instagram, color: "from-pink-500 to-purple-600", label: "Instagram" },
                    { icon: Twitter, color: "from-blue-400 to-blue-500", label: "Twitter" },
                    { icon: Linkedin, color: "from-blue-600 to-blue-700", label: "LinkedIn" },
                    { icon: Youtube, color: "from-red-500 to-red-600", label: "YouTube" },
                    { icon: Globe, color: "from-green-500 to-green-600", label: "Website" }
                  ].map((social, index) => (
                    <motion.button
                      key={social.label}
                      className={`p-4 bg-gradient-to-br ${social.color} rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 group`}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-xs font-medium">{social.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Business Hours & Additional Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Business Hours</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Customer Support</span>
                    <span className="text-orange-400 font-medium">24/7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Office Hours</span>
                    <span className="text-white">Mon - Fri: 9AM - 6PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Weekend Support</span>
                    <span className="text-white">Sat - Sun: 10AM - 4PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Delivery Hours</span>
                    <span className="text-white">6AM - 2AM Daily</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Help Center",
                      "Order Tracking", 
                      "Restaurant Partners",
                      "Careers",
                      "Privacy Policy",
                      "Terms of Service"
                    ].map((link, index) => (
                      <motion.button
                        key={link}
                        className="text-left text-white/70 hover:text-orange-400 transition-colors text-sm py-1"
                        whileHover={{ x: 5 }}
                      >
                        {link}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-lg border border-red-400/30 rounded-2xl p-8 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-xl mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">Need Immediate Help?</h3>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                For urgent issues with your order, food safety concerns, or any emergency-related problems, 
                contact our 24/7 emergency support line.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <motion.button
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-5 h-5" />
                  <span>1800-EMERGENCY</span>
                </motion.button>
                
                <motion.button
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Live Chat</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;