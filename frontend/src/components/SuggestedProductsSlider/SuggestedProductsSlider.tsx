"use client";

import { memo, useCallback, useEffect, useState } from "react";
import ProductSlider from "../ProductSlider/ProductSlider";
import recommended from "../../images/recommended.png";
import { useUserStore } from "@/stores/useUserStore";

const SuggestedProductsSlider = memo(() => {
  const { id } = useUserStore();
  const [products, setProducts] = useState([]);

  const fetchSuggestedProducts = useCallback(async () => {
    if (!id) return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/suggest-products/${id}`
      );
      if (!response.ok) throw new Error("Failed to fetch suggested products.");
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching suggested products:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchSuggestedProducts();
  }, [fetchSuggestedProducts]);

  return id ? (
    <ProductSlider
      promoImageSrc={recommended.src}
      bgColor="bg-[#a29bfe]"
      products={products}
      title="پیشنهاد زیبانا برای شما"
    />
  ) : null;
});

SuggestedProductsSlider.displayName = "SuggestedProductsSlider";
export default SuggestedProductsSlider;
