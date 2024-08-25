"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Button from "../Button/Button";
import ProductItem from "../ProductItem/ProductItem";
import promo from "../../images/promo.png";
import product1 from "../../images/products/product1.jpg";
import product2 from "../../images/products/product2.jpg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const products = [
  {
    id: 1,
    name: "اسنس حلزون کازرکس",
    productBrand: "کازرکس",
    originalPrice: "989,000",
    hasDiscount: true,
    discountedPrice: "900,000",
    imageSrc: product1,
  },
  {
    id: 2,
    name: "ضد آفتاب فیوژن واتر مجیک ایزدین",
    productBrand: "کازرکس",
    originalPrice: "1,490,000",
    hasDiscount: true,
    discountedPrice: "1,399,000",
    imageSrc: product2,
  },
  {
    id: 3,
    name: "اسنس حلزون کازرکس",
    productBrand: "کازرکس",
    originalPrice: "989,000",
    hasDiscount: true,
    discountedPrice: "930,000",
    imageSrc: product1,
  },
  {
    id: 4,
    name: "ضد آفتاب فیوژن واتر مجیک ایزدین",
    productBrand: "کازرکس",
    originalPrice: "1,490,000",
    hasDiscount: true,
    discountedPrice: "1,399,000",
    imageSrc: product2,
  },
  {
    id: 5,
    name: "اسنس حلزون کازرکس",
    productBrand: "کازرکس",
    originalPrice: "989,000",
    hasDiscount: true,
    discountedPrice: "930,000",
    imageSrc: product1,
  },
  {
    id: 6,
    name: "ضد آفتاب فیوژن واتر مجیک ایزدین",
    productBrand: "کازرکس",
    originalPrice: "1,490,000",
    hasDiscount: false,
    discountedPrice: "1,399,000",
    imageSrc: product2,
  },
  {
    id: 7,
    name: "اسنس حلزون کازرکس",
    productBrand: "کازرکس",
    originalPrice: "989,000",
    hasDiscount: false,
    discountedPrice: "930,000",
    imageSrc: product1,
  },
  {
    id: 8,
    name: "ضد آفتاب فیوژن واتر مجیک ایزدین",
    productBrand: "کازرکس",
    originalPrice: "1,490,000",
    hasDiscount: false,
    discountedPrice: "1,399,000",
    imageSrc: product2,
  },
  {
    id: 9,
    name: "احلزون س",
    productBrand: "کازرکس",
    originalPrice: "989,000",
    hasDiscount: false,
    discountedPrice: "930,000",
    imageSrc: product1,
  },
  {
    id: 10,
    name: "ضد آفتاب فیوژن واتر مجیک ایزدین",
    productBrand: "کازرکس",
    originalPrice: "1,490,000",
    hasDiscount: false,
    discountedPrice: "1,399,000",
    imageSrc: product2,
  },
];

export default function ProductList() {
  const [isListLeftEnd, setIsListLeftEnd] = useState(false);
  const [isListRightEnd, setIsListRightEnd] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const checkScrollPosition = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, offsetWidth } = scrollRef.current;

      if (scrollLeft < 0) setIsListRightEnd(false);
      if (scrollLeft === 0) setIsListRightEnd(true);

      if (scrollLeft + scrollWidth === offsetWidth) setIsListLeftEnd(true);
      if (Math.abs(scrollLeft) + offsetWidth < scrollWidth)
        setIsListLeftEnd(false);
    }
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    checkScrollPosition();

    const handleScroll = () => {
      checkScrollPosition();
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }

    // return () => {
    //   if (scrollRef.current) {
    //     scrollRef.current.removeEventListener("scroll", handleScroll);
    //   }
    // };
  }, [checkScrollPosition]);

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
          <Button
            onClick={scrollLeft}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-2 z-10 rounded-3xl transition-all shadow-lg hover:shadow-lg ${
              isListLeftEnd
                ? "cursor-default"
                : "bg-veryLightGray hover:bg-textLightGray"
            }`}
            disabled={isListLeftEnd}
          >
            <IoIosArrowBack />
          </Button>
          <Button
            onClick={scrollRight}
            className={`absolute right-[167px] top-1/2 transform -translate-y-1/2 p-2 z-10 rounded-3xl transition-all shadow-lg hover:shadow-lg ${
              isListRightEnd
                ? "cursor-default"
                : "bg-veryLightGray hover:bg-textLightGray"
            }`}
            disabled={isListRightEnd}
          >
            <IoIosArrowForward />
          </Button>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
