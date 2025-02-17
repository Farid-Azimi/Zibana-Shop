"use client";

import ProductSliderContainer from "../ProductSliderContainer/ProductSliderContainer";
import promo from "../../images/promo.png";

const DiscountedProductSlider = () => {
  return (
    <ProductSliderContainer
      endpoint="discounted"
      promoImageSrc={promo.src}
      bgColor="bg-[#f8a5c2]"
      productLimit={10}
      title="پیشنهاد شگفت انگیز زیبانا"
    />
  );
};

export default DiscountedProductSlider;