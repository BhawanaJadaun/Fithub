import React from "react";
import HeroSection from "../components/HeroSection.jsx";
import PremiumGym from "../components/ProductPage/PremiumGym.jsx"
import PricingPage from "../components/ProductPage/PricingPage.jsx"
import BestGym from "../components/ProductPage/BestGym.jsx"
import Testimonials from "../components/Testimonials.jsx"
import DevPage from ".././pages/About/DevPage.jsx"

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <PremiumGym/>
      <PricingPage/>
      <BestGym/>
      <DevPage/>
      <Testimonials/>
    
    </div>
  );
};

export default HomePage;
