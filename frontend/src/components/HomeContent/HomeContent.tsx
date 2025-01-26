import Slideshow from "../Slideshow/Slideshow";
import DiscountedProductSlider from "../DiscountedProductSlider/DiscountedProductSlider";
import LatestProductSlider from "../LatestProductSlider/LatestProductSlider";
import BestSellingProductSlider from "../BestSellingProductSlider/BestSellingProductSlider";
import MostPopularProductsSlider from "../MostPopularProductSlider/MostPopularProductSlider";
import CategoryList from "../CategoryList/CategoryList";
import PurestBanner from "../PurestBanner/PurestBanner";
import BrandsList from "../BrandsList/BrandsList";
import SuggestedProductsSlider from "../SuggestedProductsSlider/SuggestedProductsSlider";

export default function HomeContent() {
  return (
    <>
      <div>
        <Slideshow />
        <DiscountedProductSlider />
        {/* <PurestBanner /> */}
        <LatestProductSlider />
        <BrandsList />
        <CategoryList />
        <BestSellingProductSlider />
        <MostPopularProductsSlider />
        <SuggestedProductsSlider />
      </div>
    </>
  );
}
