"use client";

import { FiLogOut, FiSettings, FiHeart, FiUser } from "react-icons/fi";
import { useUserStore } from "@/stores/useUserStore";
export default function AccountSidebar() {
  const { firstName } = useUserStore();
  return (
    <aside className="w-64 p-6 bg-white rounded-xl shadow-lg">
      <header className="flex items-center space-x-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {firstName} عزیز، خوش آمدید
          </h2>
        </div>
      </header>
      <nav>
        <ul className="space-y-3">
          <li>
            <a
              href="/dashboard"
              className="flex items-center px-4 py-2 text-gray-700 rounded hover:bg-blue-50 transition duration-200"
            >
              <FiUser className="text-lg" />
              <span className="mr-3">پیشخوان</span>
            </a>
          </li>
          <li>
            <a
              href="/wishlist"
              className="flex items-center px-4 py-2 text-gray-700 rounded hover:bg-blue-50 transition duration-200"
            >
              <FiHeart className="text-lg" />
              <span className="mr-3">لیست علاقه‌مندی‌ها</span>
            </a>
          </li>
          <li>
            <a
              href="/settings"
              className="flex items-center px-4 py-2 text-gray-700 rounded hover:bg-blue-50 transition duration-200"
            >
              <FiSettings className="text-lg" />
              <span className="mr-3">تغییر رمز</span>
            </a>
          </li>
          <li>
            <a
              href="/logout"
              className="flex items-center px-4 py-2 text-red-600 rounded hover:bg-red-50 transition duration-200"
            >
              <FiLogOut className="text-lg" />
              <span className="mr-3">خروج از حساب</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
