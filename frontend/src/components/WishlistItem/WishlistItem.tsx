// components/WishlistItem.tsx
import Image from "next/image";
import { FiX } from "react-icons/fi";

type WishlistItemProps = {
  item: {
    id: number;
    name: string;
    price: string;
    image: string;
  };
};

export default function WishlistItem({ item }: WishlistItemProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm flex items-center justify-between bg-white">
      {/* محصول */}
      <div className="flex items-center space-x-4">
        <Image
          src={item.image}
          alt={item.name}
          width={80}
          height={80}
          className="rounded-md"
        />
        <div>
          <h2 className="text-lg font-medium">{item.name}</h2>
          <p className="text-gray-600">قیمت: {item.price} تومان</p>
        </div>
      </div>

      {/* دکمه‌ها */}
      <div className="flex items-center space-x-2">
        <button className="bg-pink-500 text-white rounded-full p-2">
          <FiX size={20} />
        </button>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md">
          مشاهده محصول
        </button>
      </div>
    </div>
  );
}
