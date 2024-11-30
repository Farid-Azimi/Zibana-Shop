"use client";

import Link from "next/link";
import { useState } from "react";
import { Category as CategoryItem } from "../../types/categoryType";
import Icon from "../Icon/Icon";

type DropDownData = {
  perfume: CategoryItem[];
  sanitary: CategoryItem[];
  makeup: CategoryItem[];
  hair: CategoryItem[];
  electric: CategoryItem[];
  mod: CategoryItem[];
};

export default function NavbarDropdownItem({
  icon,
  title,
  link,
  handleDropDownItem,
  dropDownData,
  data,
}: {
  icon: string;
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
        <Icon name={icon} className="w-4 h-4" />
        <Link className="text-center text-sm" href={link}>
          {title}
        </Link>
      </li>
      <Icon
        name={"FaCaretLeft"}
        className={`absolute text-xl z-50 text-purple--dark h-6 w-6 right-[110%] transition-opacity duration-300 ease-in-out ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
