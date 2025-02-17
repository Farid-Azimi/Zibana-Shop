import Image from "next/image";
import Link from "next/link";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { formatTitleForUrl } from "../../utils/formatTitleForUrl";
import { Product } from "@/types/productType";
import { useCartStore } from "../../stores/useCartOperationStore";
import { useProductData } from "@/data/productData";
import ModalMessage from "../ModalMessage/ModalMessage";
import { useDeleteConfirmation } from "../../hooks/useDeleteConfirmation";
import QuantitySelector from "../QuantitySelector/QuantitySelector";

interface CartItemProps {
  product: Product;
}

export default function CartItem({ product }: CartItemProps) {
  const { removeFromCart, decreaseQuantity, addToCart } = useCartStore();
  const { setSelectedProduct } = useProductData();
  const cartItems = useCartStore((state) => state.cartItems);
  const item = cartItems.find((item) => item.product._id === product._id);
  const quantity = item?.quantity || 1;

  const {
    modalOpen,
    handleDelete,
    handleConfirmRemove,
    handleRestore,
    setModalOpen,
  } = useDeleteConfirmation({
    onDelete: () => removeFromCart(product),
  });

  const handleIncrease = () => {
    addToCart(product, 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      decreaseQuantity(product);
    } else {
      handleDelete();
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      if (newQuantity > quantity) {
        addToCart(product, newQuantity - quantity);
      } else if (newQuantity < quantity) {
        for (let i = 0; i < quantity - newQuantity; i++) {
          decreaseQuantity(product);
        }
      }
    }
  };

  return (
    <div className="relative p-4 h-60 w-1/2 mx-auto border-solid border-veryLightGray border-2 rounded-lg shadow-sm flex items-center justify-between bg-white">
      <Button
        className="absolute top-2 left-2 bg-pink-500 text-white rounded-xl p-2"
        onClick={handleDelete}
      >
        <Icon name="FiX" size={20} />
      </Button>

      <div className="flex items-center space-x-4">
        {product.discountPercentage !== 0 && (
          <div className="absolute top-0 right-0 bg-[#f62b72] text-white text-sm px-3 py-2 rounded-bl-lg rounded-tr-lg">
            {product.discountPercentage}٪
          </div>
        )}
        <Image
          src={product.imageSrc}
          alt={product.title}
          width={80}
          height={80}
          loading="lazy"
          className="rounded-md"
        />
        <div className="flex flex-col">
          <h2 className="text-base font-bold">{product.title}</h2>
          <span
            className={`mt-2 text-center ${
              product.discountPercentage
                ? "text-gray line-through text-sm"
                : "text-[#313131] text-base font-semibold"
            }`}
          >
            قیمت: {product.originalPrice} تومان
          </span>
          {product.discountPercentage !== 0 && (
            <span className="text-[#313131] text-base text-center font-semibold">
              {product.discountedPrice} تومان
            </span>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 left-4">
        <Link
          href={`/product/${formatTitleForUrl(product.title)}`}
          passHref
          className="bg-purple-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 gap-2"
          onClick={() => setSelectedProduct(product)}
        >
          <Icon name="PiShoppingBagLight" size={20} />
          <span>مشاهده محصول</span>
        </Link>
      </div>

      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 scale-75">
        <QuantitySelector
          quantity={quantity}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onChange={handleQuantityChange}
        />
      </div>

      {modalOpen && (
        <ModalMessage
          message="removed"
          onClose={handleConfirmRemove}
          product={{ title: product.title, imageSrc: product.imageSrc }}
          type="cart"
          onRestore={handleRestore}
        />
      )}
    </div>
  );
}
