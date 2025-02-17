"use client";

import { memo, useCallback, useEffect } from "react";
import ProductSlider from "../ProductSlider/ProductSlider";
import useFetchProducts from "../../hooks/useFetchProducts";

interface ProductSliderContainerProps {
  endpoint: string;
  promoImageSrc: string;
  bgColor: string;
  productLimit: number;
  title: string;
}

const ProductSliderContainer: React.FC<ProductSliderContainerProps> = memo(
  ({ endpoint, promoImageSrc, bgColor, productLimit, title }) => {
    const { products, fetchProducts } = useFetchProducts({
      endpoint,
      productLimit,
    });

    const fetchProductsCallback = useCallback(() => {
      fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
      fetchProductsCallback();
    }, [fetchProductsCallback]);

    return (
      <ProductSlider
        promoImageSrc={promoImageSrc}
        title={title}
        bgColor={bgColor}
        products={products}
      />
    );
  }
);

ProductSliderContainer.displayName = "ProductSliderContainer";
export default ProductSliderContainer;
