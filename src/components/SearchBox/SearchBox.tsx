import React from "react";
import Button from "../Button/Button";
import { CiSearch } from "react-icons/ci";

export default function SearchBox() {
  return (
    <div className="relative flex items-center">
      <Button>
        <CiSearch className="h-8 w-8 text-white" />
      </Button>
      <input
        className=" transition-all duration-300 w-full h-10 ml-2 rounded-xl border border-lightGray shadow-md text-gray indent-12 focus:border-2 focus:border-gray focus:w-[25rem]"
        type="text"
        placeholder="جستجو برای محصول..."
      />
    </div>
  );
}
