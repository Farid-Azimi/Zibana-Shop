"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import SearchDropdownMenu from "../SearchDropdownMenu/SearchDropdownMenu";

export default function SearchBox() {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };
  
  return (
    <div className="relative flex items-center transition-all duration-300">
      <Button
        className="bg-purple--primary mr-1 rounded-lg transition-all hover:bg-purple--secondary absolute"
        onClick={() => alert("Search Button clicked!")}
      >
        <Icon name="CiSearch" className="h-8 w-8 text-white" />
      </Button>
      <motion.input
        className="appearance-none w-full h-10 ml-2 rounded-xl border border-lightGray shadow-md text-gray indent-12 focus:border-2 focus:border-gray focus:outline-none"
        type="text"
        placeholder="جستجو برای محصول..."
        onFocus={() => setIsFocused(true)}
        onChange={handleInputChange}
        animate={{ width: isFocused ? "32rem" : "15rem" }}
        initial={{ width: "15rem" }}
        transition={{ duration: 0.3 }}
      />
      {query && <SearchDropdownMenu query={query} />}
    </div>
  );
}