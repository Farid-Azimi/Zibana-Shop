"use client";

import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pagination, A11y, Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import makeup from "../../images/slider/UUs2BCyXpOiByLxbzV0HNiwVitWGcnfCNxzUF8DV.jpg";
import skinCare from "../../images/slider/VfLo1H9k0ukagNXcGNYxNy6NKAKVPo8WLUkCxzhV.gif";
import muothWash from "../../images/slider/ZiBTmRShLlHuDbwVjfFEVvn05IqSHwAQscW3N7ea.jpg";
import perfume from "../../images/slider/IMG_20240622_120008_221-min.jpg";

const Slideshow = () => {
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
              loading="lazy"
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
              loading="lazy"
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
              loading="lazy"
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
              loading="lazy"
              className="w-full h-full"
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default memo(Slideshow);
