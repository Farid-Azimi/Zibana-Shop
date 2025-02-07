"use client";
import { useState } from "react";
import { useCartStore } from "../../stores/useCartOperationStore";
import { calculateCartTotals } from "../../stores/useCartTotalStore";
import Button from "../Button/Button";
import { useProductData } from "@/data/productData";
import CartItem from "../CartItem/CartItem";

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, decreaseQuantity } =
    useCartStore();
  const { totalPrice, totalDiscount, totalQuantity } =
    calculateCartTotals(cartItems);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 p-8">
         <div className="lg:w-2/3 space-y-2">
          <h2 className="text-xl font-semibold mb-4 mr-2">سبد خرید شما</h2>
          {/*
                
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
        </div> */}
   
          <div className="space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem key={item.product._id} product={item.product} />
              ))
            ) : (
              <p>هیچ محصولی در سبد خرید وجود ندارد.</p>
            )}
          </div>
        </div>
        <div className="lg:w-1/5 lg:h-1/3 bg-gray-50 p-6 rounded-lg shadow mt-11">
          <h2 className="text-lg font-bold mb-4">مبلغ قابل پرداخت</h2>
          <p className="text-gray-700 text-sm">
            جمع سبد خرید: {totalPrice} تومان
          </p>
          <p className="text-green-500 text-sm mt-2">
            مجموع تخفیف‌ها: {totalDiscount} تومان
          </p>
          <p className="text-lg font-semibold mt-4">
            قابل پرداخت: {totalPrice - totalDiscount} تومان
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
