"use client";

import Layout from "../../../components/Layout/Layout";
import SingleProduct from "../../../components/SingleProduct/SingleProduct";
import { useParams } from "next/navigation";
import { useProductData } from "@/data/productData";
import { formatTitleForUrl } from "@/utils/formatTitleForUrl";
import { useHttpClient } from "@/hooks/http-hook";
import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";

export default function SingleProductPage() {
  const { productName } = useParams();
  const { selectedProduct } = useProductData();
  const { sendRequest } = useHttpClient();
  const { id } = useUserStore();

  console.log("selectedProduct?._id", selectedProduct?._id);
  console.log("id", id);

  useEffect(() => {
    if (selectedProduct?._id && id) {
      sendRequest(
        "http://localhost:5000/api/users/add-view-history",
        "POST",
        JSON.stringify({
          productId: selectedProduct?._id,
          userId: id,
        }),
        { "Content-Type": "application/json" }
      );
    }
  }, [selectedProduct]);

  if (!selectedProduct) {
    return <p>محصول مورد نظر یافت نشد.</p>;
  }

  const decodedTitle = decodeURIComponent((productName as string) || "");
  const formattedTitle = formatTitleForUrl(selectedProduct.title);

  if (decodedTitle !== formattedTitle) {
    return <p>محصول مورد نظر یافت نشد.</p>;
  }

  return (
    <Layout>
      <SingleProduct product={selectedProduct} />
    </Layout>
  );
}
