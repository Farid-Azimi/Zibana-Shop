"use client";

import Link from "next/link";
import { useState } from "react";
import { IconType } from "react-icons";
import { FaCaretLeft } from "react-icons/fa";
import { Category as CategoryItem } from "../../types/categoryType"

type DropDownData = {
  perfume: CategoryItem[];
  sanitary: CategoryItem[];
  makeup: CategoryItem[];
  hair: CategoryItem[];
  electric: CategoryItem[];
  mod: CategoryItem[];
};

export default function NavbarDropdownItem({
  icon: Icon,
  title,
  link,
  handleDropDownItem,
  dropDownData,
  data,
}: {
  icon: IconType;
  title: string;
  link: string;
  handleDropDownItem: React.Dispatch<React.SetStateAction<CategoryItem[]>>;
  dropDownData: DropDownData;
  data: keyof DropDownData;
}) {
  const [isHovered, setIsHover] = useState(false);

  return (
    <div className="relative flex">
      <li
        onMouseEnter={() => {
          setIsHover(true);
          handleDropDownItem(dropDownData[data]);
        }}
        onMouseLeave={() => setIsHover(false)}
        className="flex flex-row gap-3 justify-start transition-colors duration-300 hover:text-purple--primary hover:cursor-pointer text-textGray"
      >
        <Icon className="w-4 h-4" />
        <Link className="text-center text-sm" href={link}>
          {title}
        </Link>
      </li>
      <FaCaretLeft
        className={`absolute text-xl z-50 text-purple--dark h-6 w-6 right-[110%] transition-opacity duration-300 ease-in-out ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
