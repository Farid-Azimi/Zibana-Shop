"use client";

import React, { useState } from "react";
import { FaBars, FaHome, FaListUl, FaBlog, FaPhoneAlt } from "react-icons/fa";
import { FaPercent } from "react-icons/fa6";
import NavbarItem from "../NavbarItem/NavbarItem";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";

export default function Navbar() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropDownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropDownOpen(false);
  };

  return (
    <div className="shadow-md pb-1">
      <nav className="relative w-4/5 mx-auto">
        <ul className="flex gap-8">
          <div className="flex">
            <NavbarItem
              title="دسته بندی محصولات"
              icon={FaBars}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              frontIcon={IoIosArrowDown}
            />
          </div>
          <NavbarItem title="خانه" icon={FaHome} />
          <NavbarItem title="لیست کالا ها" icon={FaListUl} />
          <NavbarItem title="وبلاگ" icon={FaBlog} />
          <NavbarItem title="تماس با ما" icon={FaPhoneAlt} />
          <NavbarItem title="شگفت انگیز" icon={FaPercent} />
        </ul>

        {isDropDownOpen && (
          <div
            className="flex absolute right-0 top-full w-full shadow-lg z-20 bg-white rounded-bl-2xl rounded-br-2xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ animation: "fadeIn 0.3s ease-in-out" }}
          >
            <div className="h-full w-[5rem] p-5 rounded-br-2xl">
              <ul className="flex flex-col gap-10">
                <Link href="#">عطر</Link>
                <Link href="#">عطر</Link>
                <Link href="#">عطر</Link>
              </ul>
            </div>
            <div className="bg-veryLightGray w-full rounded-bl-2xl"></div>
          </div>
        )}
      </nav>
      {isDropDownOpen && (
        <div className="fixed bg-lightGray h-full w-screen"></div>
      )}
    </div>
  );
}
