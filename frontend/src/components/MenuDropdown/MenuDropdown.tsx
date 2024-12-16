import React, { useState } from "react";
import { motion } from "framer-motion";

interface DropdownProps {
  items: { title: string; subItems: string[] }[];
}

const Dropdown: React.FC<DropdownProps> = ({ items }) => {
  const [subMenuOpen, setSubMenuOpen] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute left-0 mt-2 w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg z-50"
    >
      <ul className="flex flex-col p-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="relative p-2 hover:bg-gray-100 hover:cursor-pointer"
            onMouseEnter={() => setSubMenuOpen(item.title)}
            onMouseLeave={() => setSubMenuOpen(null)}
          >
            {item.title}
            {subMenuOpen === item.title && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="absolute top-0 right-[200px] mt-0 w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              >
                <ul className="p-2">
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex} className="p-2 hover:bg-gray-100">
                      {subItem}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Dropdown;
