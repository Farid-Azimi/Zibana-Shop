import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Icon from "../Icon/Icon";
import { Product } from "../../types/productType";
import { formatTitleForUrl } from "../../utils/formatTitleForUrl";
import { useCartStore } from "../../stores/useCartOperationStore";
import useFetchUserWishlist from "../../hooks/useFetchUserWishlist";
import { useUserStore } from "../../stores/useUserStore";
import ModalMessage from "../ModalMessage/ModalMessage";
import React from "react";
import ErrorModal from "../ErrorModal/ErrorModal";
import { useDeleteConfirmation } from "../../hooks/useDeleteConfirmation";
import LoginSignupModal from "../LoginSignupModal/LoginSignupModal";
import { createPortal } from "react-dom";

interface ProductItemDropdownProps {
  product: Product;
  onViewProduct: () => void;
  variant?: "default" | "compact";
}

const ProductItemDropdown: React.FC<ProductItemDropdownProps> = React.memo(
  ({ product, onViewProduct, variant = "default" }) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const { addToCart } = useCartStore();
    const { toggleWishlistItem, fetchWishlistItems } = useFetchUserWishlist();
    const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
    const { id } = useUserStore();
    const [modalMessage, setModalMessage] = useState<string>("");
    const [modalType, setModalType] = useState<"cart" | "wishlist">("cart");
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    useEffect(() => {
      if (!id) {
        setIsLiked(false);
      } else {
        const checkIfLiked = async () => {
          const wishlist = (await fetchWishlistItems(id)) || [];
          setIsLiked(
            wishlist.some((item: Product) => item._id === product._id)
          );
        };
        checkIfLiked();
      }
    }, [id, product._id]);

    const {
      isErrorModalOpen,
      setIsErrorModalOpen,
      modalOpen,
      handleDelete,
      handleConfirmRemove,
      handleRestore,
      setModalOpen,
    } = useDeleteConfirmation({
      onDelete: async () => {
        if (id) {
          await toggleWishlistItem(id, product._id, isLiked);
          setIsLiked(!isLiked);
          setModalMessage(isLiked ? "removed" : "added");
          setModalType("wishlist");
        }
      },
      onRestore: () => setIsLiked(true),
      id,
    });

    const handleAddToCart = useCallback(() => {
      addToCart(product, 1);
      setModalMessage("added");
      setModalType("cart");
      setModalOpen(true);
    }, [addToCart, product]);

    return (
      <>
        <div
          className={`absolute ${
            variant === "compact" ? "top-0 h-12" : "bottom-0 h-10"
          } left-0 right-0 bg-lightGray text-black p-1 flex justify-around items-center transform ${
            variant === "compact" ? "-translate-y-full" : "translate-y-full"
          } group-hover:translate-y-0 transition-transform duration-300 z-[40]`}
        >
          <Icon
            name={
              isLiked || hoveredIcon === "IoMdHeart"
                ? "IoMdHeart"
                : "IoMdHeartEmpty"
            }
            className="hover:cursor-pointer"
            onMouseEnter={() => setHoveredIcon("IoMdHeart")}
            onMouseLeave={() => setHoveredIcon(null)}
            onClick={handleDelete}
            size={variant === "compact" ? 38 : 30}
          />
          <Link
            href={`/product/${formatTitleForUrl(product.title)}`}
            passHref
            onClick={onViewProduct}
          >
            <Icon
              name={hoveredIcon === "AiFillEye" ? "AiFillEye" : "AiOutlineEye"}
              className={
                hoveredIcon === "AiFillEye"
                  ? "hover:cursor-pointer"
                  : "hover:cursor-default"
              }
              onMouseEnter={() => setHoveredIcon("AiFillEye")}
              onMouseLeave={() => setHoveredIcon(null)}
              size={variant === "compact" ? 38 : 30}
            />
          </Link>
          <Icon
            name={
              hoveredIcon === "HiShoppingCart"
                ? "HiShoppingCart"
                : "HiOutlineShoppingCart"
            }
            className={
              hoveredIcon === "HiShoppingCart"
                ? "hover:cursor-pointer"
                : "hover:cursor-default"
            }
            onMouseEnter={() => setHoveredIcon("HiShoppingCart")}
            onMouseLeave={() => setHoveredIcon(null)}
            onClick={handleAddToCart}
            size={variant === "compact" ? 38 : 30}
          />
        </div>
        <ErrorModal
          isOpen={isErrorModalOpen}
          onClose={() => setIsErrorModalOpen(false)}
          onLoginClick={() => {
            setIsLoginModalOpen(true);
            setIsErrorModalOpen(false);
          }}
        />
        {modalOpen && (
          <ModalMessage
            message={modalMessage as "added" | "removed"}
            onClose={handleConfirmRemove}
            product={{ title: product.title, imageSrc: product.imageSrc }}
            type={modalType}
            onRestore={handleRestore}
          />
        )}
        {isLoginModalOpen &&
          createPortal(
            <LoginSignupModal handleIsModalOpen={setIsLoginModalOpen} />,
            document.body
          )}
      </>
    );
  }
);

ProductItemDropdown.displayName = "ProductItemDropdown";
export default ProductItemDropdown;
