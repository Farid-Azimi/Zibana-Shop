import Link from "next/link";
import { IconType } from "react-icons";
import { motion } from "framer-motion";

interface NavbarItemProps {
  title: string;
  icon: IconType;
  href?: string;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  frontIcon: IconType | undefined;
}

export default function NavbarItem({
  title,
  icon: Icon,
  href = "/",
  onMouseEnter,
  onMouseLeave,
  frontIcon: FrontIcon,
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
      <Icon />
      <Link href={href} passHref className="text-sm">
        {title}
      </Link>
      {FrontIcon && <FrontIcon />}
    </motion.li>
  );
}
