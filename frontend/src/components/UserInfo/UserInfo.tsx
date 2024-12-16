import AccountSidebar from "../../components/AccountSidebar/AccountSidebar";
import WishlistItem from "../../components/WishlistItem/WishlistItem";

const wishlistData = [
  {
    id: 1,
    name: "روغن پاک کننده آتوآ غیر جوش زا",
    price: "1,190,000",
    image: "/images/product1.png",
  },
  {
    id: 2,
    name: "ژل شستشو پوست نرمال تا خشک سراموی اصلی",
    price: "1,790,000",
    image: "/images/product2.png",
  },
];

export default function UserInfo() {
  return (
    <>
      <div className="container mx-auto px-4 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          <div className="hidden lg:block">
            <AccountSidebar />
          </div>

          <div className="lg:col-span-3">
            <h1 className="text-2xl font-semibold mb-6">
              لیست آخرین علاقه‌مندی‌ها
            </h1>
            <div className="space-y-4">
              {wishlistData.map((item) => (
                <WishlistItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
