import Slideshow from "../Slideshow/Slideshow";
import ProductList from "../ProductList/ProductList";
import CategoryList from "../CategoryList/CategoryList";


export default function HomeContent() {

  return (
    <>
      <div>
        <Slideshow />
        <ProductList />
        <CategoryList />

        {/* <div className="mt-8 p-4 bg-purple-100 rounded-lg flex justify-between items-center">
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center">
          مشاهده
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <div className="flex items-center">
          <span className="text-lg">محصولات درمانی پیورست</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-pink-600 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h18M9 3v18m6-18v18"
            />
          </svg>
        </div>
      </div> */}
      </div>
    </>
  );
}
