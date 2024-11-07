import React, { useState } from "react";
import NavbarItem from "../NavbarItem/NavbarItem";
import Dropdown from "../MenuDropdown/MenuDropdown";
import { IconType } from "react-icons";

interface DropdownTriggerProps {
  title: string;
  icon: IconType;
  dropdownItems: { title: string; subItems: string[] }[];
}

const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  title,
  icon,
  dropdownItems,
}) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropDownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropDownOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavbarItem title={title} icon={icon} />
      {isDropDownOpen && <Dropdown items={dropdownItems} />}
    </div>
  );
};

export default DropdownTrigger;
