import { motion } from "framer-motion";
import Icon from "../Icon/Icon";
import { IconType } from "react-icons";
type IconName =
  | "FaBars"
  | "IoIosArrowDown"
  | "FaHome"
  | "FaListUl"
  | "FaBlog"
  | "FaPhoneAlt"
  | "FaPercent";

interface NavbarItemProps {
  title: string;
  icon: IconName | IconType;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  frontIcon?: IconName;
  onClick?: () => void;
}

export default function NavbarItem({
  title,
  icon,
  onMouseEnter,
  onMouseLeave,
  frontIcon,
  onClick,
}: NavbarItemProps) {
  const variants = {
    initial: { backgroundColor: "#fff" },
    hover: { backgroundColor: "#F1F1F1", transition: { duration: 0.5 } },
  };

  return (
    <motion.li
      className="flex gap-3 p-2 rounded-xl cursor-pointer text-textGray text-sm"
      whileHover={variants.hover}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <Icon name={icon as IconName} size={20} />
        {title}
      {frontIcon && <Icon name={frontIcon} size={20} />}
    </motion.li>
  );
}
