import { motion } from "framer-motion";

export default function NavbarDropdownInnerTitle({ title }: { title: string }) {
  return (
    <li className="hover:text-purple--primary hover:cursor-pointer transition-colors duration-300 font-bold text-black my-3 border-solid border-r-2 border-purple--primary mx-8">
      <motion.span
        className="mr-2"
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
