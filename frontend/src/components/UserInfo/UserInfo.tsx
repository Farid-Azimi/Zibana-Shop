import AccountSidebar from "../../components/AccountSidebar/AccountSidebar";
import WishlistPage from "../../components/WishlistPage/WishlistPage";

export default function UserInfo() {
  return (
    <>
      <div className="container mx-auto px-4 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:block my-auto">
            <AccountSidebar />
          </div>
          <div className="col-span-3">
            <WishlistPage />
          </div>
        </div>
      </div>
    </>
  );
}
