import Link from "next/link";
import { IconType } from "react-icons";
import { motion } from "framer-motion";

export default function NavbarItem({
  title,
  icon: Icon,
}: {
  title: string;
  icon: IconType;
}) {
  const variants = {
    initial: { backgroundColor: "#fff" },
    hover: { backgroundColor: "#F1F1F1", transition: { duration: 0.5 } },
  };
  return (
    <motion.li
      className="flex gap-3  p-2 rounded-xl"
      whileHover={variants.hover}
    >
      <Icon />
      <Link href="#" className=" text-sm">
        {title}
      </Link>
    </motion.li>
  );
}
