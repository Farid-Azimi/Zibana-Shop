// "use client";

// import React, { useState } from "react";
// import { FaBars, FaHome, FaListUl, FaBlog, FaPhoneAlt } from "react-icons/fa";
// import { FaPercent } from "react-icons/fa6";
// import NavbarItem from "../NavbarItem/NavbarItem";

// export default function Navbar() {

//   const [isDropDownOpen, setIsDropDownOpen] = useState(false);

//   const handleMouseEnter = () => {
//     setIsDropDownOpen(true);
//   };

//   const handleMouseLeave = () => {
//     setIsDropDownOpen(false);
//   };

//   return (
//     <nav className="bg-white shadow-md">
//       <div className="flex py-3 mx-7 hover:cursor-pointer">
//         <ul className="flex gap-8">
//           <NavbarItem title="دسته بندی محصولات" icon={FaBars} />
//           <NavbarItem title="خانه" icon={FaHome} />
//           <NavbarItem title="لیست کالا ها" icon={FaListUl} />
//           <NavbarItem title="وبلاگ" icon={FaBlog} />
//           <NavbarItem title="تماس با ما" icon={FaPhoneAlt} />
//           <NavbarItem title="شگفت انگیز" icon={FaPercent} />
//         </ul>
//       </div>
//     </nav>
//   );
// }

"use client";

import React, { useState, useRef } from "react";
import { FaBars, FaHome, FaListUl, FaBlog, FaPhoneAlt } from "react-icons/fa";
import { FaPercent } from "react-icons/fa6";
import NavbarItem from "../NavbarItem/NavbarItem";

export default function Navbar() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsDropDownOpen(true);
    }, 100); 
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    const relatedTarget = event.relatedTarget as Node;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      if (dropDownRef.current && !dropDownRef.current.contains(relatedTarget)) {
        setIsDropDownOpen(false);
      }
    }, 500);
  };

  return (
    <nav className="bg-white shadow-md relative">
      {isDropDownOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-30 z-10"></div>
      )}

      <ul className="flex gap-8">
        <NavbarItem
          title="دسته بندی محصولات"
          icon={FaBars}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <NavbarItem title="خانه" icon={FaHome} />
        <NavbarItem title="لیست کالا ها" icon={FaListUl} />
        <NavbarItem title="وبلاگ" icon={FaBlog} />
        <NavbarItem title="تماس با ما" icon={FaPhoneAlt} />
        <NavbarItem title="شگفت انگیز" icon={FaPercent} />
      </ul>

      {isDropDownOpen && (
        <div
          ref={dropDownRef}
          className="absolute left-0 top-full w-full bg-white shadow-lg p-5 flex gap-10 z-20"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ animation: "fadeIn 0.3s ease-in-out" }}
        >
          <ul className="flex gap-5">
            <li className="relative group">
              <a href="#" className="hover:underline">
                زیرمنو 1
              </a>
              <div className="absolute left-0 top-full bg-white shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                زیرمنوی 1 محتوا
              </div>
            </li>
            <li className="relative group">
              <a href="#" className="hover:underline">
                زیرمنو 2
              </a>
              <div className="absolute left-0 top-full bg-white shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                زیرمنوی 2 محتوا
              </div>
            </li>
            <li className="relative group">
              <a href="#" className="hover:underline">
                زیرمنو 3
              </a>
              <div className="absolute left-0 top-full bg-white shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                زیرمنوی 3 محتوا
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}



