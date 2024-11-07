"use client";
import Image from "next/image";
import { useCartStore } from "../../stores/useCartOperationStore";
import { calculateCartTotals } from "../../stores/useCartTotalStore";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, decreaseQuantity } =
    useCartStore();
  const { totalPrice, totalDiscount, totalQuantity } =
    calculateCartTotals(cartItems);

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:space-x-8 p-8">
        {/* لیست محصولات */}
        <div className="lg:w-2/3 space-y-2">
          <h2 className="text-xl font-semibold mb-4 mr-2">سبد خرید شما</h2>
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between items-center bg-white shadow p-4 rounded-lg"
            >
              <div className="flex items-center">
                <div className="w-16 h-16 relative">
                  <Image
                    src={item.product.imageSrc}
                    alt={item.product.name}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="ml-4">
                  <Link href={`/product/${item.product.id}`} passHref>
                    <h3 className="text-sm font-medium">{item.product.name}</h3>
                  </Link>
                  <p
                    className={`text-xs ${
                      item.product.hasDiscount
                        ? "line-through text-gray-500"
                        : "text-[#313131]"
                    }`}
                  >
                    {item.product.originalPrice} تومان
                  </p>
                  {item.product.hasDiscount && (
                    <p className="text-[#d5006a] font-semibold">
                      {item.product.discountedPrice} تومان
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon
                  name="FaPlus"
                  className="p-1 border rounded hover:cursor-pointer"
                  onClick={() => addToCart(item.product.id)}
                />
                <span className="px-2">{item.quantity}</span>
                {item.quantity > 1 ? (
                  <Icon
                    name="FaMinus"
                    className="p-1 border rounded hover:cursor-pointer"
                    onClick={() => decreaseQuantity(item.product.id)}
                  />
                ) : (
                  <Icon
                    name="FaTrashCan"
                    className="p-1 border rounded hover:cursor-pointer"
                    onClick={() => removeFromCart(item.product.id)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        {/* بخش جمع خرید و تخفیف */}
        <div className="lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">مبلغ قابل پرداخت</h2>
          <p className="text-gray-700 text-sm">
            جمع سبد خرید: {totalPrice} تومان
          </p>
          <p className="text-green-500 text-sm">
            مجموع تخفیف‌ها: {totalDiscount} تومان
          </p>
          <p className="text-lg font-semibold mt-4">
            مبلغ نهایی: {totalPrice - totalDiscount} تومان
          </p>
          <Button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg">
            تایید و تکمیل سفارش
          </Button>
        </div>
      </div>
    </>
  );
}
