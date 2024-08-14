import Image from "next/image";
import SearchBox from "../SearchBox/SearchBox";
import Navbar from "../Navbar/Navbar";
import zibanaLogo from "../../images/Zibana-logo.png";
import { IoBagHandleOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";

export default function Header() {
  return (
    <header>
      <div className="flex justify-between w-4/5 mx-auto">
        <div className="flex gap-14">
          <Image src={zibanaLogo.src} width={200} height={200} />
          <SearchBox />
        </div>
        <div className="flex justify-end  my-auto relative gap-2">
          <div className="flex px-4 py-2 hover:bg-veryLightGray rounded-xl transition duration-300 ease-in-out">
            <div className="flex gap-3">
              <div>
                <p className=" text-[10px] text-gray text-left">کاربری</p>
                <p className=" text-xs mt-1 font-bold">ورود / ثبت نام</p>
              </div>
              <VscAccount className="w-8 h-8" />
            </div>
          </div>
          <div className="flex gap-3 relative px-4 py-2 hover:bg-veryLightGray rounded-xl transition duration-300 ease-in-out">
            <div>
              <p className=" text-[10px] text-gray">سبد خرید</p>
              <p className=" text-xs mt-1 font-bold">خالی است</p>
            </div>
            <span className="absolute bg-purple--secondary p-1 rounded-lg bottom-[60%] left-[28%] h-5 w-5 text-white text-center">
              ۰
            </span>
            <IoBagHandleOutline className="w-8 h-8" />
          </div>
        </div>
      </div>
      <Navbar />
    </header>
  );
}
