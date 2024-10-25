"use client";
import Layout from "../../../components/Layout/Layout";
import { useParams } from "next/navigation";
import SingleProduct from "../../../components/SingleProduct/SingleProduct";
import { products } from "../../../data/productData";

export default function SingleProductPage() {
  const params = useParams();
  const id = params?.id;

  const product = products.find((product) => product.id === id);

  if (!product) {
    return <p>محصول مورد نظر یافت نشد.</p>;
  }

  return (
    <>
      <Layout>
        <SingleProduct product={product} />
      </Layout>
    </>
  );
}
