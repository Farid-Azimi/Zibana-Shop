"use client";

import ProductSliderContainer from "../ProductSliderContainer/ProductSliderContainer";
import notification from "../../images/notification.png";

const LatestProductSlider = () => {
  return (
    <ProductSliderContainer
      endpoint="latest"
      promoImageSrc={notification.src}
      bgColor="bg-[#ea8685]"
      productLimit={6}
      title="جدیدترین ها"
    />
  );
};

export default LatestProductSlider;