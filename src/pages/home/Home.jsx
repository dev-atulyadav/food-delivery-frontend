import { useSelector } from "react-redux";
import HeaderCarousel from "../../components/HeaderCarousel";
import Title from "../../components/Title";
import TopMealsCarousel from "../../components/TopMealsCarousel";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import RestaurantList from "../Restaurant/RestaurantList";

const Home = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock mode: allow access without token
    // if (!token) {
    //   navigate("/account/login");
    // }
  }, []);

  return (
    <>
      <HeaderCarousel />

      <TopMealsCarousel />

      <div className="relative w-full px-5 md:px-[60px] lg:px-[120px] flex flex-col justify-center bg-transparent">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-red-500/10 to-purple-500/20 opacity-30 transition-all duration-1000" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(120,219,255,0.3),transparent_50%)]" />
        </div>
        <h2 className="text-2xl my-12 w-full flex justify-center items-center gap-3 md:text-3xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
          Order From Our{" "}
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Handpicked Favorites
          </span>
        </h2>
        <RestaurantList />
      </div>
    </>
  );
};

export default Home;
