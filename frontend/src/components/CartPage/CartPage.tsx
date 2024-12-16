"use client";
import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "../../stores/useCartOperationStore";
import { calculateCartTotals } from "../../stores/useCartTotalStore";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import Link from "next/link";
import { formatTitleForUrl } from "../../utils/formatTitleForUrl";
import { useProductData } from "@/data/productData";

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, decreaseQuantity } =
    useCartStore();
  const { totalPrice, totalDiscount, totalQuantity } =
    calculateCartTotals(cartItems);
  const { setSelectedProduct } = useProductData();
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 p-8">
        <div className="lg:w-2/3 space-y-2">
          <h2 className="text-xl font-semibold mb-4 mr-2">سبد خرید شما</h2>
          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="flex justify-between items-center bg-white shadow p-4 rounded-lg"
            >
              <div className="flex items-center">
                <div className="w-16 h-16 relative">
                  <Image
                    src={item.product.imageSrc}
                    alt={item.product.title}
                    objectFit="contain"
                    width={500}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>
                <div className="ml-4">
                  <Link
                    href={`/product/${formatTitleForUrl(item.product.title)}`}
                    passHref
                    onClick={() => setSelectedProduct(item.product)}
                  >
                    <h3 className="text-sm font-medium">
                      {item.product.title}
                    </h3>
                  </Link>
                  <p
                    className={`text-xs ${
                      item.product.discountedPrice
                        ? "line-through text-gray-500"
                        : "text-[#313131]"
                    }`}
                  >
                    {item.product.originalPrice} تومان
                  </p>
                  {item.product.discountedPrice && (
                    <p className="text-[#d5006a] font-semibold">
                      {item.product.discountedPrice} تومان
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon
                  name={"FaPlus"}
                  className="p-1 border rounded hover:cursor-pointer"
                  size={hoveredIcon === `FaPlus-${item.product._id}` ? 27 : 25}
                  onMouseEnter={() =>
                    setHoveredIcon(`FaPlus-${item.product._id}`)
                  }
                  onMouseLeave={() => setHoveredIcon(null)}
                  onClick={() => addToCart(item.product)}
                />
                <span className="px-2">{item.quantity}</span>
                {item.quantity > 1 ? (
                  <Icon
                    name={"FaMinus"}
                    className="p-1 border rounded hover:cursor-pointer"
                    size={
                      hoveredIcon === `FaMinus-${item.product._id}` ? 27 : 25
                    }
                    onMouseEnter={() =>
                      setHoveredIcon(`FaMinus-${item.product._id}`)
                    }
                    onMouseLeave={() => setHoveredIcon(null)}
                    onClick={() => decreaseQuantity(item.product)}
                  />
                ) : (
                  <Icon
                    name={
                      hoveredIcon === `FaTrashCan-${item.product._id}`
                        ? "FaTrashCan"
                        : "FaRegTrashCan"
                    }
                    className="p-1 border rounded hover:cursor-pointer"
                    size={
                      hoveredIcon === `FaTrashCan-${item.product._id}` ? 27 : 25
                    }
                    onMouseEnter={() =>
                      setHoveredIcon(`FaTrashCan-${item.product._id}`)
                    }
                    onMouseLeave={() => setHoveredIcon(null)}
                    onClick={() => removeFromCart(item.product)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:w-1/4 lg:h-1/3 bg-gray-50 p-6 rounded-lg shadow mt-11">
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
          <div className="flex justify-center">
            <Button className="w-auto p-2 mt-4 bg-purple-600 text-white py-2 rounded-lg">
              تایید نهایی سفارش
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
