"use client";

import Slideshow from "../Slideshow/Slideshow";
import Image from "next/image";
import Link from "next/link";
import promo from "../../images/promo.png";
import { useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";


const products = [
  {
    id: 1,
    name: "اسنس حلزون کازرکس (تخفیف ویژه)",
    originalPrice: "989,000",
    discountedPrice: "930,000",
    imageSrc: ("../../images/product1.jpg"),
  },
  {
    id: 2,
    name: "ضد آفتاب فیوژن واتر مجیک ایزدین",
    originalPrice: "1,490,000",
    discountedPrice: "1,399,000",
    imageSrc: ("../../product2.jpg"),
  },
  {
    id: 3,
    name: "اسنس حلزون کازرکس (تخفیف ویژه)",
    originalPrice: "989,000",
    discountedPrice: "930,000",
    imageSrc: ("../../product1.jpg"),
  },
  {
    id: 4,
    name: "اسنس حلزون کازرکس (تخفیف ویژه)",
    originalPrice: "989,000",
    discountedPrice: "930,000",
    imageSrc: ("../../product1.jpg"),
  },
  {
    id: 5,
    name: "اسنس حلزون کازرکس (تخفیف ویژه)",
    originalPrice: "989,000",
    discountedPrice: "930,000",
    imageSrc: ("../../product1.jpg"),
  },
  {
    id: 6,
    name: "اسنس حلزون کازرکس (تخفیف ویژه)",
    originalPrice: "989,000",
    discountedPrice: "930,000",
    imageSrc: ("../../product1.jpg"),
  },
  {
    id: 7,
    name: "اسنس حلزون کازرکس (تخفیف ویژه)",
    originalPrice: "989,000",
    discountedPrice: "930,000",
    imageSrc: ("../../product1.jpg"),
  },
  {
    id: 8,
    name: "اسنس حلزون کازرکس (تخفیف ویژه)",
    originalPrice: "989,000",
    discountedPrice: "930,000",
    imageSrc: ("../../product1.jpg"),
  },
];


const categories = [
  {
    id: 1,
    name: "آرایش صورت",
    imageSrc: ("makeup.png"),
  },
  {
    id: 2,
    name: "آرایش لب",
    imageSrc: ("lip-stick.png"),
  },
  {
    id: 3,
    name: "لوسیون و روغن بدن",
    imageSrc: ("body-lotion.png"),
  },
  {
    id: 4,
    name: "پاک کننده آرایش",
    imageSrc: ("skin-care.png"),
  },
  {
    id: 5,
    name: "عطر و ادکلن",
    imageSrc: ("perfume.png"),
  },
  {
    id: 6,
    name: "دهان و دندان",
    imageSrc: ("mouthwash.png"),
  },
  {
    id: 7,
    name: "آرایش چشم",
    imageSrc: ("eye-makeup.png"),
  },
];

export default function HomeContent() {
  const scrollRef = useRef(null);

  return (
    <>
      <div>
        <Slideshow />

        <div className="bg-[#f8a5c2] rounded-xl m-4 p-4 flex items-center w-[85%] mx-auto">
          <Image
            src={promo.src}
            alt="promo"
            width={500}
            height={500}
            className="w-32 h-32 m-5"
          />

          <div
            className="flex overflow-scroll gap-4 scrollbar-hide relative"
            ref={scrollRef}
          >
            <button className="absolute">
              <FaArrowLeft />
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

        <div className="bg-white p-4">
          <h2 className="text-center text-2xl font-semibold mb-8">
            دسته‌بندی ها
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-items-center">
            {categories.map((category) => (
              <div key={category.id} className="flex flex-col items-center">
                <Link href="#">
                  <div className="w-20 h-20 md:w-24 md:h-24 relative mb-2">
                    <Image
                      src={category.imageSrc}
                      alt={category.name}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-full"
                    />
                  </div>
                  <span className="text-center text-sm md:text-base">
                    {category.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="mt-8 p-4 bg-purple-100 rounded-lg flex justify-between items-center">
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center">
          مشاهده
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <div className="flex items-center">
          <span className="text-lg">محصولات درمانی پیورست</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-pink-600 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h18M9 3v18m6-18v18"
            />
          </svg>
        </div>
      </div> */}
      </div>
    </>
  );
}
