"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../Button/Button";
import { CiSearch } from "react-icons/ci";
import { Product } from "../../types/productType";
import { products } from "../../data/productData";
import Image from "next/image";
import Link from "next/link";

export default function SearchBox() {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    if (value) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredProducts([]);
    }
  };

  // const handleBlur = () => {
  //   if (query.trim() != "") {
  //     setQuery("");
  //   } 
  //   setIsFocused(false);
  // };

  return (
    <div className="relative flex items-center transition-all duration-300">
      <Button
        className="bg-purple--primary mr-1 rounded-lg transition-all hover:bg-purple--secondary absolute"
        onClick={() => alert("Search Button clicked!")}
      >
        <CiSearch className="h-8 w-8 text-white" />
      </Button>
      <motion.input
        className="appearance-none w-full h-10 ml-2 rounded-xl border border-lightGray shadow-md text-gray indent-12 focus:border-2 focus:border-gray focus:outline-none"
        type="text"
        placeholder="جستجو برای محصول..."
        onFocus={() => setIsFocused(true)}
        // onBlur={handleBlur}
        onChange={handleInputChange}
        animate={{ width: isFocused ? "32rem" : "15rem" }}
        initial={{ width: "15rem" }}
        transition={{ duration: 0.3 }}
      />
      {query && (
        <>
          <div className="absolute top-14 left-0 right-0 bg-white shadow-2xl rounded-lg p-4 z-10">
            {filteredProducts.length > 0 ? (
              <>
                <ul>
                  {filteredProducts.slice(0, 5).map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      passHref
                    >
                      <li
                        key={product.id}
                        className="py-2 px-4 flex items-center text-textGray hover:bg-veryLightGray cursor-pointer"
                      >
                        <div className="w-16 h-16 relative ml-2">
                          <Image
                            src={product.imageSrc}
                            alt={product.name}
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                        {product.name}
                      </li>
                    </Link>
                  ))}
                </ul>
                {filteredProducts.length > 5 && (
                  <>
                    <div className="flex justify-center items-center mt-2">
                      <Link href={`/search?query=${query}`} passHref>
                        <Button className="text-[#2d98da] hover:text-[#48dbfb]">
                          مشاهده تمامی محصولات...({filteredProducts.length})
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <span className="text-textGray">
                  برای جستجوی شما نتیجه ای یافت نشد!
                </span>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
