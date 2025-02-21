"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import SearchDropdownMenu from "../SearchDropdownMenu/SearchDropdownMenu";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState<string>("");
  const searchBoxRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      searchBoxRef.current &&
      !searchBoxRef.current.contains(event.target as Node)
    ) {
      setQuery("");
      setIsFocused(false);
    }
  }, []);

  const handleSearch = useCallback(() => {
    router.push(`/search?q=${query}`);
    setQuery("");
    setIsFocused(false);
  }, [query, router]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    []
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const animationStyle = useMemo(
    () => ({
      width: isFocused ? "32rem" : "15rem",
    }),
    [isFocused]
  );

  return (
    <div
      ref={searchBoxRef}
      className="relative flex items-center transition-all duration-300"
    >
      <Button
        className="bg-purple--primary mr-1 rounded-lg transition-all hover:bg-purple--secondary absolute"
        onClick={handleSearch}
      >
        <Icon name="CiSearch" className="h-8 w-8 text-white" />
      </Button>
      <motion.input
        value={query}
        className="appearance-none w-full h-10 ml-2 rounded-xl border border-lightGray shadow-md text-gray indent-12 focus:border-2 focus:border-gray focus:outline-none"
        type="text"
        placeholder="جستجو برای محصول..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          if (!query) {
            setIsFocused(false);
          }
        }}
        onChange={handleInputChange}
        animate={animationStyle}
        initial={{ width: "15rem" }}
        transition={{ duration: 0.3 }}
      />
      {query && (
        <SearchDropdownMenu
          query={query}
          setQuery={setQuery}
          setIsFocused={setIsFocused}
        />
      )}
    </div>
  );
}
