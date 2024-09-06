"use client";
import { useState } from "react";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import Image from "next/image";
import { products } from "../../data/productData";

const cartItems = products.map((product) => ({
  product: product,
  quantity: 1,
}));

export default function CartDropdown() {
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const handleUserCartClick = () => {
    setIsCartDropdownOpen(true);
  };

  const closeCartDropdown = () => {
    setIsCartDropdownOpen(false);
  };

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <Button
        className="flex gap-3 relative px-4 py-2 hover:bg-veryLightGray rounded-xl transition duration-300 ease-in-out"
        onClick={handleUserCartClick}
      >
        <div>
          <p className="text-[10px] text-gray">سبد خرید</p>
          {cartItems.length === 0 && (
            <p className=" text-xs mt-1 font-bold">خالی است</p>
          )}
        </div>
        <span className="absolute text-xs font-semibold bg-purple--primary p-1 rounded-full bottom-[60%] left-[28%] h-auto w-auto text-white text-center">
          {totalQuantity}
        </span>
        <Icon name={"IoBagHandleOutline"} className={"w-8 h-8"} />
      </Button>

      {isCartDropdownOpen && (
        <>
          <div
            className={`fixed inset-0 z-50 flex ${
              isCartDropdownOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300`}
          >
            <div
              className="bg-gray bg-opacity-50 w-full"
              onClick={closeCartDropdown}
            ></div>

            <div className="relative w-[30%] bg-white flex flex-col">
              <div className="flex justify-between items-center border-solid border-b-2 border-lightGray p-4 sticky top-0 bg-white">
                <div className="flex items-end gap-2">
                  <Icon
                    name={"IoBagHandleOutline"}
                    className={"text-lightGray"}
                    size={25}
                  />
                  <h2 className="text-sm text-lightGray font-semibold">
                    سبد خرید ( {cartItems.length} کالا )
                  </h2>
                </div>
                <Button
                  onClick={closeCartDropdown}
                  className="top-0 left-0 hover:text-lightGray"
                >
                  <Icon name={"CiSquareRemove"} className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto pr-3">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex space-x-4 items-center"
                  >
                    <div className="w-16 h-16 relative">
                      <Image
                        src={item.product.imageSrc}
                        alt={item.product.name}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium py-2">
                        {item.product.name}
                      </h3>
                      {item.product.hasDiscount && (
                        <>
                          <p className="text-[#4cd137] font-bold">
                            {item.product.discountedPrice} تومان
                          </p>
                        </>
                      )}
                      <p
                        className={`text-gray ${
                          item.product.hasDiscount ? "line-through text-xs" : ""
                        }`}
                      >
                        {item.product.originalPrice} تومان
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Icon
                        name={"FaPlus"}
                        className="p-1 border rounded hover:cursor-pointer"
                        size={
                          hoveredIcon === `FaPlus-${item.product.id}` ? 27 : 25
                        }
                        onMouseEnter={() =>
                          setHoveredIcon(`FaPlus-${item.product.id}`)
                        }
                        onMouseLeave={() => setHoveredIcon(null)}
                      />
                      <span className="px-2">{item.quantity}</span>
                      <Icon
                        name={
                          hoveredIcon === `FaTrashCan-${item.product.id}`
                            ? "FaTrashCan"
                            : "FaRegTrashCan"
                        }
                        className="p-1 border rounded hover:cursor-pointer"
                        size={
                          hoveredIcon === `FaTrashCan-${item.product.id}`
                            ? 27
                            : 25
                        }
                        onMouseEnter={() =>
                          setHoveredIcon(`FaTrashCan-${item.product.id}`)
                        }
                        onMouseLeave={() => setHoveredIcon(null)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="shadow-2xl shadow-gray flex flex-col items-center p-4 sticky bottom-0 bg-white">
                <p className="text-sm text-gray m-2">
                  مبلغ قابل پرداخت:{" "}
                  <span className="font-bold text-black text-lg">
                    ۲۹۹,۶۰۰ تومان
                  </span>
                </p>
                <p className="text-xs text-[#4cd137] font-semibold m-2">
                  میزان سود شما از این خرید ۵۰,۴۰۰ تومان می‌باشد.
                </p>
                <Button className="bg-[#f8a5c2] text-white text-semibold p-3 rounded m-4 hover:shadow-md hover:text-textGray">
                  مشاهده و تکمیل سفارش
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
