import { useState, useEffect, useCallback } from "react";
import { Product } from "../../types/productType";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import { useCartStore } from "../../stores/useCartOperationStore";
import ModalMessage from "../ModalMessage/ModalMessage";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import { useDeleteConfirmation } from "@/hooks/useDeleteConfirmation";

interface ProductDetailsCardProps {
  product: Product;
}

export default function ProductDetailsCard({
  product,
}: ProductDetailsCardProps) {
  const { cartItems, addToCart, removeFromCart } = useCartStore();
  const [quantity, setQuantity] = useState<number>(0);
  const isInCart = cartItems.some((item) => item.product._id === product._id);

  useEffect(() => {
    if (isInCart) {
      const cartItem = cartItems.find(
        (item) => item.product._id === product._id
      );
      if (cartItem) {
        setQuantity(cartItem.quantity);
      }
    }
  }, [cartItems, product._id, isInCart]);

  const {
    modalOpen,
    handleDelete,
    handleConfirmRemove,
    handleRestore,
  } = useDeleteConfirmation({
    onDelete: () => {
      if (isInCart) {
        removeFromCart(product);
        setQuantity(0);
      } else {
        addToCart(product, 1);
        setQuantity(1);
      }
    },
    onRestore: () => {
      addToCart(product, 1);
      setQuantity(1);
    },
    id: "1",
  });

  return (
    <div className="border-solid border-2 border-veryLightGray rounded-lg p-4">
      <ul className="space-y-3 mb-4 text-right text-textGray">
        <li className="flex items-center gap-2">
          <Icon name="GoStar" size={25} />
          <span>برند {product.brand}</span>
        </li>
        <li className="flex items-center gap-2">
          <Icon name="PiSealCheck" size={25} />
          <span>ارائه تضمین اصل بودن کالا</span>
        </li>
        <li className="flex items-center gap-2">
          <Icon name="RiEBike2Line" size={25} />
          <span>ارسال رایگان بالای ۱,۲۰۰,۰۰۰ تومان</span>
        </li>
        <li className="flex items-center gap-2">
          <Icon name="SlDirections" size={25} />
          <span>ضمانت بازگشت کالا ۷ روزه</span>
        </li>
        <li className="flex items-center gap-2">
          <Icon name="PiHeadset" size={25} />
          <span>مشاوره رایگان بگیرید</span>
        </li>
      </ul>

      <hr className="border-t border-lightGray my-4" />

      <div className="flex flex-col items-center justify-center gap-4 mt-2">
        <div className="flex items-center justify-center gap-2">
          {product.discountPercentage !== 0 && (
            <div className="bg-[#f62b72] text-white text-sm p-2 rounded-bl-lg rounded-tr-lg">
              {product.discountPercentage}٪
            </div>
          )}
          <div className="flex flex-col items-start">
            <span
              className={`${
                product.discountPercentage
                  ? "text-gray line-through text-sm"
                  : "text-[#313131] text-base font-semibold"
              }`}
            >
              {product.originalPrice} تومان
            </span>
            {product.discountPercentage !== 0 && (
              <span className="text-[#313131] text-base font-semibold">
                {product.discountedPrice} تومان
              </span>
            )}
          </div>
        </div>

        <QuantitySelector
          quantity={quantity}
          product={product}
          isInCart={isInCart}
          onQuantityChange={setQuantity}
        />
      </div>

      {isInCart ? (
        <Button
          className="w-full p-2 mt-4 bg-[#f62b72] text-white rounded-lg text-center hover:bg-purple--dark hover:shadow-lg transition flex justify-center items-center gap-2"
          onClick={handleDelete}
        >
          <Icon name={"FaRegTrashCan"} />
          <p> حذف از سبد خرید</p>
        </Button>
      ) : (
        <Button
          className="w-full p-2 mt-4 bg-[#f62b72] text-white rounded-lg text-center hover:bg-purple--dark hover:shadow-lg transition flex justify-center items-center gap-2"
          onClick={handleDelete}
        >
          <Icon name={"HiOutlineShoppingCart"} />
          <p> افزودن به سبد خرید</p>
        </Button>
      )}
      {modalOpen && (
        <ModalMessage
          message={!isInCart ? "removed" : "added"}
          onClose={handleConfirmRemove}
          product={product}
          type="cart"
          onRestore={handleRestore}
        />
      )}
    </div>
  );
}
