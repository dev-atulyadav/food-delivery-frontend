import React, { useState } from "react";

function RestaurantCard({ restaurant }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.substr(0, length) + "...";
  };

  const handleNavigate = () => {
    if (restaurant.open) {
      console.log(`Navigating to restaurant ${restaurant.id}`);
    }
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="flex justify-center p-4">
      <div
        className="group relative overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer backdrop-blur-xl bg-white/10 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_60px_rgba(0,0,0,0.25)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleNavigate}
        style={{
          borderRadius: "24px",
          width: "320px",
          minHeight: "380px",
          transform: isHovered ? "translateY(-8px)" : "translateY(0px)",
          boxShadow: isHovered
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.35)"
            : "0 8px 30px rgba(0, 0, 0, 0.12)",
        }}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden" style={{ height: "200px" }}>
          {/* Image with overlay effect */}
          <div className="relative w-full h-full">
            <img
              src={restaurant.images[0]}
              alt={restaurant.name}
              className="w-full h-full object-cover transition-all duration-700"
              style={{
                transform: isHovered ? "scale(1.1)" : "scale(1)",
                opacity: imageLoaded ? 1 : 0,
              }}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300"
              style={{
                opacity: isHovered ? 0.8 : 0.4,
              }}
            />

            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
          </div>

          {/* Status Badge */}
          <div className="absolute top-4 left-4 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
            <span className={restaurant.open ? 'bg-green-500/80' : 'bg-red-500/80'} style={{
              display: 'inline-block',
              padding: '2px 8px',
              borderRadius: '9999px'
            }}>{restaurant.open ? 'Open' : 'Closed'}</span>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/70 backdrop-blur-md rounded-full px-3 py-1 border border-white/10">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFC107">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-white text-sm font-semibold">
              {restaurant.rating}
            </span>
          </div>

          {/* Favorite Button */}
          <div className="absolute bottom-4 right-4">
            <button
              onClick={toggleFavorite}
              className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md transition-all duration-300 flex items-center justify-center hover:bg-white hover:scale-110 border border-black/5"
              style={{
                transform: isHovered ? "scale(1.1)" : "scale(1)",
              }}
            >
              {isFavorited ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#e53e3e">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#666"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 space-y-3">
          {/* Restaurant Name */}
          <div className="space-y-2">
            <h3 className="font-bold text-xl text-white leading-tight">
              {restaurant.name}
            </h3>

            {/* Cuisine Type */}
            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white">
                {restaurant.cuisine}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-white/80">
            {truncateText(restaurant.description, 90)}
          </p>

          {/* Footer Info */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <div className="flex items-center gap-1 text-white/70">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              <span className="text-sm font-medium">
                {restaurant.deliveryTime}
              </span>
            </div>

            <div className="flex items-center gap-1 text-white/70">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-sm">{restaurant.distance}</span>
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div
          className="absolute inset-0 rounded-3xl transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              "linear-gradient(45deg, rgba(249, 115, 22, 0.12), rgba(239, 68, 68, 0.12))",
            opacity: isHovered ? 1 : 0,
            zIndex: -1,
          }}
        />
      </div>
    </div>
  );
}

export default RestaurantCard;
