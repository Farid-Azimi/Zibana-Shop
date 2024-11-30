"use client";

import Layout from "../../../components/Layout/Layout";
import SingleProduct from "../../../components/SingleProduct/SingleProduct";
import { useParams } from "next/navigation";
import { useProductData } from "@/data/productData";
import { formatTitleForUrl } from "@/utils/formatTitleForUrl";

export default function SingleProductPage() {

  const { productName } = useParams();
  const { selectedProduct } = useProductData();

  if (!selectedProduct) {
    return <p>محصول مورد نظر یافت نشد.</p>;
  }
 
  const decodedTitle = decodeURIComponent(productName as string || "");
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

