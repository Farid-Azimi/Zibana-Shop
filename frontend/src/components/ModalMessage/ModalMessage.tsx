import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import Image from "next/image";
import Link from "next/link";
import ReactDOM from "react-dom";
import cartCheck from "../../../src/images/add-to-cart.png";
import cartRemove from "../../../src/images/remove-from-cart.png";
import wishlistCheck from "../../../src/images/happy_heart.png";
import wishlistRemove from "../../../src/images/sad_heart.png";
import React, { useCallback } from 'react';

interface ModalProduct {
  title: string;
  imageSrc: string;
}

interface ModalMessageProps {
  message: string;
  onClose: () => void;
  product: ModalProduct;
  type: "cart" | "wishlist";
  onRestore: () => void;
}

const ModalMessage: React.FC<ModalMessageProps> = React.memo(
  ({ message, onClose, product, type, onRestore }) => {
    const handleRestore = () => {
      onRestore();
    };

    const handleClose = useCallback(() => {
      onClose();
    }, [onClose]);

    if (typeof window === "undefined") return null;

    return ReactDOM.createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 pointer-events-none">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative pointer-events-auto">
          <Button
            className="absolute top-2 left-2 text-gray hover:text-lightGray transition"
            onClick={handleClose}
          >
            <Icon name="CiSquareRemove" />
          </Button>

          <h2 className="flex items-center gap-2 text-lg font-semibold">
            {message === "added" ? (
              <>
                <Image
                  src={type === "cart" ? cartCheck : wishlistCheck}
                  alt="check"
                  width={30}
                  height={30}
                  loading="lazy"
                />
                {type === "cart"
                  ? "این کالا به سبد خرید اضافه شد"
                  : "این کالا به علاقمندی‌ها اضافه شد"}
              </>
            ) : (
              <>
                <Image
                  src={type === "cart" ? cartRemove : wishlistRemove}
                  alt="remove"
                  width={30}
                  height={30}
                  loading="lazy"
                />
                {type === "cart"
                  ? "این کالا از سبد خرید حذف شد"
                  : "این کالا از علاقمندی‌ها حذف شد"}
              </>
            )}
          </h2>
          <hr className="border-t border-veryLightGray my-4" />
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
          <hr className="border-t border-veryLightGray my-4" />

          <div className="w-auto bg-[#f62b72] text-white p-3 rounded text-center hover:bg-purple--dark hover:shadow-lg transition mx-auto">
            {type === "wishlist" && message === "added" && (
              <Link href="/wishlist">برو به علاقمندی‌ها</Link>
            )}
            {type === "cart" && message === "added" && (
              <Link href="/cart">برو به سبد خرید</Link>
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
