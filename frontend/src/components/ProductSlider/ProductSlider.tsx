"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import ProductItem from "../ProductItem/ProductItem";
import { Product } from "../../types/productType";

interface ProductListProps {
  promoImageSrc: string;
  title: string;
  bgColor?: string;
  products: Product[];
}

export default React.memo(function ProductSlider({
  promoImageSrc,
  title,
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

  const scrollLeft = useCallback(() => {
    scrollRef.current?.scrollBy({ left: -440, behavior: "smooth" });
  }, []);

  const scrollRight = useCallback(() => {
    scrollRef.current?.scrollBy({ left: 440, behavior: "smooth" });
  }, []);

  useEffect(() => {
    checkScrollPosition();
    const currentScrollRef = scrollRef.current;
    if (currentScrollRef) {
      currentScrollRef.addEventListener("scroll", checkScrollPosition);
    }
    return () => {
      if (currentScrollRef) {
        currentScrollRef.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, [checkScrollPosition]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
      setIsListRightEnd(true);
      setIsListLeftEnd(false);
    }
  }, []);

  const buttonLeftClass = useMemo(() => {
    return `absolute left-[-2px] top-1/2 transform -translate-y-1/2 p-2 z-10 rounded-3xl transition-all shadow-lg hover:shadow-xl ${
      isListLeftEnd
        ? "cursor-default"
        : "bg-veryLightGray hover:bg-textLightGray"
    }`;
  }, [isListLeftEnd]);

  const buttonRightClass = useMemo(() => {
    return `absolute right-[164px] top-1/2 transform -translate-y-1/2 p-2 z-10 rounded-3xl transition-all shadow-lg hover:shadow-xl ${
      isListRightEnd
        ? "cursor-default"
        : "bg-veryLightGray hover:bg-textLightGray"
    }`;
  }, [isListRightEnd]);

  return (
    <React.Fragment>
      {/* <h2 className="text-right text-xl font-bold font-sans mt-6 mr-28">
        {title}
      </h2> */}
      <div
        className={`${bgColor} rounded-xl m-4 p-4 flex items-center w-[86%] mx-auto relative`}
      >
        <div className="flex flex-col items-center w-[165px]">
          <Image
            src={promoImageSrc}
            alt="icon"
            width={500}
            height={500}
            loading="lazy"
            className="w-32 h-32 m-5"
          />
          <h2 className="text-center mt-2 text-lg font-bold font-sans text-gray">
            {title}
          </h2>
        </div>
        <div
          className="flex flex-1 mx-2 px-2 overflow-scroll gap-5 scrollbar-hide"
          ref={scrollRef}
          onScroll={checkScrollPosition}
        >
          {!isListLeftEnd && (
            <Button onClick={scrollLeft} className={buttonLeftClass}>
              <Icon name={"IoIosArrowBack"} size={18} />
            </Button>
          )}
          {!isListRightEnd && (
            <Button onClick={scrollRight} className={buttonRightClass}>
              <Icon name={"IoIosArrowForward"} size={18} />
            </Button>
          )}
          {products.map((product, index) => (
            <ProductItem key={index} product={product} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
});
