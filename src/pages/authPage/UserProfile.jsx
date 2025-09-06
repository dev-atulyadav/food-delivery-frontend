import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Edit2,
  Save,
  X,
  ShoppingBag,
  ShoppingCart,
  Clock,
  Star,
  Heart,
  Settings,
  LogOut,
  Eye,
  Package,
  Truck,
  CheckCircle,
  Plus,
  Minus,
  Trash2
} from "lucide-react";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Anderson",
    email: "john.anderson@email.com",
    phone: "9876543210",
    address: "123 Food Street, Culinary District",
    city: "New Delhi",
    pincode: "110001",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  });
  
  const [editData, setEditData] = useState({...profileData});
  const fileInputRef = useRef(null);

  // Mock data for recent orders
  const [recentOrders] = useState([
    {
      id: "ORD001",
      date: "2024-01-15",
      items: [
        { name: "Margherita Pizza", quantity: 1, price: 299 },
        { name: "Garlic Bread", quantity: 2, price: 149 }
      ],
      total: 597,
      status: "delivered",
      restaurant: "Pizza Palace",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=80&h=80&fit=crop"
    },
    {
      id: "ORD002", 
      date: "2024-01-12",
      items: [
        { name: "Chicken Burger", quantity: 1, price: 249 },
        { name: "French Fries", quantity: 1, price: 99 }
      ],
      total: 348,
      status: "delivered",
      restaurant: "Burger Hub",
      image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=80&h=80&fit=crop"
    },
    {
      id: "ORD003",
      date: "2024-01-10",
      items: [
        { name: "Caesar Salad", quantity: 1, price: 199 }
      ],
      total: 199,
      status: "delivered", 
      restaurant: "Green Bowl",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop"
    }
  ]);

  // Mock data for cart
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Pepperoni Pizza",
      restaurant: "Pizza Palace",
      price: 399,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=80&h=80&fit=crop"
    },
    {
      id: 2,
      name: "Chocolate Brownie",
      restaurant: "Sweet Treats",
      price: 149,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=80&h=80&fit=crop"
    }
  ]);

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfileData({...editData});
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({...profileData});
    setIsEditing(false);
  };

  const updateCartQuantity = (id, change) => {
    setCartItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered": return "text-green-400";
      case "preparing": return "text-yellow-400";
      case "on-the-way": return "text-blue-400";
      default: return "text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered": return <CheckCircle className="w-4 h-4" />;
      case "preparing": return <Clock className="w-4 h-4" />;
      case "on-the-way": return <Truck className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br relative pt-20 from-slate-900/20 via-orange-800/70 to-slate-900/20 p-4">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 h-full"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1170&auto=format&fit=crop')",
        }}
      />
      
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={profileData.profileImage}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-white/20"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{profileData.name}</h1>
                <p className="text-white/60">Food Lover & Explorer</p>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white/80 text-sm">4.8 Rating</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ShoppingBag className="w-4 h-4 text-white/60" />
                    <span className="text-white/80 text-sm">{recentOrders.length} Orders</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-3 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/30 transition-all duration-300">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-2 mb-8"
        >
          <div className="flex space-x-2">
            {[
              { id: "profile", label: "Profile", icon: User },
              { id: "orders", label: "Orders", icon: ShoppingBag },
              { id: "cart", label: "Cart", icon: ShoppingCart }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-2 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
                {tab.id === "cart" && cartItems.length > 0 && (
                  <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white">Profile Information</h2>
                  {!isEditing ? (
                    <motion.button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </motion.button>
                  ) : (
                    <div className="flex space-x-3">
                      <motion.button
                        onClick={handleSave}
                        className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </motion.button>
                      <motion.button
                        onClick={handleCancel}
                        className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </motion.button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Profile Picture */}
                  <div className="lg:col-span-1">
                    <div className="text-center">
                      <div className="relative inline-block">
                        <img
                          src={isEditing ? editData.profileImage : profileData.profileImage}
                          alt="Profile"
                          className="w-32 h-32 rounded-full object-cover border-4 border-white/20 mx-auto"
                        />
                        {isEditing && (
                          <motion.button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-0 right-0 p-2 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Camera className="w-4 h-4" />
                          </motion.button>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-white mt-4">
                        {isEditing ? editData.name : profileData.name}
                      </h3>
                      <p className="text-white/60">Premium Member</p>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="relative">
                        <label className="block text-white/80 text-sm font-medium mb-2">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type="text"
                            value={isEditing ? editData.name : profileData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent disabled:opacity-60 transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="relative">
                        <label className="block text-white/80 text-sm font-medium mb-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type="email"
                            value={isEditing ? editData.email : profileData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent disabled:opacity-60 transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="relative">
                        <label className="block text-white/80 text-sm font-medium mb-2">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type="tel"
                            value={isEditing ? editData.phone : profileData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent disabled:opacity-60 transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* City */}
                      <div className="relative">
                        <label className="block text-white/80 text-sm font-medium mb-2">City</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type="text"
                            value={isEditing ? editData.city : profileData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent disabled:opacity-60 transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Address */}
                      <div className="md:col-span-2">
                        <label className="block text-white/80 text-sm font-medium mb-2">Address</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                          <textarea
                            value={isEditing ? editData.address : profileData.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                            disabled={!isEditing}
                            rows="3"
                            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent disabled:opacity-60 transition-all duration-300 resize-none"
                          />
                        </div>
                      </div>

                      {/* Pincode */}
                      <div className="relative">
                        <label className="block text-white/80 text-sm font-medium mb-2">Pincode</label>
                        <input
                          type="text"
                          value={isEditing ? editData.pincode : profileData.pincode}
                          onChange={(e) => handleInputChange("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent disabled:opacity-60 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">Recent Orders</h2>
                    <motion.button
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye className="w-4 h-4" />
                      <span>View All Orders</span>
                    </motion.button>
                  </div>

                  <div className="space-y-4">
                    {recentOrders.map((order, index) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={order.image}
                              alt={order.restaurant}
                              className="w-16 h-16 rounded-xl object-cover"
                            />
                            <div>
                              <h3 className="text-white font-semibold">{order.restaurant}</h3>
                              <p className="text-white/60 text-sm">Order #{order.id}</p>
                              <p className="text-white/60 text-sm">{new Date(order.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`flex items-center space-x-2 mb-2 ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span className="text-sm font-medium capitalize">{order.status}</span>
                            </div>
                            <p className="text-white font-semibold">₹{order.total}</p>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center text-sm">
                                <span className="text-white/80">{item.name} x{item.quantity}</span>
                                <span className="text-white/60">₹{item.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Cart Tab */}
            {activeTab === "cart" && (
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
                  <div className="text-white/80">
                    {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
                  </div>
                </div>

                {cartItems.length > 0 ? (
                  <>
                    <div className="space-y-4 mb-8">
                      {cartItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300"
                        >
                          <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-3">
                            <div className="flex items-center space-x-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-xl object-cover"
                              />
                              <div>
                                <h3 className="text-white font-semibold">{item.name}</h3>
                                <p className="text-white/60 text-sm">{item.restaurant}</p>
                                <p className="text-orange-400 font-medium">₹{item.price}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-3 bg-white/10 rounded-xl p-2">
                                <motion.button
                                  onClick={() => updateCartQuantity(item.id, -1)}
                                  className="p-1 text-white/60 hover:text-white transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Minus className="w-4 h-4" />
                                </motion.button>
                                <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                                <motion.button
                                  onClick={() => updateCartQuantity(item.id, 1)}
                                  className="p-1 text-white/60 hover:text-white transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Plus className="w-4 h-4" />
                                </motion.button>
                              </div>
                              <motion.button
                                onClick={() => removeFromCart(item.id)}
                                className="p-2 text-red-400 hover:text-red-300 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="bg-gradient-to-r from-orange-400/20 to-red-500/20 backdrop-blur-sm border border-orange-400/30 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-white font-semibold text-lg">Total</span>
                        <span className="text-white font-bold text-xl">₹{cartTotal}</span>
                      </div>
                      <motion.button
                        className="w-full py-4 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Proceed to Checkout
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-white/40 mx-auto mb-4" />
                    <h3 className="text-white/60 text-lg mb-2">Your cart is empty</h3>
                    <p className="text-white/40 mb-6">Add some delicious items to get started!</p>
                    <motion.button
                      className="px-8 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Browse Menu
                    </motion.button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserProfile;