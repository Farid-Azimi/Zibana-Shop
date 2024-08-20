"use client";

import React, { useRef } from "react";
import Image from "next/image";
import promo from "../../images/promo.png";
import product1 from "../../images/products/product1.jpg";
import product2 from "../../images/products/product2.jpg";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";


const products = [
  {
    id: 1,
    name: "اسنس حلزون کازرکس (تخفیف ویژه)",
    originalPrice: "989,000",
    discountedPrice: "930,000",
    imageSrc: product1,
  },
  {
    id: 2,
    name: "ضد آفتاب فیوژن واتر مجیک ایزدین",
    originalPrice: "1,490,000",
    discountedPrice: "1,399,000",
    imageSrc: product2,
  },
  {
    id: 3,
    name: "اسنس حلزون کازرکس (تخفیف ویژه)",
    originalPrice: "989,000",
    discountedPrice: "930,000",
    imageSrc: product1,
  },
  {
    id: 4,
    name: "ضد آفتاب فیوژن واتر مجیک ایزدین",
    originalPrice: "1,490,000",
    discountedPrice: "1,399,000",
    imageSrc: product2,
  },
  {
    id: 5,
    name: "اسنس حلزون کازرکس (تخفیف ویژه)",
    originalPrice: "989,000",
    discountedPrice: "930,000",
    imageSrc: product1,
  },
  {
    id: 6,
    name: "ضد آفتاب فیوژن واتر مجیک ایزدین",
    originalPrice: "1,490,000",
    discountedPrice: "1,399,000",
    imageSrc: product2,
  },
  {
    id: 7,
    name: "اسنس حلزون کازرکس (تخفیف ویژه)",
    originalPrice: "989,000",
    discountedPrice: "930,000",
    imageSrc: product1,
  },
  {
    id: 8,
    name: "ضد آفتاب فیوژن واتر مجیک ایزدین",
    originalPrice: "1,490,000",
    discountedPrice: "1,399,000",
    imageSrc: product2,
  },
];

export default function ProductList() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="bg-[#f8a5c2] rounded-xl m-4 p-4 flex items-center w-[85%] mx-auto relative">
        <Image
          src={promo.src}
          alt="promo"
          width={500}
          height={500}
          className="w-32 h-32 m-5"
        />

        <div
          className="flex overflow-scroll gap-4 scrollbar-hide"
          ref={scrollRef}
        >
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-0 bottom-0 p-2 z-10"
          >
            <IoIosArrowDropleftCircle />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-[167px] top-0 bottom-0 p-2 z-10"
          >
            <IoIosArrowDroprightCircle />
          </button>
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white min-w-[200px] rounded-xl shadow-md p-4"
            >
              <Image
                src={product.imageSrc}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-auto mb-4"
              />
              <h3 className="text-sm text-gray mb-2">{product.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-[#EA2027] line-through">
                  {product.originalPrice} تومان
                </span>
                <span className="text-[#4cd137] font-semibold">
                  {product.discountedPrice} تومان
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
