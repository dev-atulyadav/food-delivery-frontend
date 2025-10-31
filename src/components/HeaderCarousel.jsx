import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import PizzaImg from "../assets/pizza.png";
import NoodlesImg from "../assets/noodles.png";
import ChickenImg from "../assets/chicken.png";

const carouselItems = [
  {
    id: 1,
    img: PizzaImg,
    title: "Hot Pizza",
    subtitle: "Artisan Crafted",
    description:
      "Experience the perfect blend of crispy crust, rich tomato sauce, and melted mozzarella. Our wood-fired pizzas are crafted with premium ingredients.",
    color: "from-orange-500 to-red-600",
    accent: "bg-orange-500",
  },
  {
    id: 2,
    img: NoodlesImg,
    title: "Delicious Noodles",
    subtitle: "Asian Fusion",
    description:
      "Savor the authentic flavors of hand-pulled noodles in our signature broth. A perfect harmony of spices and fresh ingredients.",
    color: "from-yellow-500 to-orange-600",
    accent: "bg-yellow-500",
  },
  {
    id: 3,
    img: ChickenImg,
    title: "Roast Chicken",
    subtitle: "Perfectly Seasoned",
    description:
      "Tender, juicy chicken roasted to perfection with our secret blend of herbs and spices. A comfort food classic reimagined.",
    color: "from-amber-500 to-orange-700",
    accent: "bg-amber-500",
  },
];

const HeaderCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isPlaying]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
      setIsTransitioning(false);
    }, 150);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(
        (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
      );
      setIsTransitioning(false);
    }, 150);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 150);
  };

  const currentItem = carouselItems[currentIndex];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${currentItem.color} opacity-20 transition-all duration-1000`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(120,219,255,0.3),transparent_50%)]" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 ${currentItem.accent} rounded-full opacity-20 animate-pulse`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div
              className={`space-y-8 transition-all duration-700 ${
                isTransitioning
                  ? "opacity-0 translate-x-8"
                  : "opacity-100 translate-x-0"
              }`}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium">
                <div
                  className={`w-2 h-2 ${currentItem.accent} rounded-full animate-pulse`}
                />
                {currentItem.subtitle}
              </div>

              {/* Title */}
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-light text-white/70 tracking-wider">
                  Special Dish
                </h3>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                  {currentItem.title.split(" ").map((word, i) => (
                    <span
                      key={i}
                      className="inline-block"
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        animation: isTransitioning
                          ? "none"
                          : "fadeInUp 0.8s ease-out forwards",
                      }}
                    >
                      {word}&nbsp;
                    </span>
                  ))}
                </h1>
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-lg">
                {currentItem.description}
              </p>

              {/* CTA Button */}
              <div className="flex gap-4 pt-4">
                <button
                  className={`px-8 py-4 ${currentItem.accent} text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2`}
                >
                  Order Now
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300">
                  View Menu
                </button>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative flex justify-center lg:justify-end">
              <div
                className={`relative transition-all duration-700 ${
                  isTransitioning
                    ? "scale-95 opacity-0 rotate-3"
                    : "scale-100 opacity-100 rotate-0"
                }`}
              >
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${currentItem.color} rounded-full blur-3xl opacity-30 scale-110 animate-pulse`}
                />

                {/* Image Container */}
                <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/20 shadow-2xl">
                    <img
                      src={currentItem.img}
                      alt={currentItem.title}
                      className="w-full h-full object-cover rounded-full p-8 hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Floating Ring */}
                <div
                  className="absolute -inset-4 rounded-full border-2 border-white/10 animate-spin"
                  style={{ animationDuration: "20s" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 text-white/80 hover:text-white transition-colors"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>

          {/* Dots */}
          <div className="flex gap-3">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? `${carouselItems[index].accent} scale-125`
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className={`h-full ${currentItem.accent} transition-all duration-100`}
              style={{
                width: isPlaying ? "100%" : "0%",
                animation: isPlaying ? "progress 4s linear infinite" : "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-110"
        disabled={isTransitioning}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-110"
        disabled={isTransitioning}
      >
        <ChevronRight size={24} />
      </button>

      <style jsx="true">{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default HeaderCarousel;
