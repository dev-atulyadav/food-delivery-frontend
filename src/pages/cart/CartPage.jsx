import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Clock,
  CheckCircle,
  Truck,
  Package,
  Star,
  MapPin,
  Calendar,
  CreditCard,
  Filter,
  Search,
  RefreshCw,
  ChevronRight,
  Heart,
  Tag,
  Users,
  Timer
} from "lucide-react";

const CartPage = () => {
  const [activeTab, setActiveTab] = useState("cart");
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Chicken Biryani",
      restaurant: "Spice Paradise",
      price: 299,
      originalPrice: 349,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1563379091339-03246963d7d3?w=300&h=200&fit=crop",
      customization: "Extra spicy, without onions",
      rating: 4.5,
      prepTime: "25-30 min"
    },
    {
      id: 2,
      name: "Margherita Pizza",
      restaurant: "Italian Corner",
      price: 449,
      originalPrice: 499,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop",
      customization: "Thin crust, extra cheese",
      rating: 4.7,
      prepTime: "20-25 min"
    },
    {
      id: 3,
      name: "Chocolate Brownie",
      restaurant: "Sweet Treats",
      price: 149,
      originalPrice: 179,
      quantity: 3,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&fit=crop",
      customization: "With vanilla ice cream",
      rating: 4.8,
      prepTime: "10-15 min"
    }
  ]);

  const [currentOrders] = useState([
    {
      id: "ORD001",
      status: "preparing",
      items: [
        { name: "Butter Chicken", quantity: 2, price: 299 },
        { name: "Garlic Naan", quantity: 4, price: 45 }
      ],
      restaurant: "Royal Kitchen",
      total: 778,
      orderTime: "2025-01-15T19:30:00Z",
      estimatedDelivery: "2025-01-15T20:15:00Z",
      address: "123 Food Street, Delhi",
      paymentMethod: "UPI",
      deliveryFee: 29,
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop"
    },
    {
      id: "ORD002",
      status: "on_way",
      items: [
        { name: "Veg Hakka Noodles", quantity: 1, price: 199 },
        { name: "Spring Rolls", quantity: 6, price: 149 }
      ],
      restaurant: "China Express",
      total: 377,
      orderTime: "2025-01-15T18:45:00Z",
      estimatedDelivery: "2025-01-15T19:30:00Z",
      address: "456 Noodle Lane, Mumbai",
      paymentMethod: "Credit Card",
      deliveryFee: 25,
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=200&fit=crop"
    }
  ]);

  const [previousOrders] = useState([
    {
      id: "ORD003",
      status: "delivered",
      items: [
        { name: "Paneer Tikka Masala", quantity: 1, price: 279 },
        { name: "Jeera Rice", quantity: 1, price: 149 },
        { name: "Gulab Jamun", quantity: 4, price: 99 }
      ],
      restaurant: "Maharaja's Kitchen",
      total: 556,
      orderTime: "2025-01-14T20:15:00Z",
      deliveredAt: "2025-01-14T21:05:00Z",
      address: "789 Spice Avenue, Bangalore",
      paymentMethod: "Wallet",
      deliveryFee: 35,
      rating: 5,
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop"
    },
    {
      id: "ORD004",
      status: "delivered",
      items: [
        { name: "Chicken Caesar Salad", quantity: 2, price: 329 },
        { name: "Garlic Bread", quantity: 1, price: 129 }
      ],
      restaurant: "Healthy Bites",
      total: 787,
      orderTime: "2025-01-13T19:00:00Z",
      deliveredAt: "2025-01-13T19:45:00Z",
      address: "321 Health Street, Delhi",
      paymentMethod: "Cash",
      deliveryFee: 0,
      rating: 4,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop"
    },
    {
      id: "ORD005",
      status: "delivered",
      items: [
        { name: "BBQ Chicken Burger", quantity: 1, price: 249 },
        { name: "French Fries", quantity: 1, price: 99 },
        { name: "Coke", quantity: 2, price: 45 }
      ],
      restaurant: "Burger Junction",
      total: 438,
      orderTime: "2025-01-12T21:30:00Z",
      deliveredAt: "2025-01-12T22:15:00Z",
      address: "654 Burger Boulevard, Mumbai",
      paymentMethod: "UPI",
      deliveryFee: 25,
      rating: 3,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "preparing":
        return <Clock className="w-4 h-4" />;
      case "on_way":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "preparing":
        return "from-yellow-400 to-orange-500";
      case "on_way":
        return "from-blue-400 to-blue-600";
      case "delivered":
        return "from-green-400 to-green-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "preparing":
        return "Preparing";
      case "on_way":
        return "On the way";
      case "delivered":
        return "Delivered";
      default:
        return "Unknown";
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartSavings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const deliveryFee = cartTotal > 200 ? 0 : 29;
  const finalTotal = cartTotal + deliveryFee;

  const tabs = [
    { id: "cart", label: "Cart", icon: ShoppingCart, count: cartItems.length },
    { id: "current", label: "Current Orders", icon: Clock, count: currentOrders.length },
    { id: "previous", label: "Order History", icon: Package, count: previousOrders.length }
  ];

  const filteredPreviousOrders = previousOrders.filter(order => {
    const matchesSearch = order.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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
                <ShoppingCart className="w-5 h-5 text-orange-400" />
                <span className="text-white font-medium">Your Orders</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Cart &
                <span className="block bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  Order History
                </span>
              </h1>
              
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                Manage your cart, track current orders, and view your order history all in one place.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="px-4 mb-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg"
                      : "bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/15"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      activeTab === tab.id ? "bg-white/20" : "bg-orange-400 text-white"
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Area */}
        <section className="px-4 pb-20">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {/* Cart Tab */}
              {activeTab === "cart" && (
                <motion.div
                  key="cart"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.6 }}
                >
                  {cartItems.length === 0 ? (
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-12 text-center">
                      <ShoppingCart className="w-20 h-20 text-white/40 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-white mb-4">Your cart is empty</h3>
                      <p className="text-white/60 mb-8">Add some delicious items to get started!</p>
                      <motion.button
                        className="px-8 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Browse Restaurants
                      </motion.button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Cart Items */}
                      <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-2xl font-bold text-white">Cart Items</h2>
                          <span className="text-white/60">{cartItems.length} items</span>
                        </div>

                        {cartItems.map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
                          >
                            <div className="flex space-x-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-24 h-24 object-cover rounded-xl"
                              />
                              
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
                                    <p className="text-white/60 text-sm mb-1">{item.restaurant}</p>
                                    <div className="flex items-center space-x-2 mb-2">
                                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                      <span className="text-white/80 text-sm">{item.rating}</span>
                                      <span className="text-white/40">•</span>
                                      <Timer className="w-4 h-4 text-white/40" />
                                      <span className="text-white/60 text-sm">{item.prepTime}</span>
                                    </div>
                                  </div>
                                  
                                  <button
                                    onClick={() => removeItem(item.id)}
                                    className="p-2 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-300"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                                
                                {item.customization && (
                                  <p className="text-white/50 text-sm mb-3 italic">{item.customization}</p>
                                )}
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-white font-semibold">₹{item.price}</span>
                                    {item.originalPrice > item.price && (
                                      <span className="text-white/40 text-sm line-through">₹{item.originalPrice}</span>
                                    )}
                                  </div>
                                  
                                  <div className="flex items-center space-x-3">
                                    <motion.button
                                      onClick={() => updateQuantity(item.id, -1)}
                                      className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                    >
                                      <Minus className="w-4 h-4" />
                                    </motion.button>
                                    
                                    <span className="text-white font-semibold min-w-[2rem] text-center">
                                      {item.quantity}
                                    </span>
                                    
                                    <motion.button
                                      onClick={() => updateQuantity(item.id, 1)}
                                      className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                    >
                                      <Plus className="w-4 h-4" />
                                    </motion.button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Order Summary */}
                      <div className="lg:col-span-1">
                        <motion.div
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6 }}
                          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 sticky top-24"
                        >
                          <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                          
                          <div className="space-y-4 mb-6">
                            <div className="flex justify-between">
                              <span className="text-white/80">Subtotal</span>
                              <span className="text-white">₹{cartTotal}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/80">Delivery Fee</span>
                              <span className="text-white">
                                {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                              </span>
                            </div>
                            {cartSavings > 0 && (
                              <div className="flex justify-between text-green-400">
                                <span>You Save</span>
                                <span>-₹{cartSavings}</span>
                              </div>
                            )}
                            <div className="border-t border-white/10 pt-4">
                              <div className="flex justify-between">
                                <span className="text-white font-semibold text-lg">Total</span>
                                <span className="text-white font-bold text-lg">₹{finalTotal}</span>
                              </div>
                            </div>
                          </div>

                          {deliveryFee > 0 && (
                            <div className="bg-orange-400/10 border border-orange-400/20 rounded-lg p-3 mb-6">
                              <p className="text-orange-400 text-sm text-center">
                                Add items worth ₹{200 - cartTotal} more for free delivery!
                              </p>
                            </div>
                          )}
                          
                          <motion.button
                            className="w-full py-4 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <CreditCard className="w-5 h-5" />
                            <span>Proceed to Checkout</span>
                          </motion.button>
                        </motion.div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Current Orders Tab */}
              {activeTab === "current" && (
                <motion.div
                  key="current"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-white">Current Orders</h2>
                    <motion.button
                      className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Refresh</span>
                    </motion.button>
                  </div>

                  {currentOrders.length === 0 ? (
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-12 text-center">
                      <Clock className="w-20 h-20 text-white/40 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-white mb-4">No active orders</h3>
                      <p className="text-white/60">All caught up! Your orders will appear here when you place them.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {currentOrders.map((order, index) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.6 }}
                          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0">
                            <img
                              src={order.image}
                              alt={order.restaurant}
                              className="w-full lg:w-32 h-32 object-cover rounded-xl"
                            />
                            
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <div className="flex items-center space-x-3 mb-2">
                                    <h3 className="text-xl font-bold text-white">{order.restaurant}</h3>
                                    <div className={`inline-flex items-center space-x-1 px-3 py-1 bg-gradient-to-r ${getStatusColor(order.status)} text-white rounded-full text-sm font-medium`}>
                                      {getStatusIcon(order.status)}
                                      <span>{getStatusText(order.status)}</span>
                                    </div>
                                  </div>
                                  <p className="text-white/60 text-sm mb-2">Order #{order.id}</p>
                                  <div className="flex items-center space-x-4 text-sm text-white/60">
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="w-4 h-4" />
                                      <span>{formatTime(order.orderTime)}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <MapPin className="w-4 h-4" />
                                      <span>{order.address}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-white mb-1">₹{order.total}</div>
                                  <div className="text-white/60 text-sm">{order.paymentMethod}</div>
                                </div>
                              </div>

                              <div className="mb-4">
                                <h4 className="text-white font-medium mb-2">Items:</h4>
                                <div className="space-y-1">
                                  {order.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex justify-between text-sm">
                                      <span className="text-white/80">{item.quantity}x {item.name}</span>
                                      <span className="text-white/80">₹{item.price * item.quantity}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="text-white/60 text-sm">
                                  {order.status === "preparing" ? (
                                    <span>Estimated delivery: {formatTime(order.estimatedDelivery)}</span>
                                  ) : order.status === "on_way" ? (
                                    <span>Arriving by {formatTime(order.estimatedDelivery)}</span>
                                  ) : (
                                    <span>Delivered</span>
                                  )}
                                </div>
                                
                                <div className="flex space-x-2">
                                  <motion.button
                                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300 text-sm"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    Track Order
                                  </motion.button>
                                  <motion.button
                                    className="px-4 py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    Contact Restaurant
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Previous Orders Tab */}
              {activeTab === "previous" && (
                <motion.div
                  key="previous"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
                    <h2 className="text-3xl font-bold text-white">Order History</h2>
                    
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          type="text"
                          placeholder="Search orders..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 w-full sm:w-64"
                        />
                      </div>
                      
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                      >
                        <option value="all" className="bg-slate-800">All Orders</option>
                        <option value="delivered" className="bg-slate-800">Delivered</option>
                        <option value="cancelled" className="bg-slate-800">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {filteredPreviousOrders.length === 0 ? (
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-12 text-center">
                      <Package className="w-20 h-20 text-white/40 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-white mb-4">No orders found</h3>
                      <p className="text-white/60">Try adjusting your search or filters.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {filteredPreviousOrders.map((order, index) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.6 }}
                          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0">
                            <img
                              src={order.image}
                              alt={order.restaurant}
                              className="w-full lg:w-32 h-32 object-cover rounded-xl"
                            />
                            
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <div className="flex items-center space-x-3 mb-2">
                                    <h3 className="text-xl font-bold text-white">{order.restaurant}</h3>
                                    <div className={`inline-flex items-center space-x-1 px-3 py-1 bg-gradient-to-r ${getStatusColor(order.status)} text-white rounded-full text-sm font-medium`}>
                                      {getStatusIcon(order.status)}
                                      <span>{getStatusText(order.status)}</span>
                                    </div>
                                  </div>
                                  <p className="text-white/60 text-sm mb-2">Order #{order.id}</p>
                                  <div className="flex items-center space-x-4 text-sm text-white/60">
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="w-4 h-4" />
                                      <span>{formatDate(order.orderTime)} at {formatTime(order.orderTime)}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <MapPin className="w-4 h-4" />
                                      <span>{order.address}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-white mb-1">₹{order.total}</div>
                                  <div className="text-white/60 text-sm">{order.paymentMethod}</div>
                                  {order.rating && (
                                    <div className="flex items-center justify-end mt-2">
                                      <div className="flex items-center space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                          <Star
                                            key={i}
                                            className={`w-4 h-4 ${
                                              i < order.rating
                                                ? "text-yellow-400 fill-current"
                                                : "text-white/20"
                                            }`}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="mb-4">
                                <h4 className="text-white font-medium mb-2">Items:</h4>
                                <div className="space-y-1">
                                  {order.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex justify-between text-sm">
                                      <span className="text-white/80">{item.quantity}x {item.name}</span>
                                      <span className="text-white/80">₹{item.price * item.quantity}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="text-white/60 text-sm">
                                  {order.deliveredAt && (
                                    <span>Delivered on {formatDate(order.deliveredAt)} at {formatTime(order.deliveredAt)}</span>
                                  )}
                                </div>
                                
                                <div className="flex space-x-2">
                                  <motion.button
                                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300 text-sm flex items-center space-x-1"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Heart className="w-4 h-4" />
                                    <span>Reorder</span>
                                  </motion.button>
                                  
                                  {!order.rating && (
                                    <motion.button
                                      className="px-4 py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm flex items-center space-x-1"
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Star className="w-4 h-4" />
                                      <span>Rate Order</span>
                                    </motion.button>
                                  )}
                                  
                                  <motion.button
                                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300 text-sm"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    View Details
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Quick Stats Section */}
        <section className="py-20 px-4 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Your Food Journey</h2>
              <p className="text-white/60 text-lg">Here's a summary of your TasteHub experience</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Total Orders",
                  value: "47",
                  subtitle: "Since joining",
                  icon: Package,
                  color: "from-blue-400 to-blue-600"
                },
                {
                  title: "Money Saved",
                  value: "₹2,340",
                  subtitle: "Through offers",
                  icon: Tag,
                  color: "from-green-400 to-green-600"
                },
                {
                  title: "Favorite Cuisine",
                  value: "Indian",
                  subtitle: "62% of orders",
                  icon: Heart,
                  color: "from-red-400 to-red-600"
                },
                {
                  title: "Average Rating",
                  value: "4.3",
                  subtitle: "You've given",
                  icon: Star,
                  color: "from-yellow-400 to-yellow-600"
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl mb-4`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-orange-400 font-medium mb-1">{stat.title}</div>
                  <div className="text-white/60 text-sm">{stat.subtitle}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Reorders */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Order Again</h2>
              <p className="text-white/60 text-lg">Your favorite meals are just a click away</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Chicken Biryani",
                  restaurant: "Spice Paradise",
                  price: 299,
                  image: "https://images.unsplash.com/photo-1563379091339-03246963d7d3?w=300&h=200&fit=crop",
                  rating: 4.5,
                  orderCount: 8
                },
                {
                  name: "Margherita Pizza",
                  restaurant: "Italian Corner", 
                  price: 449,
                  image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop",
                  rating: 4.7,
                  orderCount: 5
                },
                {
                  name: "Paneer Tikka Masala",
                  restaurant: "Maharaja's Kitchen",
                  price: 279,
                  image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop",
                  rating: 4.8,
                  orderCount: 6
                }
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 group"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                      <span className="text-white text-sm font-medium">{item.orderCount}x ordered</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                    <p className="text-white/60 text-sm mb-3">{item.restaurant}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white/80 text-sm">{item.rating}</span>
                      </div>
                      <span className="text-white font-bold">₹{item.price}</span>
                    </div>
                    
                    <motion.button
                      className="w-full py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CartPage;