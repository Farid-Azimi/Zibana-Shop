import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function NavbarDropdownInnerTitle({ title }: { title: string }) {
  const router = useRouter();
  return (
    <li className="hover:text-purple--primary hover:cursor-pointer transition-colors duration-300 font-bold text-black my-3 border-solid border-r-2 border-purple--primary mx-8">
      <motion.span
        className="mr-2"
        key={title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={() => {
          router.push(`/categories/${title}`);
        }}
      >
        {title}
      </motion.span>
    </li>
  );
}
