"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import ProductItem from "../ProductItem/ProductItem";
import { Product } from "../../types/productType";

interface ProductListProps {
  promoImageSrc: string;
  bgColor?: string;
  products: Product[];
}

export default function ProductSlider({
  promoImageSrc,
  bgColor = "bg-[#f8a5c2]",
  products,
}: ProductListProps) {
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
      scrollRef.current.scrollBy({ left: -440, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 443, behavior: "smooth" });
    }
  };

  useEffect(() => {
    checkScrollPosition();

    const handleScroll = () => {
      checkScrollPosition();
    };

    const currentScrollRef = scrollRef.current;
    if (currentScrollRef) {
      currentScrollRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentScrollRef) {
        currentScrollRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [checkScrollPosition]);

  return (
    <>
      <div
        className={`${bgColor} rounded-xl m-4 p-4 flex items-center w-[86%] mx-auto relative`}
      >
        <Image
          src={promoImageSrc}
          alt="icon"
          width={500}
          height={500}
          className="w-32 h-32 m-5"
        />
        <div
          className="flex mx-2 px-2 overflow-scroll gap-5 scrollbar-hide"
          ref={scrollRef}
        >
          <Button
            onClick={scrollLeft}
            className={`absolute left-[-2px] top-1/2 transform -translate-y-1/2 p-2 z-10 rounded-3xl transition-all shadow-lg hover:shadow-xl ${
              isListLeftEnd
                ? "cursor-default"
                : "bg-veryLightGray hover:bg-textLightGray"
            }`}
            disabled={isListLeftEnd}
          >
            <Icon name={"IoIosArrowBack"} size={18} />
          </Button>
          <Button
            onClick={scrollRight}
            className={`absolute right-[170px] top-1/2 transform -translate-y-1/2 p-2 z-10 rounded-3xl transition-all shadow-lg hover:shadow-xl ${
              isListRightEnd
                ? "cursor-default"
                : "bg-veryLightGray hover:bg-textLightGray"
            }`}
            disabled={isListRightEnd}
          >
            <Icon name={"IoIosArrowForward"} size={18} />
          </Button>
          {products.map((product, index) => (
            <ProductItem key={index} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
