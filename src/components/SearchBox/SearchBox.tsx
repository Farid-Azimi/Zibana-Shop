"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../Button/Button";
import { CiSearch } from "react-icons/ci";

export default function SearchBox() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative flex items-center transition-all duration-300 ">
      <Button className="bg-purple--primary mr-1 rounded-lg transition-all hover:bg-purple--secondary absolute" onClick={() => alert('Search Button clicked!')}>
        <CiSearch className="h-8 w-8 text-white" />
      </Button>
      <motion.input
        className="appearance-none w-full h-10 ml-2 rounded-xl border border-lightGray shadow-md text-gray indent-12 focus:border-2 focus:border-gray focus:outline-none"
        type="text"
        placeholder="جستجو برای محصول..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        animate={{ width: isFocused ? "32rem" : "15rem" }} // Adjust these values to fit your design
        initial={{ width: "15rem" }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
