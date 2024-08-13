import Link from "next/link";
import { IconType } from "react-icons";
import { motion } from "framer-motion";


interface NavbarItemProps {
  title: string;
  icon: IconType;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function NavbarItem({
  title,
  icon: Icon,
  onMouseEnter,
  onMouseLeave,
}: NavbarItemProps) {
  const variants = {
    initial: { backgroundColor: "#fff" },
    hover: { backgroundColor: "#F1F1F1", transition: { duration: 0.5 } },
  };

  return (
    <motion.li
      className="flex gap-3 p-2 rounded-xl"
      whileHover={variants.hover}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Icon />
      <Link href="#" className="text-sm">
        {title}
      </Link>
    </motion.li>
  );
}