import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchResturants } from "../../redux/slices/restaurantSlice";
import RestaurantCard from "./RestaurantCard";

const demo = [
  {
    id: 1,
    title: "Sunset Collection",
    description: "Beautiful images of sunsets from around the world.",
    images: [
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      "https://images.pexels.com/photos/262979/pexels-photo-262979.jpeg",
    ],
  },
  {
    id: 2,
    title: "Mountain Adventure",
    description: "A gallery of mountain trekking and hiking experiences.",
    images: [
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      "https://images.pexels.com/photos/262979/pexels-photo-262979.jpeg",
      "https://images.pexels.com/photos/262980/pexels-photo-262980.jpeg",
    ],
  },
  {
    id: 3,
    title: "City Life",
    description: "Captures the hustle and bustle of modern city life.",
    images: [
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      "https://images.pexels.com/photos/262979/pexels-photo-262979.jpeg",
    ],
  },
  {
    id: 4,
    title: "Ocean Wonders",
    description: "Underwater photography showcasing marine life.",
    images: [
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      "https://images.pexels.com/photos/262979/pexels-photo-262979.jpeg",
      "https://images.pexels.com/photos/262980/pexels-photo-262980.jpeg",
    ],
  },
  {
    id: 5,
    title: "Wildlife Safari",
    description: "A collection of wild animals from safari trips.",
    images: [
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      "https://images.pexels.com/photos/262979/pexels-photo-262979.jpeg",
      "https://images.pexels.com/photos/262980/pexels-photo-262980.jpeg",
    ],
  },
  {
    id: 6,
    title: "Architectural Marvels",
    description: "Showcasing famous monuments and modern architecture.",
    images: [
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      "https://images.pexels.com/photos/262979/pexels-photo-262979.jpeg",
    ],
  },
  {
    id: 7,
    title: "Food & Cuisine",
    description: "Tasty dishes and culinary delights from different cultures.",
    images: [
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      "https://images.pexels.com/photos/262979/pexels-photo-262979.jpeg",
      "https://images.pexels.com/photos/262980/pexels-photo-262980.jpeg",
    ],
  },
  {
    id: 8,
    title: "Cultural Festivals",
    description: "Photos from colorful festivals across the globe.",
    images: [
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      "https://images.pexels.com/photos/262979/pexels-photo-262979.jpeg",
    ],
  },
  {
    id: 9,
    title: "Space Exploration",
    description: "Images from telescopes and space missions.",
    images: [
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      "https://images.pexels.com/photos/262979/pexels-photo-262979.jpeg",
      "https://images.pexels.com/photos/262980/pexels-photo-262980.jpeg",
    ],
  },
  {
    id: 10,
    title: "Nature Landscapes",
    description: "Serene landscapes including forests, rivers, and fields.",
    images: [
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      "https://images.pexels.com/photos/262979/pexels-photo-262979.jpeg",
      "https://images.pexels.com/photos/262980/pexels-photo-262980.jpeg",
    ],
  },
];

const RestaurantList = () => {
  const { restaurants, loading, error, message } = useSelector(
    (state) => state.restaurants
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResturants());
  }, [dispatch]);

  const skeletons = Array.from({ length: 8 });

  return (
    <div className="relative">
      {loading ? (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {skeletons.map((_, idx) => (
            <div key={idx} className="flex justify-center p-4">
              <div className="relative overflow-hidden rounded-3xl w-[320px] min-h-[380px] backdrop-blur-xl bg-white/5 border border-white/10">
                <div className="h-[200px] w-full bg-white/10 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-6 w-2/3 bg-white/10 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-white/10 rounded animate-pulse" />
                  <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {demo?.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
