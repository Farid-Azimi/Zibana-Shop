"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Icon from "@/components/Icon/Icon";
import { Product } from "../../types/productType";
import ProductDetailsCard from "@/components/ProductDetailsCard/ProductDetailsCard";
import useFetchUserWishlist from "@/hooks/useFetchUserWishlist";
import { useUserStore } from "@/stores/useUserStore";
import ModalMessage from "../ModalMessage/ModalMessage";
import { useDeleteConfirmation } from "@/hooks/useDeleteConfirmation";
import ErrorModal from "../ErrorModal/ErrorModal";
import LoginSignupModal from "../LoginSignupModal/LoginSignupModal";
import { createPortal } from "react-dom";
import ProductSlider from "../ProductSlider/ProductSlider";
import eyeVision from "../../images/eye_vision_icon.png";
import { useRecentlyVisited } from "@/hooks/useRecentlyVisited";

interface SingleProductProps {
  product: Product;
}

export default function SingleProduct({
  product,
}: SingleProductProps): JSX.Element {
  const { toggleWishlistItem, fetchWishlistItems } = useFetchUserWishlist();
  const { id } = useUserStore();
  const [isLiked, setIsLiked] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { recentProducts } = useRecentlyVisited({
    currentProductId: product._id,
  });

  console.log("recentProducts", recentProducts);

  useEffect(() => {
    if (!id) return;

    const checkIfLiked = async () => {
      const wishlist = (await fetchWishlistItems(id)) || [];
      setIsLiked(wishlist.some((item: Product) => item._id === product._id));
    };

    checkIfLiked();
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
      }
    },
    id,
    onRestore: () => setIsLiked(true),
  });

  return (
    <>
      <div className="flex flex-col md:flex-row items-stretch justify-between mt-6 mb-12">
        <div className="w-1/3 p-4 mx-auto relative">
          <Icon
            name={
              isLiked || hoveredIcon === "IoMdHeart"
                ? "IoMdHeart"
                : "IoMdHeartEmpty"
            }
            className="absolute top-6 left-6 hover:cursor-pointer"
            onMouseEnter={() => setHoveredIcon("IoMdHeart")}
            onMouseLeave={() => setHoveredIcon(null)}
            onClick={handleDelete}
            size={36}
          />
          <Image
            src={product.imageSrc}
            alt={product.title}
            width={500}
            height={500}
            className="w-full rounded-lg shadow-lg"
            loading="lazy"
          />
        </div>
        <div className="w-1/3 mx-auto p-4 flex flex-col justify-center text-center self-start mt-10">
          <h1 className="text-3xl font-extrabold text-[#4b4b4b] mb-2">
            {product.title}
          </h1>
          <p className="text-lg text-gray font-medium">
            برند:{" "}
            <span className="text-gray-900 font-semibold">{product.brand}</span>
          </p>
          <p className="text-lg text-gray font-medium">
            دسته‌بندی:{" "}
            <span className="text-gray-900 font-semibold">
             {product.category[0]} ، {product.category[1]}
            </span>
          </p>
          <p className="text-md text-gray mt-4 leading-relaxed italic">
            {product.description}
          </p>
        </div>
        <div className="w-1/4 mx-auto p-4">
          <ProductDetailsCard product={product} />
        </div>
      </div>
      {id && recentProducts.length > 0 && (
        <ProductSlider
          promoImageSrc={eyeVision.src}
          title="بازدیدهای اخیر شما"
          bgColor="bg-veryLightGray"
          products={recentProducts}
        />
      )}
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
          message={!isLiked ? "removed" : "added"}
          onClose={handleConfirmRemove}
          product={product}
          type="wishlist"
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
