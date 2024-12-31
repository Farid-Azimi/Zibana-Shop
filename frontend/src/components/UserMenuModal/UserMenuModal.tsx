import { Dispatch, SetStateAction } from "react";
import { useUserStore } from "../../stores/useUserStore";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import Link from "next/link";
import Image from "next/image";
import userImage from "../../images/user.png";

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
      <div className="absolute left-0 top-10 mt-2 w-56 bg-white shadow-md z-10 rounded-xl border-solid border-veryLightGray border-b-2">
        <Link href="/account">
          <div className="flex items-center justify-between px-4 py-2 rounded-t-xl border-solid border-veryLightGray border-b-2 hover:bg-veryLightGray transition duration-300 ease-in-out">
            <div className="flex items-center gap-2">
              <Image src={userImage} alt="user" width={30} height={30} />
              <span>{firstName}</span>
            </div>
            <Icon name={"IoIosArrowBack"} className="text-gray" size={20} />
          </div>
        </Link>
        <ul>
          <li className="p-4 flex items-center gap-3 hover:bg-veryLightGray transition duration-300 ease-in-out">
            <Icon name="VscSaveAs" size={25} />
            <span>لیست سفارشات</span>
          </li>
          <li className="p-4 border-solid border-veryLightGray border-t-2 hover:bg-veryLightGray transition duration-300 ease-in-out">
            <Link href="/wishlist">
            <div className="flex items-center gap-3">
              <Icon name="IoMdHeartEmpty" size={25} />
              <span>علاقه‌مندی‌های من</span>
              </div>
            </Link>
          </li>
          <li className="p-4 flex items-center gap-3 border-solid border-veryLightGray border-t-2 hover:bg-veryLightGray transition duration-300 ease-in-out">
            <Icon name="TfiCommentAlt" size={25} />
            <span>نقد و بررسی</span>
          </li>
          <li className="p-4 border-solid border-veryLightGray border-t-2 hover:bg-veryLightGray transition duration-300 ease-in-out rounded-b-xl">
            <Button
              className="w-full flex items-center gap-3"
              onClick={() => {
                resetUser();
                handleIsUserModalOpen(false);
              }}
            >
              <Icon name="IoExitOutline" size={25} />
              <span>خروج از حساب کاربری</span>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
