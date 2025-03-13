import React from "react";
import AboutIntro from "./AboutIntro.jsx";
import PlatformIntro from "./PlatformIntro.jsx";
import GymOwner from "./GymOwner.jsx";
import ForUsers from "./ForUsers.jsx";
import Features from "./Features.jsx";
import MissionVision from "./MissionVision.jsx";
import ContactInfo from "./ContactInfo.jsx";
import DevPage from "./DevPage.jsx";
import PricingPage from "../../components/ProductPage/PricingPage.jsx";
const AboutPage = () => {
  return (
    <div>
      <AboutIntro />
      <PlatformIntro />
      <DevPage />
      <PricingPage/>
      <GymOwner />
      <ForUsers />
      <Features />
      <MissionVision />
      <ContactInfo />
    </div>
  );
};

export default AboutPage;
