import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import Image from "next/image";
import Link from "next/link";
import check from "../../../src/images/add-to-cart.png";
import remove from "../../../src/images/remove-from-cart.png";

interface ModalProduct {
  title: string;
  imageSrc: string;
}

interface ModalCartMessageProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  product: ModalProduct;
}

export default function ModalCartMessage({
  message,
  isOpen,
  onClose,
  product,
}: ModalCartMessageProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <Button
          className="absolute top-2 left-2 text-gray hover:text-lightGray transition"
          onClick={onClose}
        >
          <Icon name="CiSquareRemove" />
        </Button>

        <h2 className="flex items-center gap-2 text-lg font-semibold">
          {message === "added" ? (
            <>
              <Image src={check} alt="check" width={30} height={30} />
              این کالا به سبد خرید اضافه شد
            </>
          ) : (
            <>
              <Image src={remove} alt="remove" width={30} height={30} />
              این کالا از سبد خرید حذف شد
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
          />
          <p>{product.title}</p>
        </div>
        <hr className="border-t border-veryLightGray my-4" />
        <div className="w-1/2 bg-[#f62b72] text-white p-3 rounded text-center hover:bg-purple--dark hover:shadow-lg transition mx-auto">
          <Link href="/cart">برو به سبد خرید</Link>
        </div>
      </div>
    </div>
  );
}
