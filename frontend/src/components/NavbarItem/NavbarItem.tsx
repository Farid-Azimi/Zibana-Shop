import Link from "next/link";
import { motion } from "framer-motion";
import Icon from "../Icon/Icon"; 

interface NavbarItemProps {
  title: string;
  icon: string; 
  href?: string;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  frontIcon?: string;
}

export default function NavbarItem({
  title,
  icon,
  href = "/",
  onMouseEnter,
  onMouseLeave,
  frontIcon,
}: NavbarItemProps) {
  const variants = {
    initial: { backgroundColor: "#fff" },
    hover: { backgroundColor: "#F1F1F1", transition: { duration: 0.5 } },
  };

  return (
    <motion.li
      className="flex gap-3 p-2 rounded-xl cursor-pointer text-textGray"
      whileHover={variants.hover}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Icon name={icon} size={20}/>
      <Link href={href} passHref className="text-sm">
        {title}
      </Link>
      {frontIcon && <Icon name={frontIcon} size={20}/>}
    </motion.li>
  );
}