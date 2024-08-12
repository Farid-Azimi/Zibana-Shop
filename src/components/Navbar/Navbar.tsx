"use client";

import React, { useState } from "react";
import { FaBars, FaHome, FaListUl, FaBlog, FaPhoneAlt } from "react-icons/fa";
import { FaPercent } from "react-icons/fa6";
import NavbarItem from "../NavbarItem/NavbarItem";

export default function Navbar() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handleMouseEnter = () => {
    setIsDropDownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropDownOpen(false);
  };
  return (
    <nav className="bg-white shadow-md">
      <div className="flex py-3 mx-7 hover:cursor-pointer">
        <ul className="flex gap-8">
          <NavbarItem title="دسته بندی محصولات" icon={FaBars} />
          <NavbarItem title="خانه" icon={FaHome} />
          <NavbarItem title="لیست کالا ها" icon={FaListUl} />
          <NavbarItem title="وبلاگ" icon={FaBlog} />
          <NavbarItem title="تماس با ما" icon={FaPhoneAlt} />
          <NavbarItem title="شگفت انگیز" icon={FaPercent} />
        </ul>
      </div>
    </nav>
  );
}
