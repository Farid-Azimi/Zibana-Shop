import React from "react";
import Icon from "../Icon/Icon";
import Image from "next/image";
import zibanaLogo from "../../images/Zibana-logo.png";

export default function Footer() {
  return (
    <>
      <footer className="py-4 mt-16 border-solid border-t border-veryLightGray relative">
        <div className="absolute right-10 top-0 transform -translate-y-1/2 flex items-center">
          <hr className="border-t border-veryLightGray w-full" />
          <Image
            src={zibanaLogo.src}
            width={150}
            height={150}
            alt="Logo"
            className="ml-4"
          />
        </div>
        <div className="max-w-6xl mr-10 mt-4 px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-4">
            <div>
              <h4 className="text-lg mb-4">دسترسی سریع</h4>
              <ul className="space-y-3 text-sm text-gray">
                <li className="hover:text-purple-500 hover:cursor-pointer transition-all">
                  لوازم آرایشی
                </li>
                <li className="hover:text-purple-500 hover:cursor-pointer transition-all">
                  مراقبت از پوست
                </li>
                <li className="hover:text-purple-500 hover:cursor-pointer transition-all">
                  بهداشت خانگی
                </li>
                <li className="hover:text-purple-500 hover:cursor-pointer transition-all">
                  مراقبت از کودکان
                </li>
                <li className="hover:text-purple-500 hover:cursor-pointer transition-all">
                  لوازم بهداشتی
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg mb-4">درباره زیبانا</h4>
              <ul className="space-y-3 text-sm text-gray">
                <li className="hover:text-purple-500 hover:cursor-pointer transition-all">
                  درباره ما
                </li>
                <li className="hover:text-purple-500 hover:cursor-pointer transition-all">
                  تماس با ما
                </li>
                <li className="hover:text-purple-500 hover:cursor-pointer transition-all">
                  سوالات متداول
                </li>
                <li className="hover:text-purple-500 hover:cursor-pointer transition-all">
                  فرصت‌های شغلی
                </li>
                <li className="hover:text-purple-500 hover:cursor-pointer transition-all">
                  فروشنده شوید
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg mb-4">راهنمای خرید</h4>
              <ul className="space-y-3 text-sm text-gray">
                <li className="hover:text-purple-500 hover:cursor-pointer transition-all">
                  نحوه ثبت سفارش
                </li>
                <li className="hover:text-purple-500 hover:cursor-pointer transition-all">
                  روش‌های پرداخت
                </li>
                <li className="hover:text-purple-500 hover:cursor-pointer transition-all">
                  شیوه‌های ارسال
                </li>
                <li className="hover:text-purple-500 hover:cursor-pointer transition-all">
                  شرایط مرجوعی
                </li>
              </ul>
            </div>

            <div className="text-center mb-8 space-y-20">
              <div>
                <h4 className="text-base mb-4">با ما در ارتباط باشید</h4>
                <div className="flex justify-center space-x-6 mb-4">
                  <Icon
                    name="FaInstagram"
                    className="text-[#3d3d3d] hover:text-gray cursor-pointer ml-6"
                  />
                  <Icon
                    name="FaTwitter"
                    className="text-[#3d3d3d] hover:text-gray cursor-pointer"
                  />
                  <Icon
                    name="FaTelegram"
                    className="text-[#3d3d3d] hover:text-gray cursor-pointer"
                  />
                  <Icon
                    name="FaLinkedin"
                    className="text-[#3d3d3d] hover:text-gray cursor-pointer"
                  />
                  <Icon
                    name="FaWhatsapp"
                    className="text-[#3d3d3d] hover:text-gray cursor-pointer"
                  />
                </div>
              </div>

              <div className="w-96 mx-auto">
                <p className="text-xs text-lightGray mb-2">
                  برای اطلاع از آخرین تخفیف ها، ایمیل خود را ثبت نمایید
                </p>
                <input
                  type="email"
                  placeholder="ثبت ایمیل"
                  className="w-full border rounded-md px-4 py-2 mb-4 text-right"
                />
                <div className="flex justify-end">
                  <button className="bg-[#3d3d3d] text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray">
                    تایید
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex text-center text-sm text-[#555454]">
            <Icon name="MdPhoneInTalk" size={25} />
            <p className="my-1">
              پشتیبانی زیبانا: 021-915053343 و 021-915553343 | شنبه تا چهارشنبه
              از ساعت 9 الی 24 و پنجشنبه‌ها از 9 الی 22
            </p>
          </div>
          <p className="flex justify-center text-xs text-lightGray mt-6">
            استفاده از مطالب فروشگاه اینترنتی زیبانا فقط برای مقاصد غیرتجاری و
            باذکر منبع بلامانع است. کلیه حقوق این سایت متعلق به شرکت فتزی می
            باشد.
          </p>
        </div>
      </footer>
    </>
  );
}
