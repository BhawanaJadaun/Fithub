import React, { useEffect, useRef } from "react";
import assets from "../assets/assets.js"; // Update with your asset paths

const TestimonialCard = ({ image, name, description, likes }) => {
  return (
    <div className="w-full sm:w-72 h-80 flex-shrink-0 group overflow-hidden relative rounded bg-first text-neutral-50 p-4 flex flex-col justify-evenly">
      {/* Background blobs */}
      <div className="absolute blur w-42 h-42 rounded-full bg-default right-1 -bottom-24"></div>
      <div className="absolute blur w-12 h-12 rounded-full bg-six right-12 bottom-12"></div>
      <div className="absolute blur w-36 h-36 rounded-full bg-third right-1 -top-12"></div>
      <div className="absolute blur w-24 h-24 bg-sky-700 rounded-full"></div>

      {/* Content */}
      <div className="z-10 flex flex-col items-center text-center">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 rounded-full border-4 border-neutral-50 mb-4"
        />
        <span className="text-2xl font-bold mb-2">{name}</span>
        <p className="text-sm mb-4">{description}</p>
        <div className="text-sm font-bold">❤️ {likes} Likes</div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    { image: assets.client1, name: "John Doe", description: "Lorem ipsum...", likes: 120 },
    { image: assets.client2, name: "Jane Smith", description: "Donec volutpat...", likes: 95 },
    { image: assets.client3, name: "Michael Brown", description: "Morbi ut lobortis...", likes: 75 },
    { image: assets.client4, name: "Emily Davis", description: "Vestibulum ante...", likes: 130 },
    { image: assets.client5, name: "Olivia Wilson", description: "Aenean commodo...", likes: 110 },
    { image: assets.client6, name: "William Moore", description: "Quisque feugiat...", likes: 85 },
  ];

  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    const startAutoScroll = () => {
      let scrollLeft = 0;
      const scroll = () => {
        if (slider) {
          scrollLeft += 1; // Adjust speed here
          if (scrollLeft >= slider.scrollWidth / 2) {
            scrollLeft = 0; // Reset scroll
          }
          slider.scrollLeft = scrollLeft;
        }
      };

      return setInterval(scroll, 20); // Adjust interval speed
    };

    const intervalId = startAutoScroll();
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const scrollByAmount = (amount) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += amount;
    }
  };

  return (
    <div className="w-full  bg-default overflow-hidden px-4 py-20">
      <h2 className="text-4xl font-bold text-center mb-8 text-first">Testimonials</h2>
      <div className="relative">
        {/* Slider Container */}
        <div
          ref={sliderRef}
          className="flex space-x-4 overflow-hidden"
          style={{ whiteSpace: "nowrap" }}
        >
          {testimonials.concat(testimonials).map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => scrollByAmount(-300)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
        >
          &#8592;
        </button>
        <button
          onClick={() => scrollByAmount(300)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
