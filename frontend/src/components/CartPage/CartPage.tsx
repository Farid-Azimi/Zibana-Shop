"use client";

import { useCartStore } from "../../stores/useCartOperationStore";
import { calculateCartTotals } from "../../stores/useCartTotalStore";
import Button from "../Button/Button";
import CartItem from "../CartItem/CartItem";
import { useUserStore } from "@/stores/useUserStore";
import { useState } from "react";
import ErrorModal from "../ErrorModal/ErrorModal";
import LoginSignupModal from "../LoginSignupModal/LoginSignupModal";
import { createPortal } from "react-dom";
import ModalMessage from "../ModalMessage/ModalMessage";
import orderCheck from "../../../src/images/check.png";

export default function CartPage() {
  const { cartItems, clearCart } = useCartStore();
  useCartStore();
  const { totalPrice, totalDiscount } = calculateCartTotals(cartItems);
  const { token } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const confirmOrder = async () => {
    if (!token) {
      setIsModalOpen(true);
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/confirm-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ cartItems }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Order confirmation failed.");
      }

      clearCart();
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error confirming order:", error);
      alert("Error confirming order. Please try again.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 p-8">
        <div className="lg:w-2/3 space-y-2">
          <h2 className="text-xl font-semibold mb-4 mr-2 text-center">سبد خرید شما</h2>
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
        {totalPrice > 0 && (
          <div className="lg:w-1/5 lg:h-1/3 bg-gray-50 p-6 rounded-lg shadow mt-11">
            <h2 className="text-lg font-bold mb-4">مبلغ قابل پرداخت</h2>
            <p className="text-gray-700 text-sm">
              جمع سبد خرید: {totalPrice} تومان
            </p>
            {totalDiscount !== 0 && (
            <p className="text-green-500 text-sm mt-2">
              مجموع تخفیف‌ها: {totalDiscount} تومان
            </p>
            )}
            <p className="text-lg font-semibold mt-4">
              قابل پرداخت: {totalPrice - totalDiscount} تومان
            </p>
            <div className="flex justify-center">
              <Button
                className="w-auto p-2 mt-4 bg-purple-600 text-white py-2 rounded-lg"
                onClick={confirmOrder}
              >
                تایید نهایی سفارش
              </Button>
            </div>
          </div>
        )}
      </div>
      {isSuccessModalOpen && (
        <ModalMessage
          message="added"
          onClose={() => setIsSuccessModalOpen(false)}
          product={{
            title: "سفارش شما با موفقیت ثبت شد",
            imageSrc: orderCheck.src,
          }}
          type="cart"
          onRestore={() => {}}
        />
      )}
      <ErrorModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onLoginClick={() => {
          setIsLoginModalOpen(true);
          closeModal();
        }}
      />
      {isLoginModalOpen &&
        createPortal(
          <LoginSignupModal handleIsModalOpen={setIsLoginModalOpen} />,
          document.body
        )}
    </>
  );
}
