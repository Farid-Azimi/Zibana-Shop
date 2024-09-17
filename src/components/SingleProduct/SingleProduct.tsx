import { useState } from "react";
import Image from "next/image";
import { Product } from "../../types/productType";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { useCartStore } from "../../stores/useCartStore";

interface SingleProductProps {
  product: Product;
}

export default function SingleProduct({
  product,
}: SingleProductProps): JSX.Element {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const { cartItems, addToCart, removeFromCart, decreaseQuantity } =
    useCartStore();

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const isInCart = cartItems.some((item) => item.product.id === product.id);

  return (
    <>
      <div className=" flex flex-col md:flex-row items-center">
        <div className="w-1/4 p-4 relative">
          {product.hasDiscount && (
            <div className="absolute top-4 left-4 bg-[#f62b72] text-white text-sm px-3 py-2 rounded-br-lg">
              {product.discountPercentage}٪
            </div>
          )}
          <Image
            src={product.imageSrc}
            alt={product.name}
            width={500}
            height={500}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray mb-4">{product.description}</p>
          <div className="mb-4">
            <span
              className={` ${
                product.hasDiscount
                  ? "text-gray line-through text-sm m-2"
                  : "text-black text-lg font-semibold"
              }`}
            >
              {product.originalPrice} تومان
            </span>
            {product.hasDiscount && (
              <>
                <span className="text-black text-lg font-semibold">
                  {product.discountedPrice} تومان
                </span>
              </>
            )}
          </div>
          <div className="flex items-center mb-4">
            <Icon
              name={"FaMinus"}
              className="p-1 border rounded hover:cursor-pointer"
              size={hoveredIcon === "FaMinus" ? 30 : 28}
              onMouseEnter={() => setHoveredIcon("FaMinus")}
              onMouseLeave={() => setHoveredIcon(null)}
              onClick={() => handleDecrease()}
            />
            <input
              type="text"
              value={quantity}
              readOnly
              className="w-12 text-center border-t border-b border-lightGray"
            />
            <Icon
              name={"FaPlus"}
              className="p-1 border rounded hover:cursor-pointer"
              size={hoveredIcon === "FaPlus" ? 30 : 28}
              onMouseEnter={() => setHoveredIcon("FaPlus")}
              onMouseLeave={() => setHoveredIcon(null)}
              onClick={() => handleIncrease()}
            />
          </div>
          <Button
            className="w-auto p-2 bg-purple--primary text-white rounded-lg hover:bg-purple--dark hover:shadow-lg transition"
            onClick={() => {
              addToCart(product.id, quantity);
              setQuantity(1);
            }}
          >
            <Icon name={"HiOutlineShoppingCart"} />
            افزودن به سبد خرید
          </Button>
          {isInCart && (
            <Button
              className="w-auto p-2 bg-purple--primary text-white rounded-lg hover:bg-purple--dark hover:shadow-lg transition"
              onClick={() => {
                removeFromCart(product.id);
                setQuantity(1);
              }}
            >
              <Icon name={"FaRegTrashCan"} />
              حذف از سبد خرید
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
