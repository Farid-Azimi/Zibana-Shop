import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import Image from "next/image";
import Link from "next/link";
import ReactDOM from "react-dom";
import cartCheck from "../../../src/images/add-to-cart.png";
import cartRemove from "../../../src/images/remove-from-cart.png";
import wishlistCheck from "../../../src/images/happy_heart.png";
import wishlistRemove from "../../../src/images/sad_heart.png";
import React, { useEffect } from "react";

interface ModalProduct {
  title: string;
  imageSrc: string;
}

interface ModalMessageProps {
  message: "added" | "removed";
  onClose: () => void;
  product: ModalProduct;
  type: "cart" | "wishlist" | "order";
  onRestore: () => void;
}

const ModalMessage: React.FC<ModalMessageProps> = React.memo(
  ({ message, onClose, product, type, onRestore }) => {
    const handleRestore = () => {
      onRestore();
      onClose();
    };

    useEffect(() => {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }, [onClose]);

    if (typeof window === "undefined") return null;

    return ReactDOM.createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[70] pointer-events-none">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative pointer-events-auto z-[80]">
          <Button
            className="absolute top-2 left-2 text-gray hover:text-lightGray transition"
            onClick={onClose}
          >
            <Icon name="CiSquareRemove" />
          </Button>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            {message === "added" && (
              <>
                {type === "cart" && (
                  <>
                    <Image
                      src={cartCheck}
                      alt="check"
                      width={30}
                      height={30}
                      loading="lazy"
                    />
                    <span>این کالا به سبد خرید اضافه شد</span>
                  </>
                )}
                {type === "wishlist" && (
                  <>
                    <Image
                      src={wishlistCheck}
                      alt="check"
                      width={30}
                      height={30}
                      loading="lazy"
                    />
                    <span>این کالا به علاقمندی‌ها اضافه شد</span>
                  </>
                )}
                {type === "order" && (
                  <>
                    <Image
                      src={product.imageSrc}
                      alt="order check"
                      width={30}
                      height={30}
                      loading="lazy"
                    />
                    <span>{product.title}</span>
                  </>
                )}
              </>
            )}
            {message === "removed" && (
              <>
                {type === "cart" && (
                  <>
                    <Image
                      src={cartRemove}
                      alt="remove"
                      width={30}
                      height={30}
                      loading="lazy"
                    />
                    <span>این کالا از سبد خرید حذف شد</span>
                  </>
                )}
                {type === "wishlist" && (
                  <>
                    <Image
                      src={wishlistRemove}
                      alt="remove"
                      width={30}
                      height={30}
                      loading="lazy"
                    />
                    <span>این کالا از علاقمندی‌ها حذف شد</span>
                  </>
                )}
              </>
            )}
          </h2>
          <hr className="border-t border-veryLightGray my-4" />
          {/* Optionally hide the product detail if type is "order" to avoid a duplicate message */}
          {type !== "order" && (
            <div className="flex items-center gap-2 my-4">
              <Image
                src={product.imageSrc}
                alt={product.title}
                width={100}
                height={100}
                loading="lazy"
                className="rounded-md"
              />
              <p>{product.title}</p>
            </div>
          )}
          <hr className="border-t border-veryLightGray my-4" />
          <div className="w-auto bg-[#f62b72] text-white p-3 rounded text-center hover:bg-purple--dark hover:shadow-lg transition mx-auto">
            {type === "wishlist" && message === "added" && (
              <Link href="/wishlist">برو به علاقمندی‌ها</Link>
            )}
            {type === "cart" && message === "added" && (
              <Link href="/cart">برو به سبد خرید</Link>
            )}
            {type === "order" && message === "added" && (
              <Link href="/orders">مشاهده سفارشات</Link>
            )}
            {message === "removed" && (
              <Button onClick={handleRestore}>بازگردانی</Button>
            )}
          </div>
        </div>
      </div>,
      document.body
    );
  }
);

ModalMessage.displayName = "ModalMessage";
export default ModalMessage;
