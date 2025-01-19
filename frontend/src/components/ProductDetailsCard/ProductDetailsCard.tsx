import { useState } from "react";
import { Product } from "../../types/productType";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import { useCartStore } from "../../stores/useCartOperationStore";
import ModalCartMessage from "../ModalCartMessage/ModalCartMessage";

interface ProductDetailsCardProps {
  product: Product;
}

export default function ProductDetailsCard({
  product,
}: ProductDetailsCardProps) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const { cartItems, addToCart, removeFromCart, decreaseQuantity } =
    useCartStore();
  const [quantity, setQuantity] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const handleIncrease = () => {
    setQuantity((prevQuantity) =>
      prevQuantity < 3 ? prevQuantity + 1 : prevQuantity
    );
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^[1-3]?$/.test(value)) {
      setQuantity(Number(value));
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
    setModalMessage("added");
    setIsModalOpen(true);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product);
    setQuantity(1);
    setModalMessage("removed");
    setIsModalOpen(true);
  };

  const isInCart = cartItems.some((item) => item.product._id === product._id);

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

        <div className="flex items-center mb-2 w-auto p-2 justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-xl rounded-full border border-transparent">
          <Icon
            name={"FaMinus"}
            className="p-2 border-2 border-white rounded-full hover:cursor-pointer bg-white hover:text-red-500 transition duration-300 ease-in-out transform hover:scale-110"
            size={hoveredIcon === "FaMinus" ? 40 : 38}
            onMouseEnter={() => setHoveredIcon("FaMinus")}
            onMouseLeave={() => setHoveredIcon(null)}
            onClick={() => handleDecrease()}
          />
          <input
            type="text"
            value={quantity}
            onChange={handleInputChange}
            maxLength={1}
            className="w-20 text-center bg-white text-lg mx-2 rounded-full shadow-inner border-none"
          />
          <Icon
            name={"FaPlus"}
            className="p-2 border-2 border-white rounded-full hover:cursor-pointer bg-white hover:text-green-500 transition duration-300 ease-in-out transform hover:scale-110"
            size={hoveredIcon === "FaPlus" ? 40 : 38}
            onMouseEnter={() => setHoveredIcon("FaPlus")}
            onMouseLeave={() => setHoveredIcon(null)}
            onClick={() => handleIncrease()}
          />
        </div>
      </div>

      {isInCart ? (
        <Button
          className="w-full p-2 mt-4 bg-[#f62b72] text-white rounded-lg text-center hover:bg-purple--dark hover:shadow-lg transition flex justify-center items-center gap-2"
          onClick={handleRemoveFromCart}
        >
          <Icon name={"FaRegTrashCan"} />
          <p> حذف از سبد خرید</p>
        </Button>
      ) : (
        <Button
          className="w-full p-2 mt-4 bg-[#f62b72] text-white rounded-lg text-center hover:bg-purple--dark hover:shadow-lg transition flex justify-center items-center gap-2"
          onClick={handleAddToCart}
        >
          <Icon name={"HiOutlineShoppingCart"} />
          <p> افزودن به سبد خرید</p>
        </Button>
      )}

      <ModalCartMessage
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
        product={{ title: product.title, imageSrc: product.imageSrc }}
      />
    </div>
  );
}
