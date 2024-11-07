"use client";
import Image from "next/image";
import SearchBox from "../SearchBox/SearchBox";
import Navbar from "../Navbar/Navbar";
import zibanaLogo from "../../images/Zibana-logo.png";
import Login from "../Login/Login";
import CartDropdown from "../CartDropdown/CartDropdown";
import { useUserStore } from "../../stores/useUserStore";

export default function Header() {
  const { userId, clearUser } = useUserStore();

  const handleLogout = () => {
    clearUser();
  };

  return (
    <>
      <header>
        <div className="flex justify-between">
          <div className="flex gap-14">
            <Image src={zibanaLogo.src} width={200} height={200} alt="Logo" />
            <SearchBox />
          </div>

          <div className="flex justify-end my-auto relative gap-2">
            {userId ? (
              <>
                {" "}
                <div className="relative">
                  <button className="flex items-center space-x-2">
                    {/* <Image
                  src={user.profileImage || "/default-user-icon.png"} // فرض بر اینکه کاربر تصویر پروفایل دارد
                  alt="User profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                /> */}
                    <span>{userId}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-md">
                    <ul className="py-1">
                      <li className="px-4 py-2">پیگیری سفارشات</li>
                      <li className="px-4 py-2">علاقه‌مندی‌های من</li>
                      <li className="px-4 py-2">نقد و بررسی</li>
                      <li className="px-4 py-2 border-t" onClick={handleLogout}>
                        خروج از حساب کاربری
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <Login />
            )}
            <CartDropdown />
          </div>
        </div>
        <Navbar />
      </header>
    </>
  );
}
