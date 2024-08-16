"use client";

import React, { useState } from "react";
import {
  FaBars,
  FaHome,
  FaListUl,
  FaBlog,
  FaPhoneAlt,
  FaSprayCan,
  FaPumpSoap,
  FaMortarPestle,
  FaPlug,
  FaStar,
} from "react-icons/fa";
import { GiLips } from "react-icons/gi";
import { FaPercent } from "react-icons/fa6";
import NavbarItem from "../NavbarItem/NavbarItem";
import { IoIosArrowDown } from "react-icons/io";
import NavbarDropdownItem from "../NavbarDropdownItem/NavbarDropdownItem";
import NavbarDropdownInnerItem from "../NavbarDropdownInnerItem/NavbarDropDownInnerItem";

const dropDownData = {
  perfume: ["ادکلن", "ادکلن", "ادکلن", "ادکلن", "ادکلن"],
  sanitary: [
    "بهداشتی",
    "بهداشتی",
    "بهداشتی",
    "بهداشتی",
    "بهداشتی",
    "بهداشتی",
    "بهداشتی",
    "بهداشتی",
    "بهداشتی",
    "بهداشتی",
    "بهداشتی",
    "بهداشتی",
    "بهداشتی",
    "بهداشتی",
    "بهداشتی",
  ],
  makeup: [
    "آرایشی",
    "آرایشی",
    "آرایشی",
    "آرایشی",
    "آرایشی",
    "آرایشی",
    "آرایشی",
  ],
  hair: [
    "مو",
    "مو",
    "مو",
    "مو",
    "مو",
    "مو",
    "مو",
    "مو",
    "مو",
    "مو",
    "مو",
    "مو",
    "مو",
    "مو",
  ],
  electric: [
    "الکتریک",
    "الکتریک",
    "الکتریک",
    "الکتریک",
    "الکتریک",
    "الکتریک",
    "الکتریک",
    "الکتریک",
    "الکتریک",
    "الکتریک",
    "الکتریک",
    "الکتریک",
    "الکتریک",
    "الکتریک",
    "الکتریک",
    "الکتریک",
    "الکتریک",
  ],
  mod: [
    "مد",
    "مد",
    "مد",
    "مد",
    "مد",
    "مد",
    "مد",
    "مد",
    "مد",
    "مد",
    "مد",
    "مد",
    "مد",
    "مد",
  ],
};

export default function Navbar() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [dropDownItem, setDropDownItem] = useState<string[]>([]);

  const handleMouseEnter = () => {
    setIsDropDownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropDownOpen(false);
    setDropDownItem([]);
  };

  return (
    <div className="shadow-md pb-1">
      <nav className="relative">
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
          <NavbarItem title="خانه" icon={FaHome} frontIcon={undefined} />
          <NavbarItem
            title="لیست کالا ها"
            icon={FaListUl}
            frontIcon={undefined}
          />
          <NavbarItem title="وبلاگ" icon={FaBlog} frontIcon={undefined} />
          <NavbarItem
            title="تماس با ما"
            icon={FaPhoneAlt}
            frontIcon={undefined}
          />
          <NavbarItem
            title="شگفت انگیز"
            icon={FaPercent}
            frontIcon={undefined}
          />
        </ul>

        {isDropDownOpen && (
          <div className="flex justify-center">
            <div
              className="flex absolute top-full w-[99%] h-[18rem] shadow-lg z-20 bg-white rounded-bl-2xl rounded-br-2xl "
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ animation: "fadeIn 0.3s ease-in-out" }}
            >
              <div className="h-full w-[8rem] p-4">
                <ul className="flex flex-col align-middle gap-6 text-sm">
                  <NavbarDropdownItem
                    icon={FaSprayCan}
                    title="عطر"
                    link="#"
                    handleDropDownItem={setDropDownItem}
                    data={"perfume"}
                    dropDownData={dropDownData}
                  />
                  <NavbarDropdownItem
                    icon={FaPumpSoap}
                    title="بهداشتی"
                    link="#"
                    data={"sanitary"}
                    handleDropDownItem={setDropDownItem}
                    dropDownData={dropDownData}
                  />
                  <NavbarDropdownItem
                    icon={GiLips}
                    title="آرایشی"
                    link="#"
                    data={"makeup"}
                    handleDropDownItem={setDropDownItem}
                    dropDownData={dropDownData}
                  />
                  <NavbarDropdownItem
                    icon={FaMortarPestle}
                    title="مو"
                    link="#"
                    data={"hair"}
                    handleDropDownItem={setDropDownItem}
                    dropDownData={dropDownData}
                  />
                  <NavbarDropdownItem
                    icon={FaPlug}
                    title="لوازم برقی"
                    link="#"
                    data={"electric"}
                    handleDropDownItem={setDropDownItem}
                    dropDownData={dropDownData}
                  />
                  <NavbarDropdownItem
                    icon={FaStar}
                    title="مد و فشن"
                    link="#"
                    data={"mod"}
                    handleDropDownItem={setDropDownItem}
                    dropDownData={dropDownData}
                  />
                </ul>
              </div>
              <div className="bg-veryLightGray w-full rounded-bl-2xl h-full flex flex-col justify-center">
                <div className="mx-7 h-[15rem]">
                  <ul className="flex flex-col w-[5rem] h-full flex-wrap gap-4 text-sm text-textLightGray">
                    {dropDownItem.map((item) => {
                      return <NavbarDropdownInnerItem title={item} />;
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
      {isDropDownOpen && (
        <div className="fixed h-full w-screen bg-lightGray bg-opacity-70 z-10"></div>
      )}
    </div>
  );
}
