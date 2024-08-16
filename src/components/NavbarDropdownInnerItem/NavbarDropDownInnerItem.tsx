import { motion } from "framer-motion";

export default function NavbarDropdownInnerItem({ title }: { title: string }) {
  return (
    <li className="hover:text-purple--primary hover:cursor-pointer mx-6 transition-colors duration-300">
      <motion.span
        key={title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.span>
    </li>
  );
}
