"use client"
import { useState } from "react";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import LoginSignupModal from "../LoginSignupModal/LoginSignupModal";
import UserMenuModal from "../UserMenuModal/UserMenuModal";
import { useUserStore } from "../../stores/useUserStore";

export default function LoginSignup() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const { email, firstName, lastName } = useUserStore();

  const handleMouseEnter = () => {
    if (email) setIsUserModalOpen(true);
  };
  const handleMouseLeave = () => {
    if (email) setIsUserModalOpen(false);
  };
  const handleUserClick = () => {
    if (!email) setIsLoginModalOpen(true);
  };

  return (
    <>
      <Button
        className="flex px-4 py-2 hover:bg-veryLightGray rounded-xl transition duration-300 ease-in-out"
        onClick={handleUserClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex gap-3">
          <div>
            <p className="text-[10px] text-gray text-left">کاربری</p>
            {email ? (
              <p className="text-xs mt-1 font-bold">
                {firstName} {lastName}
              </p>
            ) : (
              <p className="text-xs mt-1 font-bold">ورود / ثبت نام</p>
            )}
          </div>
          <Icon name={"VscAccount"} className={"w-8 h-8"} />
          {email && <Icon name={"IoIosArrowDown"} className={"w-4 h-4 mt-2"} />}
        </div>
      </Button>

      {isLoginModalOpen && (
        <LoginSignupModal
          handleIsModalOpen={setIsLoginModalOpen}
        />
      )}

      {isUserModalOpen && (
        <UserMenuModal handleIsUserModalOpen={setIsUserModalOpen} />
      )}
    </>
  );
}
