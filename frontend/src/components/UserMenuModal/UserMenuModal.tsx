import { Dispatch, SetStateAction } from "react";
import { useUserStore } from "../../stores/useUserStore";
import Icon from "../Icon/Icon";

export default function UserMenuModal({
  handleIsUserModalOpen,
}: {
  handleIsUserModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { firstName, resetUser } = useUserStore();

  const handleMouseEnter = () => {
    handleIsUserModalOpen(true);
  };
  const handleMouseLeave = () => {
    handleIsUserModalOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute left-0 top-10 mt-2 w-48 bg-white shadow-md z-10">
        <button className="flex items-center px-4 py-2 space-x-2">
          <span>{firstName}</span>
          <Icon name={"IoIosArrowBack"} className={"w-4 h-4"} />
        </button>
        <ul className="py-1">
          <li className="px-4 py-2">پیگیری سفارشات</li>
          <li className="px-4 py-2">علاقه‌مندی‌های من</li>
          <li className="px-4 py-2">نقد و بررسی</li>
          <li className="px-4 py-2 border-t">
            <button
              onClick={() => {
                resetUser();
                handleIsUserModalOpen(false);
              }}
            >
              خروج از حساب کاربری
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
