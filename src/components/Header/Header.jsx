import Image from "next/image";
import SearchBox from "../SearchBox/SearchBox";
import zibanaLogo from "../../images/Zibana-logo.png";
import { IoBagHandleOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";

export default function Header() {
  return (
    <>
      <div className="flex justify-between mx-8 my-2">
        <div className="flex gap-6">
          <Image src={zibanaLogo.src} width={200} height={200} />
          <SearchBox />
        </div>
        <div className="flex justify-end gap-10 my-auto relative">
          <div className="flex">
            <div className="flex gap-3">
              <div>
                <p className=" text-[10px] text-gray text-left">کاربری</p>
                <p className=" text-xs mt-1 font-bold">ورود / ثبت نام</p>
              </div>
              <VscAccount className="w-8 h-8" />
            </div>
          </div>
          <div className="flex gap-3 relative">
            <div>
              <p className=" text-[10px] text-gray">سبد خرید</p>
              <p className=" text-xs mt-1 font-bold">خالی است</p>
            </div>

            <span className="absolute bg-purple--secondary p-1 rounded-lg bottom-[60%] left-[20%] h-5 w-5 text-white text-center">
              ۰
            </span>

            <IoBagHandleOutline className="w-8 h-8" />
          </div>
        </div>
      </div>
    </>
  );
}
