"use client";

import ProductSliderContainer from "../ProductSliderContainer/ProductSliderContainer";
import popularity from "../../images/popularity.png";

const MostPopularProductsSlider = () => {
  return (
    <ProductSliderContainer
      endpoint="most-liked"
      promoImageSrc={popularity.src}
      bgColor="bg-[#cf6a87]" 
      productLimit={7}
      title="محبوب ترین ها"
    />
  );
};

export default MostPopularProductsSlider;