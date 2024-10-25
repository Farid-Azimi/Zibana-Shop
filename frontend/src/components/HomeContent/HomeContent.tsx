import Slideshow from "../Slideshow/Slideshow";
import ProductList from "../ProductList/ProductList";
import CategoryList from "../CategoryList/CategoryList";
import BrandsList from "../BrandsList/BrandsList";

export default function HomeContent() {
  return (
    <>
      <div>
        <Slideshow />
        <ProductList />
        <CategoryList />
        <BrandsList />
      </div>
    </>
  );
}
