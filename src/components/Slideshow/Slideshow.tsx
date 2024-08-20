"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Pagination, A11y, Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import makeup from "../../images/slider/makeup.jpg";
import skinCare from "../../images/slider/skin-care.jpg";
import muothWash from "../../images/slider/mouth&teeth.jpeg";
import perfume from "../../images/slider/perfume.jpg";

export default function Slideshow() {
  return (
    <>
      <Swiper
        className="h-96"
        modules={[Pagination, A11y, Autoplay, EffectFade]}
        slidesPerView={1}
        autoplay
        pagination={{ clickable: true }}
        loop
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <Link href="#">
            <Image
              src={makeup}
              alt="makeup"
              width={500}
              height={100}
              className="w-full h-full"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="#">
            <Image
              src={skinCare}
              alt="skinCare"
              width={500}
              height={100}
              className="w-full h-full"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="#">
            <Image
              src={muothWash}
              alt="muothWash"
              width={500}
              height={100}
              className="w-full h-full"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="#">
            <Image
              src={perfume}
              alt="perfume"
              width={500}
              height={100}
              className="w-full h-full"
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
