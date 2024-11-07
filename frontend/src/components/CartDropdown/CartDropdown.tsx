"use client";
import { useState } from "react";
import { useCartStore } from "../../stores/useCartOperationStore";
import { calculateCartTotals } from "../../stores/useCartTotalStore";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import Image from "next/image";
import Link from "next/link";

export default function CartDropdown() {
  const { cartItems, addToCart, removeFromCart, decreaseQuantity } =
    useCartStore();
  const { totalPrice, totalDiscount, totalQuantity } = calculateCartTotals(cartItems);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const handleUserCartClick = () => {
    setIsCartDropdownOpen(true);
  };

  const closeCartDropdown = () => {
    setIsCartDropdownOpen(false);
  };

  return (
    <>
      <Button
        className="flex gap-3 relative px-4 py-2 hover:bg-veryLightGray rounded-xl transition duration-300 ease-in-out"
        onClick={handleUserCartClick}
      >
        <div>
          <p className="text-[10px] text-gray">سبد خرید</p>
          {cartItems.length === 0 ? (
            <p className="text-xs mt-1 font-bold">خالی است</p>
          ) : (
            <p className="text-xs mt-1 font-bold">{totalPrice} تومان</p>
          )}
        </div>
        <span className="absolute text-xs font-semibold bg-purple--primary p-1 rounded-lg bottom-6 left-9 text-white text-center shadow-lg">
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
                    سبد خرید ( {totalQuantity} کالا )
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
                      <Link
                        key={item.product.id}
                        href={`/product/${item.product.id}`}
                        passHref
                      >
                        <h3 className="text-sm font-medium py-2">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p
                        className={` ${
                          item.product.hasDiscount
                            ? "text-gray line-through text-xs"
                            : "text-[#313131] text-sm font-semibold"
                        }`}
                      >
                        {item.product.originalPrice} تومان
                      </p>
                      {item.product.hasDiscount && (
                        <>
                          <p className="text-[#313131] text-sm font-semibold">
                            {item.product.discountedPrice} تومان
                          </p>
                        </>
                      )}
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
                        onClick={() => addToCart(item.product.id)}
                      />
                      <span className="px-2">{item.quantity}</span>
                      {item.quantity > 1 ? (
                        <Icon
                          name={"FaMinus"}
                          className="p-1 border rounded hover:cursor-pointer"
                          size={
                            hoveredIcon === `FaMinus-${item.product.id}`
                              ? 27
                              : 25
                          }
                          onMouseEnter={() =>
                            setHoveredIcon(`FaMinus-${item.product.id}`)
                          }
                          onMouseLeave={() => setHoveredIcon(null)}
                          onClick={() => decreaseQuantity(item.product.id)}
                        />
                      ) : (
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
                          onClick={() => removeFromCart(item.product.id)}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="shadow-2xl shadow-gray flex flex-col items-center p-4 sticky bottom-0 bg-white">
                <p className="text-sm text-gray m-2">
                  مبلغ قابل پرداخت:{" "}
                  <span className="font-bold text-black text-lg">
                    {totalPrice} تومان
                  </span>
                </p>
                <p className="text-xs text-[#4cd137] font-semibold m-2">
                  میزان سود شما از این خرید {totalDiscount} تومان می‌باشد.
                </p>
                <Link href="/cart">
                  <Button className="bg-[#f8a5c2] text-white text-semibold p-3 rounded m-4 hover:shadow-md hover:text-textGray">
                    مشاهده و تکمیل سفارش
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
