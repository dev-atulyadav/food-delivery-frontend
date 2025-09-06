import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Users,
  Award,
  Clock,
  ChefHat,
  Truck,
  Shield,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ArrowRight,
  Play,
  Target,
  Eye,
  Zap
} from "lucide-react";

const AboutPage = () => {
  const [activeValue, setActiveValue] = useState(0);

  // Company stats
  const stats = [
    { number: "50K+", label: "Happy Customers", icon: Users },
    { number: "500+", label: "Partner Restaurants", icon: ChefHat },
    { number: "1M+", label: "Orders Delivered", icon: Truck },
    { number: "4.8", label: "Average Rating", icon: Star }
  ];

  // Core values
  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "Every decision we make puts our customers at the center. Their satisfaction drives our innovation.",
      color: "from-red-400 to-pink-500"
    },
    {
      icon: Award,
      title: "Quality Excellence", 
      description: "We partner only with the finest restaurants and ensure every meal meets our high standards.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Zap,
      title: "Speed & Efficiency",
      description: "Fast delivery without compromising quality. Your cravings shouldn't have to wait.",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "From secure payments to food safety, we maintain the highest standards of trust.",
      color: "from-green-400 to-emerald-500"
    }
  ];

  // Team members
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=300&h=300&fit=crop&crop=face",
      bio: "Former tech executive with a passion for connecting food lovers with amazing culinary experiences."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face", 
      bio: "Tech innovator focused on creating seamless digital experiences for food delivery."
    },
    {
      name: "Emma Rodriguez",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Operations expert ensuring every order is delivered perfectly and on time."
    },
    {
      name: "David Kim",
      role: "Head of Partnerships",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Building relationships with restaurants to bring you the best culinary diversity."
    }
  ];

  // Milestones
  const milestones = [
    { year: "2020", title: "TasteHub Founded", description: "Started with a vision to revolutionize food delivery" },
    { year: "2021", title: "100 Restaurants", description: "Reached our first major milestone of partner restaurants" },
    { year: "2022", title: "10K Customers", description: "Crossed 10,000 satisfied customers mark" },
    { year: "2023", title: "Multiple Cities", description: "Expanded to 5 major cities across the country" },
    { year: "2024", title: "50K+ Users", description: "Growing community of food lovers and enthusiasts" }
  ];

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
              className="mb-8"
            >
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                <Heart className="w-5 h-5 text-red-400 fill-current" />
                <span className="text-white font-medium">About TasteHub</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Connecting You to
                <span className="block bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  Culinary Excellence
                </span>
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                We're more than just a food delivery platform. We're passionate food lovers on a mission to bring 
                extraordinary culinary experiences right to your doorstep, connecting communities through the universal 
                language of great food.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <motion.button
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(251, 146, 60, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Our Story</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5" />
                <span>Watch Video</span>
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl mb-6">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">{stat.number}</h3>
                    <p className="text-white/60">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-white/80 leading-relaxed">
                  To democratize access to exceptional food experiences by connecting food lovers with the best local restaurants, 
                  while empowering restaurant partners to grow their business through technology and exceptional service.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl mb-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-white/80 leading-relaxed">
                  To become the most trusted and beloved food platform that brings communities together through shared culinary experiences, 
                  making every meal an opportunity for discovery and delight.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Our Core Values</h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                The principles that guide everything we do and every decision we make
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="group cursor-pointer"
                  onHoverStart={() => setActiveValue(index)}
                >
                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 h-full">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                    <p className="text-white/80 leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Meet Our Team</h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Passionate individuals working together to revolutionize your food experience
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group"
                >
                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
                    <div className="relative mb-6">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white/20 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full border-4 border-white/20" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-orange-400 font-medium mb-3">{member.role}</p>
                    <p className="text-white/70 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Our Journey</h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                From a simple idea to a thriving platform - here's how we've grown
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-400 to-red-500 rounded-full" />
              
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                      <div className="text-2xl font-bold text-orange-400 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-white mb-2">{milestone.title}</h3>
                      <p className="text-white/70">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full border-4 border-slate-900" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Get In Touch</h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Have questions or want to partner with us? We'd love to hear from you
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: MapPin, title: "Address", info: "123 Food Street\nCulinary District, New Delhi" },
                { icon: Phone, title: "Phone", info: "+91 98765 43210\n+91 87654 32109" },
                { icon: Mail, title: "Email", info: "hello@tastehub.com\nsupport@tastehub.com" },
                { icon: Globe, title: "Website", info: "www.tastehub.com\nwww.tastehub.in" }
              ].map((contact, index) => (
                <motion.div
                  key={contact.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl mb-4">
                      <contact.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{contact.title}</h3>
                    <p className="text-white/70 whitespace-pre-line text-sm">{contact.info}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-center mt-16"
            >
              <h3 className="text-2xl font-bold text-white mb-8">Follow Us</h3>
              <div className="flex justify-center space-x-6">
                {[
                  { icon: Facebook, color: "from-blue-500 to-blue-600" },
                  { icon: Instagram, color: "from-pink-500 to-purple-600" },
                  { icon: Twitter, color: "from-blue-400 to-blue-500" },
                  { icon: Linkedin, color: "from-blue-600 to-blue-700" }
                ].map((social, index) => (
                  <motion.button
                    key={index}
                    className={`p-4 bg-gradient-to-br ${social.color} rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;