import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const carouselItems = [
    {
        id: 1,
        img: "https://plus.unsplash.com/premium_photo-1669742928007-71b99d6ab1dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM3fHxjaGlja2VuJTIwd2luZ3N8ZW58MHx8MHx8fDA%3D",
        title: 'Hot Pizza',
        color: 'from-orange-500 to-red-600',
        accent: 'bg-orange-500'
    },
    {
        id: 2,
        img: "https://images.unsplash.com/photo-1622001618569-eae18fee3a1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU0fHxjaGlja2VuJTIwd2luZ3N8ZW58MHx8MHx8fDA%3D",
        title: 'Delicious Noodles',
        color: 'from-yellow-500 to-orange-600',
        accent: 'bg-yellow-500'
    },
    {
        id: 3,
        img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVyZ2VyfGVufDB8fDB8fHww",
        title: 'Roast Chicken',
        color: 'from-amber-500 to-orange-700',
        accent: 'bg-amber-500'
    },
    {
        id: 4,
        img: "https://images.unsplash.com/photo-1565976469782-7c92daebc42e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bm9vZGxlc3xlbnwwfHwwfHx8MA%3D%3D",
        title: 'Spaghetti',
        color: 'from-orange-500 to-red-500',
        accent: 'bg-orange-500'
    },
    {
        id: 5,
        img: "https://images.unsplash.com/photo-1605888969139-42cca4308aa2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNwYWdoZXR0aXxlbnwwfHwwfHx8MA%3D%3D",
        title: 'Burger',
        color: 'from-green-500 to-yellow-500',
        accent: 'bg-green-500'
    },
    {
        id: 6,
        img: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBpenphfGVufDB8fDB8fHww",
        title: 'Chicken Wings',
        color: 'from-purple-500 to-pink-500',
        accent: 'bg-purple-500'
    }
];

const TopMealsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (!isPlaying) return;
        
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex, isPlaying]);

    const nextSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % Math.ceil(carouselItems.length / getItemsPerView()));
            setIsTransitioning(false);
        }, 300);
    };

    const prevSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + Math.ceil(carouselItems.length / getItemsPerView())) % Math.ceil(carouselItems.length / getItemsPerView()));
            setIsTransitioning(false);
        }, 300);
    };

    const getItemsPerView = () => {
        if (typeof window === 'undefined') return 4;
        if (window.innerWidth >= 1536) return 6; // 2xl
        if (window.innerWidth >= 1280) return 4; // xl
        if (window.innerWidth >= 1024) return 3; // lg
        if (window.innerWidth >= 768) return 2;  // md
        return 1; // sm
    };

    const [itemsPerView, setItemsPerView] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            setItemsPerView(getItemsPerView());
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const startIndex = currentIndex * itemsPerView;
    const visibleItems = carouselItems.slice(startIndex, startIndex + itemsPerView);

    return (
        <div className="relative w-full py-16 px-6 lg:px-16 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Animated Background - Same as main carousel */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-red-500/10 to-purple-500/20 opacity-30 transition-all duration-1000" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(120,219,255,0.3),transparent_50%)]" />
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-orange-500 rounded-full opacity-20 animate-pulse"
                        style={{
                            left: `${15 + (i * 12)}%`,
                            top: `${20 + (i * 8)}%`,
                            animationDelay: `${i * 0.7}s`,
                            animationDuration: `${2 + (i * 0.3)}s`
                        }}
                    />
                ))}
            </div>

            {/* Header */}
            <div className="relative z-10 mb-12">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                        Popular Dishes
                    </div>
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                        Top <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Meals</span>
                    </h2>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        Discover our most loved dishes crafted with passion and served with excellence
                    </p>
                </div>
            </div>

            {/* Carousel Items */}
            <div className="relative z-10 mb-8">
                <div className={`
                    grid gap-8 transition-all duration-700 
                    ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
                    grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6
                `}>
                    {visibleItems.map((item, index) => (
                        <ModernMealItem 
                            key={`${item.id}-${currentIndex}`} 
                            item={item} 
                            index={index}
                            isTransitioning={isTransitioning}
                        />
                    ))}
                </div>
            </div>

            {/* Controls - Same style as main carousel */}
            <div className="relative z-20 flex justify-center">
                <div className="flex items-center gap-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    {/* Play/Pause */}
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 text-white/80 hover:text-white transition-colors"
                    >
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                        disabled={isTransitioning}
                    >
                        <ChevronLeft size={18} />
                    </button>
                    
                    <button
                        onClick={nextSlide}
                        className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                        disabled={isTransitioning}
                    >
                        <ChevronRight size={18} />
                    </button>

                    {/* Dots */}
                    <div className="flex gap-3 ml-2">
                        {Array.from({ length: Math.ceil(carouselItems.length / itemsPerView) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => !isTransitioning && setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    index === currentIndex 
                                        ? 'bg-orange-500 scale-125' 
                                        : 'bg-white/30 hover:bg-white/50'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ModernMealItem = ({ item, index, isTransitioning }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`
                flex flex-col items-center justify-center group cursor-pointer
                transition-all duration-500 
                ${isTransitioning ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
                hover:scale-105
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            {/* Glow Effect */}
            <div className={`
                absolute bg-gradient-to-r ${item.color} rounded-full blur-3xl opacity-0 
                group-hover:opacity-30 transition-all duration-500 scale-110
                w-40 h-40 md:w-56 md:h-56
            `} />
            
            {/* Image Container - Same structure as main carousel */}
            <div className="relative w-40 h-40 md:w-56 md:h-56 mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/20 shadow-2xl group-hover:shadow-orange-500/25 transition-all duration-500">
                    <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-full p-4 transition-transform duration-700 group-hover:scale-110"
                    />
                </div>

                {/* Floating Ring - Same as main carousel */}
                <div className="absolute -inset-2 rounded-full border-2 border-white/10 animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                     style={{ animationDuration: '15s' }} />

                {/* Accent Dot */}
                <div className={`
                    absolute top-2 right-2 w-4 h-4 ${item.accent} rounded-full opacity-0 
                    group-hover:opacity-100 transition-all duration-300 animate-pulse
                `} />
            </div>

            {/* Title */}
            <span className="text-xl md:text-2xl font-bold text-white text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-orange-500 group-hover:to-red-500 transition-all duration-300">
                {item.title}
            </span>

            {/* Hover Accent Line */}
            <div className={`
                mt-2 h-1 bg-gradient-to-r ${item.color} rounded-full transition-all duration-300
                ${isHovered ? 'w-16 opacity-100' : 'w-0 opacity-0'}
            `} />
        </div>
    );
};

export default TopMealsCarousel;