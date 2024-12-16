import { Dispatch, SetStateAction } from "react";
import { useUserStore } from "../../stores/useUserStore";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import Link from "next/link";
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
        <Link href="/account">
          <Button className="flex items-center px-4 py-2 space-x-2">
            <span>{firstName}</span>
            <Icon name={"IoIosArrowBack"} className={"w-4 h-4"} />
          </Button>
        </Link>
        <ul className="py-1">
          <li className="px-4 py-2 border-solid">پیگیری سفارشات</li>
          <li className="px-4 py-2 flex">
            {" "}
            <Icon name="IoMdHeartEmpty" size={25} />
            علاقه‌مندی‌های من
          </li>
          <li className="px-4 py-2">نقد و بررسی</li>
          <li className="px-4 py-2 border-t">
            <Button
              onClick={() => {
                resetUser();
                handleIsUserModalOpen(false);
              }}
            >
              خروج از حساب کاربری
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
