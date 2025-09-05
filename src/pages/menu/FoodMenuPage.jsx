import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  CreditCard, 
  Star, 
  Heart, 
  Clock,
  Flame,
  Leaf,
  ChevronDown,
  X,
  Plus,
  Minus,
  DollarSign
} from 'lucide-react';

// Mock Data
const mockFoodData = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic pizza with fresh mozzarella, tomatoes, and basil",
    price: 299,
    originalPrice: 349,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Pizza",
    isVeg: true,
    rating: 4.5,
    prepTime: 15,
    spiceLevel: 1,
    isPopular: true,
    tags: ["Italian", "Cheesy"]
  },
  {
    id: 2,
    name: "Chicken Tikka Pizza",
    description: "Spicy chicken tikka with onions, peppers and Indian spices",
    price: 449,
    originalPrice: 499,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Pizza",
    isVeg: false,
    rating: 4.7,
    prepTime: 20,
    spiceLevel: 3,
    isPopular: true,
    tags: ["Spicy", "Indian Fusion"]
  },
  {
    id: 3,
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with cheese, lettuce, tomato, and special sauce",
    price: 199,
    originalPrice: 249,
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Burger",
    isVeg: false,
    rating: 4.3,
    prepTime: 12,
    spiceLevel: 1,
    isPopular: false,
    tags: ["American", "Comfort Food"]
  },
  {
    id: 4,
    name: "Veggie Delight Burger",
    description: "Plant-based patty with avocado, sprouts, and vegan mayo",
    price: 179,
    originalPrice: 199,
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Burger",
    isVeg: true,
    rating: 4.1,
    prepTime: 10,
    spiceLevel: 1,
    isPopular: false,
    tags: ["Healthy", "Vegan"]
  },
  {
    id: 5,
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with parmesan, croutons, and caesar dressing",
    price: 149,
    originalPrice: 179,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Salad",
    isVeg: true,
    rating: 4.2,
    prepTime: 8,
    spiceLevel: 0,
    isPopular: false,
    tags: ["Healthy", "Light"]
  },
  {
    id: 6,
    name: "Grilled Chicken Salad",
    description: "Grilled chicken breast with mixed greens and balsamic vinaigrette",
    price: 249,
    originalPrice: 299,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Salad",
    isVeg: false,
    rating: 4.4,
    prepTime: 12,
    spiceLevel: 1,
    isPopular: true,
    tags: ["Protein Rich", "Healthy"]
  },
  {
    id: 7,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice with tender chicken and traditional spices",
    price: 299,
    originalPrice: 349,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Biryani",
    isVeg: false,
    rating: 4.8,
    prepTime: 25,
    spiceLevel: 3,
    isPopular: true,
    tags: ["Indian", "Spicy", "Traditional"]
  },
  {
    id: 8,
    name: "Vegetable Biryani",
    description: "Fragrant rice with mixed vegetables and aromatic spices",
    price: 249,
    originalPrice: 279,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Biryani",
    isVeg: true,
    rating: 4.3,
    prepTime: 20,
    spiceLevel: 2,
    isPopular: false,
    tags: ["Indian", "Vegetarian"]
  },
  {
    id: 9,
    name: "Chocolate Brownie",
    description: "Rich, fudgy brownie with vanilla ice cream",
    price: 129,
    originalPrice: 149,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Dessert",
    isVeg: true,
    rating: 4.6,
    prepTime: 5,
    spiceLevel: 0,
    isPopular: true,
    tags: ["Sweet", "Chocolate"]
  },
  {
    id: 10,
    name: "Butter Chicken",
    description: "Creamy tomato-based curry with tender chicken pieces",
    price: 329,
    originalPrice: 379,
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Curry",
    isVeg: false,
    rating: 4.7,
    prepTime: 18,
    spiceLevel: 2,
    isPopular: true,
    tags: ["Indian", "Creamy", "Popular"]
  },
  {
    id: 11,
    name: "Paneer Makhani",
    description: "Cottage cheese in rich, creamy tomato gravy",
    price: 279,
    originalPrice: 329,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Curry",
    isVeg: true,
    rating: 4.4,
    prepTime: 15,
    spiceLevel: 2,
    isPopular: false,
    tags: ["Indian", "Creamy", "Vegetarian"]
  },
  {
    id: 12,
    name: "Fish Tacos",
    description: "Grilled fish with cabbage slaw and spicy mayo in soft tortillas",
    price: 229,
    originalPrice: 259,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Mexican",
    isVeg: false,
    rating: 4.2,
    prepTime: 14,
    spiceLevel: 2,
    isPopular: false,
    tags: ["Mexican", "Seafood", "Light"]
  }
];

const categories = ["All", "Pizza", "Burger", "Salad", "Biryani", "Curry", "Dessert", "Mexican"];
const priceRanges = [
  { label: "All Prices", min: 0, max: 1000 },
  { label: "Under ₹150", min: 0, max: 150 },
  { label: "₹150 - ₹250", min: 150, max: 250 },
  { label: "₹250 - ₹350", min: 250, max: 350 },
  { label: "Above ₹350", min: 350, max: 1000 }
];

// Filter Component
const FilterPanel = ({ 
  selectedCategory, 
  setSelectedCategory, 
  selectedPriceRange, 
  setSelectedPriceRange,
  dietFilter,
  setDietFilter,
  searchTerm,
  setSearchTerm,
  showOnlyPopular,
  setShowOnlyPopular,
  isOpen,
  setIsOpen
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.3 }}
          className="fixed left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl border-r border-slate-200/50 shadow-2xl z-50 overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Filters</h2>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-slate-700 mb-3 block">Search Dishes</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for dishes..."
                  className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-slate-700 mb-3 block">Categories</label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-slate-700 mb-3 block">Price Range</label>
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedPriceRange(range)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                      selectedPriceRange.label === range.label
                        ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <DollarSign className="w-4 h-4" />
                    <span>{range.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Diet Filter */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-slate-700 mb-3 block">Diet Preference</label>
              <div className="space-y-2">
                {['All', 'Vegetarian', 'Non-Vegetarian'].map((diet) => (
                  <motion.button
                    key={diet}
                    onClick={() => setDietFilter(diet)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                      dietFilter === diet
                        ? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Leaf className="w-4 h-4" />
                    <span>{diet}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Popular Items Toggle */}
            <div className="mb-6">
              <motion.button
                onClick={() => setShowOnlyPopular(!showOnlyPopular)}
                className={`w-full px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-between ${
                  showOnlyPopular
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4" />
                  <span>Popular Items Only</span>
                </div>
                <div className={`w-12 h-6 rounded-full transition-colors ${showOnlyPopular ? 'bg-white/20' : 'bg-slate-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${showOnlyPopular ? 'translate-x-6 ml-0.5' : 'ml-0.5'}`} />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Food Card Component
const FoodCard = ({ food, onAddToCart }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const discount = Math.round(((food.originalPrice - food.price) / food.originalPrice) * 100);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
      whileHover={{ y: -5 }}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <div
          className="w-full h-48 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundImage: `url(${food.image})` }}
        />
        
        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {food.isPopular && (
            <span className="inline-flex items-center space-x-1 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-semibold rounded-full">
              <Star className="w-3 h-3 fill-current" />
              <span>Popular</span>
            </span>
          )}
          {discount > 0 && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <motion.button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'text-red-500 fill-current' : 'text-slate-600'}`} />
        </motion.button>

        {/* Diet Indicator */}
        <div className="absolute bottom-3 left-3">
          <div className={`w-4 h-4 rounded-full border-2 ${food.isVeg ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100'}`}>
            <div className={`w-2 h-2 rounded-full m-0.5 ${food.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">
              {food.name}
            </h3>
            <p className="text-sm text-slate-600 line-clamp-2">{food.description}</p>
          </div>
        </div>

        {/* Rating and Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-slate-700">{food.rating}</span>
            </div>
            <div className="flex items-center space-x-1 text-slate-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{food.prepTime}m</span>
            </div>
            {food.spiceLevel > 0 && (
              <div className="flex items-center space-x-1">
                {[...Array(food.spiceLevel)].map((_, i) => (
                  <Flame key={i} className="w-3 h-3 text-red-500 fill-current" />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {food.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-slate-900">₹{food.price}</span>
            {discount > 0 && (
              <span className="text-sm text-slate-500 line-through">₹{food.originalPrice}</span>
            )}
          </div>
          
          {/* Quantity Selector */}
          <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
            <motion.button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 rounded-md hover:bg-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Minus className="w-4 h-4" />
            </motion.button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <motion.button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 rounded-md hover:bg-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <motion.button
            onClick={() => onAddToCart(food, quantity)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(251, 146, 60, 0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </motion.button>
          
          <motion.button
            className="flex items-center justify-center px-4 py-3 bg-slate-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <CreditCard className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Main Menu Page Component
const FoodMenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [dietFilter, setDietFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyPopular, setShowOnlyPopular] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [cartItems, setCartItems] = useState([]);

  // Filter and sort logic
  const filteredAndSortedFood = useMemo(() => {
    let filtered = mockFoodData.filter(food => {
      const matchesCategory = selectedCategory === "All" || food.category === selectedCategory;
      const matchesPrice = food.price >= selectedPriceRange.min && food.price <= selectedPriceRange.max;
      const matchesDiet = dietFilter === "All" || 
        (dietFilter === "Vegetarian" && food.isVeg) || 
        (dietFilter === "Non-Vegetarian" && !food.isVeg);
      const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPopular = !showOnlyPopular || food.isPopular;

      return matchesCategory && matchesPrice && matchesDiet && matchesSearch && matchesPopular;
    });

    // Sort logic
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "time":
          return a.prepTime - b.prepTime;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [selectedCategory, selectedPriceRange, dietFilter, searchTerm, showOnlyPopular, sortBy]);

  const handleAddToCart = (food, quantity) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === food.id);
      if (existing) {
        return prev.map(item => 
          item.id === food.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...food, quantity }];
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 mt-12">
      {/* Header */}
      {/* <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm"> */}
        {/* <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between"> */}
            {/* <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Our Menu</h1>
              <p className="text-slate-600">Discover delicious dishes crafted with love</p>
            </div> */}
            
            {/* <div className="flex items-center space-x-4"> */}
              {/* Sort Dropdown */}
              {/* <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white/50 border border-slate-200 rounded-xl px-4 py-2 pr-8 font-medium focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="time">Preparation Time</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div> */}

              {/* Filter Button */}
              {/* <motion.button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold rounded-xl shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </motion.button> */}
            {/* </div>
          </div>
        </div>
      </div> */}

      {/* Filter Panel */}
      <FilterPanel
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPriceRange={selectedPriceRange}
        setSelectedPriceRange={setSelectedPriceRange}
        dietFilter={dietFilter}
        setDietFilter={setDietFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showOnlyPopular={showOnlyPopular}
        setShowOnlyPopular={setShowOnlyPopular}
        isOpen={isFilterOpen}
        setIsOpen={setIsFilterOpen}
      />

      {/* Overlay */}
      {isFilterOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Results Count */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-slate-900">
              {filteredAndSortedFood.length} dishes found
            </h2>
            
            {/* Active Filters */}
            <div className="flex items-center space-x-2">
              {selectedCategory !== "All" && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full"
                >
                  <span>{selectedCategory}</span>
                  <button onClick={() => setSelectedCategory("All")}>
                    <X className="w-3 h-3" />
                  </button>
                </motion.span>
              )}
              
              {dietFilter !== "All" && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full"
                >
                  <span>{dietFilter}</span>
                  <button onClick={() => setDietFilter("All")}>
                    <X className="w-3 h-3" />
                  </button>
                </motion.span>
              )}
              
              {selectedPriceRange.label !== "All Prices" && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                >
                  <span>{selectedPriceRange.label}</span>
                  <button onClick={() => setSelectedPriceRange(priceRanges[0])}>
                    <X className="w-3 h-3" />
                  </button>
                </motion.span>
              )}
              
              {showOnlyPopular && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full"
                >
                  <span>Popular Only</span>
                  <button onClick={() => setShowOnlyPopular(false)}>
                    <X className="w-3 h-3" />
                  </button>
                </motion.span>
              )}
            </div>
          </div>

          {/* Clear All Filters */}
          {(selectedCategory !== "All" || dietFilter !== "All" || selectedPriceRange.label !== "All Prices" || showOnlyPopular || searchTerm) && (
            <motion.button
              onClick={() => {
                setSelectedCategory("All");
                setDietFilter("All");
                setSelectedPriceRange(priceRanges[0]);
                setShowOnlyPopular(false);
                setSearchTerm("");
              }}
              className="text-sm text-slate-600 hover:text-slate-900 font-medium underline"
              whileHover={{ scale: 1.05 }}
            >
              Clear all filters
            </motion.button>
          )}
        </div>

        {/* Food Grid */}
        {filteredAndSortedFood.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredAndSortedFood.map((food) => (
                <FoodCard
                  key={food.id}
                  food={food}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-32 h-32 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
              <Search className="w-16 h-16 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No dishes found</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Try adjusting your filters or search terms to find more delicious options.
            </p>
            <motion.button
              onClick={() => {
                setSelectedCategory("All");
                setDietFilter("All");
                setSelectedPriceRange(priceRanges[0]);
                setShowOnlyPopular(false);
                setSearchTerm("");
              }}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Reset Filters</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Cart Summary (Fixed Bottom) */}
      <AnimatePresence>
        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl px-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items in cart
                    </p>
                    <p className="text-xs text-slate-600">
                      ₹{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
                    </p>
                  </div>
                </div>
                
                <motion.button
                  className="px-6 py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Animation (Optional) */}
      <AnimatePresence>
        {false && ( // You can toggle this for loading states
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center space-x-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                <span className="text-lg font-semibold text-slate-900">Loading delicious food...</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FoodMenuPage;