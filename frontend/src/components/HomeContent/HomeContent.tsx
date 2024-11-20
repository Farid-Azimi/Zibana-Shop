import Slideshow from "../Slideshow/Slideshow";
import ProductList from "../ProductList/ProductList";
import promo from "../../images/promo.png";
import winner from "../../images/winner.png";
import notification from "../../images/notification.png";
import CategoryList from "../CategoryList/CategoryList";
import PurestBanner from "../PurestBanner/PurestBanner";
import BrandsList from "../BrandsList/BrandsList";

export default function HomeContent() {
  return (
    <>
      <div>
        <Slideshow />
        <ProductList promoImageSrc={promo.src} bgColor="bg-[#f8a5c2]" filter="discounted"/>
        <PurestBanner />
        <ProductList promoImageSrc={notification.src} bgColor="bg-[#ea8685]"/>
        <BrandsList />
        <CategoryList />
        <ProductList promoImageSrc={winner.src} bgColor="bg-[#cd84f1]"/>
      </div>
    </>
  );
}
