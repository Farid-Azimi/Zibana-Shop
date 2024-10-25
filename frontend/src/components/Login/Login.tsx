"use client";

import { useState } from "react";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import LoginSignupModal from "../LoginSignupModal/LoginSignupModal";

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button
        className="flex px-4 py-2 hover:bg-veryLightGray rounded-xl transition duration-300 ease-in-out"
        onClick={handleUserClick}
      >
        <div className="flex gap-3">
          <div>
            <p className="text-[10px] text-gray text-left">کاربری</p>
            <p className="text-xs mt-1 font-bold">ورود / ثبت نام</p>
          </div>
          <Icon name={"VscAccount"} className={"w-8 h-8"} />
        </div>
      </Button>

      {isModalOpen && (
        <>
          <LoginSignupModal
            isModalOpen={isModalOpen}
            handleIsModalOpen={setIsModalOpen}
          />
        </>
      )}
    </>
  );
}
