"use client";

import React from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// import 'swiper/css/autoplay';
import 'swiper/css/bundle';


const Slider: React.FC = () => {
  return (
    <Swiper
    className="h-96"
    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
    // spaceBetween={50}
    slidesPerView={1}
    navigation
    autoplay
    pagination={{ clickable: true }}
    // scrollbar={{ draggable: true }}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>
        <div className="bg-purple--dark h-96 flex items-center justify-center text-white text-2xl">
          Slide 1
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="bg-purple--primary h-96 flex items-center justify-center text-white text-2xl">
          Slide 2
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="bg-purple--secondary h-96 flex items-center justify-center text-white text-2xl">
          Slide 3
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="bg-lightGray h-96 flex items-center justify-center text-white text-2xl">
          Slide 4
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
