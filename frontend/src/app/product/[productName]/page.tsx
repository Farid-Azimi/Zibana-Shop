"use client";

import Layout from "../../../components/Layout/Layout";
import SingleProduct from "../../../components/SingleProduct/SingleProduct";
import { useParams } from "next/navigation";
import { useProductData } from "@/data/productData";
import { formatTitleForUrl } from "@/utils/formatTitleForUrl";
import { useEffect, useMemo } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { useViewHistory } from "@/hooks/useViewHistory";

// export default function SingleProductPage() {
//   const { productName } = useParams();
//   const { selectedProduct, isLoading } = useProductData(); 
//   const { id } = useUserStore();
//   const { addToViewHistory } = useViewHistory();

//   const decodedTitle = useMemo(() => 
//     decodeURIComponent((productName as string) || ""),
//     [productName]
//   );

//   const formattedTitle = useMemo(() => 
//     selectedProduct ? formatTitleForUrl(selectedProduct.title) : "",
//     [selectedProduct]
//   );

//   useEffect(() => {
//     if (selectedProduct?._id && id) {
//       addToViewHistory(id, selectedProduct._id);
//     }
//   }, [selectedProduct, id, addToViewHistory]);

//   if (isLoading) {
//     return <p>در حال بارگذاری...</p>;
//   }

 
//   if (!selectedProduct || decodedTitle !== formattedTitle) {
//     return <p>محصول مورد نظر یافت نشد.</p>;
//   }

//   return (
//     <Layout>
//       <SingleProduct product={selectedProduct} />
//     </Layout>
//   );
// }

export default function SingleProductPage() {
  const { productName } = useParams();
  const { selectedProduct } = useProductData();
  const { id } = useUserStore();
  const { addToViewHistory } = useViewHistory();

  useEffect(() => {
    if (selectedProduct?._id && id) {
      addToViewHistory(id, selectedProduct._id);
    }
  }, [selectedProduct]);
  // }, [selectedProduct, id, addToViewHistory]);

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
