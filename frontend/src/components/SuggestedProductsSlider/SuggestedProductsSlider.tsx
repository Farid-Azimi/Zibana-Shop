"use client";

import { useEffect, useState } from "react";
import ProductSlider from "../ProductSlider/ProductSlider";
import recommended from "../../images/recommended.png";
import { useUserStore } from "@/stores/useUserStore";

export default function SuggestedProductsSlider() {
  const { id } = useUserStore();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSuggestedProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/suggest-products/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch suggested products.");
        }

        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching suggested products:", error);
      }
    };
    if (id) {
      fetchSuggestedProducts();
    }
  }, [id]);

  return (
    <>
      {id && (
        <ProductSlider
          promoImageSrc={recommended.src}
          bgColor="bg-[#a29bfe]"
          products={products}
        />
      )}
    </>
  );
}
