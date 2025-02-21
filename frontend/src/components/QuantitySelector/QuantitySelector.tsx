import { useState } from "react";
import Icon from "../Icon/Icon";
import { useCartStore } from "../../stores/useCartOperationStore";
import { Product } from "@/types/productType";

interface QuantitySelectorProps {
  quantity: number;
  product: Product;
  isInCart: boolean;
  onQuantityChange: (quantity: number) => void;
}

export default function QuantitySelector({
  quantity,
  product,
  isInCart,
  onQuantityChange,
}: QuantitySelectorProps) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const { addToCart, removeFromCart, decreaseQuantity } = useCartStore();

  const handleIncrease = () => {
    if (isInCart) {
      if (quantity < 3) {
        addToCart(product);
        onQuantityChange(quantity + 1);
      }
    } else {
      if (quantity < 3) {
        addToCart(product, 1);
        onQuantityChange(1);
      }
    }
  };

  const handleDecrease = () => {
    if (isInCart) {
      if (quantity > 1) {
        decreaseQuantity(product);
        onQuantityChange(quantity - 1);
      } else {
        // removeFromCart(product);
        onQuantityChange(1);
      }
    } else {
      if (quantity > 1) {
        onQuantityChange(quantity - 1);
      }
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[1-3]?$/.test(value)) {
      const newQuantity = Number(value);
      if (isInCart) {
        if (newQuantity === 0) {
          removeFromCart(product);
          onQuantityChange(1);
        } else {
          if (newQuantity > quantity) {
            addToCart(product);
          } else if (newQuantity < quantity) {
            decreaseQuantity(product);
          }
          onQuantityChange(newQuantity);
        }
      } else {
        onQuantityChange(newQuantity);
      }
    }
  };

  return (
    <div className="flex items-center mb-2 w-auto p-2 justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-xl rounded-full border border-transparent">
      <Icon
        name={"FaMinus"}
        className="p-2 border-2 border-white rounded-full hover:cursor-pointer bg-white hover:text-red-500 transition duration-300 ease-in-out transform hover:scale-110"
        size={hoveredIcon === "FaMinus" ? 40 : 38}
        onMouseEnter={() => setHoveredIcon("FaMinus")}
        onMouseLeave={() => setHoveredIcon(null)}
        onClick={handleDecrease}
      />
      <input
        type="text"
        value={quantity}
        onChange={handleQuantityChange}
        maxLength={1}
        className="w-20 text-center bg-white text-lg mx-2 rounded-full shadow-inner border-none"
      />
      <Icon
        name={"FaPlus"}
        className="p-2 border-2 border-white rounded-full hover:cursor-pointer bg-white hover:text-green-500 transition duration-300 ease-in-out transform hover:scale-110"
        size={hoveredIcon === "FaPlus" ? 40 : 38}
        onMouseEnter={() => setHoveredIcon("FaPlus")}
        onMouseLeave={() => setHoveredIcon(null)}
        onClick={handleIncrease}
      />
    </div>
  );
}
