import { FiLogOut, FiSettings, FiHeart, FiUser } from "react-icons/fi";

export default function AccountSidebar() {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <div className="flex items-center space-x-2 mb-4">
        <div className="bg-gray-200 w-16 h-16 rounded-full"></div>
        <div>
          <p className="font-semibold">کاربر گرامی</p>
          <p className="text-sm text-gray-500">حساب کاربری شما</p>
        </div>
      </div>
      <ul className="space-y-2">
        <li className="flex items-center space-x-2">
          <FiUser />
          <span>پیشخوان</span>
        </li>
        <li className="flex items-center space-x-2">
          <FiHeart />
          <span>لیست علاقه‌مندی‌ها</span>
        </li>
        <li className="flex items-center space-x-2">
          <FiSettings />
          <span>تغییر رمز</span>
        </li>
        <li className="flex items-center space-x-2 text-red-500">
          <FiLogOut />
          <span>خروج از حساب</span>
        </li>
      </ul>
    </div>
  );
}
