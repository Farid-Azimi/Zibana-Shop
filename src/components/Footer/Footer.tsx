import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaTelegram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";


export default function Footer() {
  return (
    <>
      <footer className="bg-veryLightGray py-8">
        {" "}
        <div className="max-w-6xl mx-auto px-4">
          {/* Links Section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">دسترسی سریع</h4>
              <ul className="space-y-2">
                <li>لوازم آرایشی</li>
                <li>مراقبت از پوست</li>
                <li>بهداشت خانگی</li>
                <li>مراقبت از کودکان</li>
                <li>لوازم بهداشتی</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">درباره زیبانا</h4>
              <ul className="space-y-2">
                <li>درباره ما</li>
                <li>تماس با ما</li>
                <li>سوالات متداول</li>
                <li>فرصت‌های شغلی</li>
                <li>فروشنده شوید</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">راهنمای خرید</h4>
              <ul className="space-y-2">
                <li>نحوه ثبت سفارش</li>
                <li>روش‌های پرداخت</li>
                <li>شیوه‌های ارسال</li>
                <li>شرایط مرجوعی</li>
              </ul>
            </div>
          </div>

          {/* Social Media and Newsletter Section */}
          <div className="text-center mb-8">
            <h4 className="text-lg font-semibold mb-4">
              با ما در ارتباط باشید
            </h4>
            <div className="flex justify-center space-x-6 mb-4">
              <FaInstagram className="text-gray-600 hover:text-gray-800 cursor-pointer" />
              <FaTwitter className="text-gray-600 hover:text-gray-800 cursor-pointer" />
              <FaTelegram className="text-gray-600 hover:text-gray-800 cursor-pointer" />
              <FaLinkedin className="text-gray-600 hover:text-gray-800 cursor-pointer" />
              <FaWhatsapp className="text-gray-600 hover:text-gray-800 cursor-pointer" />
            </div>
            <div className="max-w-md mx-auto">
              <input
                type="email"
                placeholder="ثبت ایمیل"
                className="w-full border rounded-lg px-4 py-2 mb-4 text-right"
              />
              <button className="bg-gray text-white px-4 py-2 rounded-lg">
                ثبت ایمیل
              </button>
            </div>
          </div>

          {/* Footer Bottom Section */}
          <div className="border-t pt-4 text-center text-sm text-gray-600">
            <p>
              پشتیبانی زیبانا: 021-915053343 و 021-915553343 | شنبه تا چهارشنبه
              از ساعت 9 الی 24 و پنجشنبه‌ها از 9 الی 22
            </p>
            <p className="mt-2">
              کلیه حقوق این سایت متعلق به شرکت فتزی می‌باشد.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
