"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NavbarItem from "../NavbarItem/NavbarItem";
import NavbarDropdownItem from "../NavbarDropdownItem/NavbarDropdownItem";
import NavbarDropdownInnerItem from "../NavbarDropdownInnerItem/NavbarDropDownInnerItem";
import dropDownItems from "../../data/navbarItems";
import NavbarDropdownInnerTitle from "../NavbarDropdownInnerTitle/NavbarDropdownInnerTitle";
import { Category } from "../../types/categoryType";

export default function Navbar() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [dropDownItem, setDropDownItem] = useState<Category[]>([]);
  const router = useRouter();

  const handleMouseEnter = () => {
    setIsDropDownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropDownOpen(false);
    setDropDownItem([]);
  };

  const handleCategoryClick = (category: string) => {
    router.push(`/category/${category}`);
  };

  return (
    <div className="shadow-md pb-1">
      <nav className="relative">
        <ul className="flex gap-8">
          <div className="flex">
            <NavbarItem
              title="دسته بندی محصولات"
              icon="FaBars"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              frontIcon="IoIosArrowDown"
            />
          </div>
          <NavbarItem
            title="خانه"
            icon="FaHome"
            href={"/"}
            frontIcon={undefined}
          />
          <NavbarItem
            title="لیست کالا ها"
            icon="FaListUl"
            frontIcon={undefined}
          />
          <NavbarItem title="وبلاگ" icon="FaBlog" frontIcon={undefined} />
          <NavbarItem
            title="تماس با ما"
            icon="FaPhoneAlt"
            frontIcon={undefined}
          />
          <NavbarItem
            title="شگفت انگیز"
            icon="FaPercent"
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
                    icon="FaSprayCan"
                    title="عطر"
                    link="/categories/عطر"
                    data={"perfume"}
                    handleDropDownItem={setDropDownItem}
                    dropDownData={dropDownItems}
                    onClick={() => handleCategoryClick("عطر")}
                  />
                  <NavbarDropdownItem
                    icon="FaPumpSoap"
                    title="بهداشتی"
                    link="/categories/بهداشتی"
                    data={"sanitary"}
                    handleDropDownItem={setDropDownItem}
                    dropDownData={dropDownItems}
                    onClick={() => handleCategoryClick("بهداشتی")}
                  />
                  {/* <NavbarDropdownItem
                    icon="GiLips"
                    title="آرایشی"
                    link="#"
                    data={"makeup"}
                    handleDropDownItem={setDropDownItem}
                    dropDownData={dropDownItems}
                    onClick={() => handleCategoryClick("makeup")} 
                  /> */}
                  <NavbarDropdownItem
                    icon="FaMortarPestle"
                    title="مو"
                    link="/categories/مو"
                    data={"hair"}
                    handleDropDownItem={setDropDownItem}
                    dropDownData={dropDownItems}
                    onClick={() => handleCategoryClick("مو")}
                  />
                  {/* <NavbarDropdownItem
                    icon="FaPlug"
                    title="لوازم برقی"
                    link="#"
                    data={"electric"}
                    handleDropDownItem={setDropDownItem}
                    dropDownData={dropDownItems}
                    onClick={() => handleCategoryClick("electric")} 
                  /> */}
                  {/* <NavbarDropdownItem
                    icon="FaStar"
                    title="مد و فشن"
                    link="#"
                    data={"mod"}
                    handleDropDownItem={setDropDownItem}
                    dropDownData={dropDownItems}
                    onClick={() => handleCategoryClick("mod")}
                  /> */}
                </ul>
              </div>
              <div className="bg-veryLightGray w-full rounded-bl-2xl h-full flex flex-col justify-center">
                <div className="w-full h-[15rem]">
                  <div className="h-full">
                    <ul className="h-full w-[15rem] text-sm text-textLightGray mx-10 flex flex-col flex-wrap">
                      {dropDownItem.map((item, index) => (
                        <React.Fragment key={index}>
                          <NavbarDropdownInnerTitle title={item.title} />
                          {item.items.map((subItem, subIndex) => (
                            <NavbarDropdownInnerItem key={subIndex} title={subItem} />
                          ))}
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
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
