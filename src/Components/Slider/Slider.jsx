import React, { useState, useEffect } from "react";
import slider_image from "../../assets/slider_image.jpg"; 

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0); 
  const images = [slider_image, slider_image, slider_image]; 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); 
    }, 4000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="container mx-auto px-4 mt-10"> 
      <div
        id="carouselExampleSlidesOnly"
        className="relative"
        data-twe-carousel-init
        data-twe-ride="carousel"
      >
        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none ${
                currentIndex === index
                  ? "translate-x-0"
                  : currentIndex > index
                  ? "-translate-x-full"
                  : "translate-x-full"
              }`}
              data-twe-carousel-item
            >
              <img
                src={image}
                className="block w-full"
                alt={`Slide ${index}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
