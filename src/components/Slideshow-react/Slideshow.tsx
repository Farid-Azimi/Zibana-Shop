"use client"

import React, { useState } from 'react';

const slides = [
  { id: 1, bgColor: 'bg-purple--dark', text: 'Slide 1' },
  { id: 2, bgColor: 'bg-purple--primary', text: 'Slide 2' },
  { id: 3, bgColor: 'bg-purple--secondary', text: 'Slide 3' },
];

const Slideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide) => (
          <div key={slide.id} className={`w-full h-64 flex items-center justify-center text-white text-2xl ${slide.bgColor}`}>
            {slide.text}
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded"
      >
        &gt;
      </button>
    </div>
  );
};

export default Slideshow;
