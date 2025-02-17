"use client";

import ProductSliderContainer from "../ProductSliderContainer/ProductSliderContainer";
import winner from "../../images/winner.png";

const BestSellingProductSlider = () => {
  return (
    <ProductSliderContainer
      endpoint="most-sold"
      promoImageSrc={winner.src}
      bgColor="bg-[#cd84f1]"
      productLimit={8}
      title="پرفروش ترین ها"
    />
  );
};

export default BestSellingProductSlider;