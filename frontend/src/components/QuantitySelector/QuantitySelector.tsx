import { useState } from "react";
import Icon from "../Icon/Icon";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  onChange,
}: QuantitySelectorProps) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  return (
    <div className="flex items-center mb-2 w-auto p-2 justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-xl rounded-full border border-transparent">
      <Icon
        name={"FaMinus"}
        className="p-2 border-2 border-white rounded-full hover:cursor-pointer bg-white hover:text-red-500 transition duration-300 ease-in-out transform hover:scale-110"
        size={hoveredIcon === "FaMinus" ? 40 : 38}
        onMouseEnter={() => setHoveredIcon("FaMinus")}
        onMouseLeave={() => setHoveredIcon(null)}
        onClick={onDecrease}
      />
      <input
        type="text"
        value={quantity}
        onChange={onChange}
        maxLength={1}
        className="w-20 text-center bg-white text-lg mx-2 rounded-full shadow-inner border-none"
      />
      <Icon
        name={"FaPlus"}
        className="p-2 border-2 border-white rounded-full hover:cursor-pointer bg-white hover:text-green-500 transition duration-300 ease-in-out transform hover:scale-110"
        size={hoveredIcon === "FaPlus" ? 40 : 38}
        onMouseEnter={() => setHoveredIcon("FaPlus")}
        onMouseLeave={() => setHoveredIcon(null)}
        onClick={onIncrease}
      />
    </div>
  );
}
