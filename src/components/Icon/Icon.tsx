import { useState} from "react";
import { IoBagHandleOutline, IoBagHandle } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
// import { MdOutlineAccountCircle, MdAccountCircle } from "react-icons/md";
import { AiOutlineEye, AiFillEye } from "react-icons/ai";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi2";
import {
  IoMdHeartEmpty,
  IoMdHeart,
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io";
import { CiSquareRemove } from "react-icons/ci";
import { FaPlus, FaRegTrashCan, FaTrashCan, FaMinus } from "react-icons/fa6";

const list = {
  IoBagHandleOutline: IoBagHandleOutline,
  IoBagHandle: IoBagHandle,
  // MdOutlineAccountCircle: MdOutlineAccountCircle,
  // MdAccountCircle: MdAccountCircle,
  VscAccount: VscAccount,
  AiOutlineEye: AiOutlineEye,
  AiFillEye: AiFillEye,
  HiOutlineShoppingCart: HiOutlineShoppingCart,
  HiShoppingCart: HiShoppingCart,
  IoMdHeartEmpty: IoMdHeartEmpty,
  IoMdHeart: IoMdHeart,
  IoIosArrowBack: IoIosArrowBack,
  IoIosArrowForward: IoIosArrowForward,
  CiSquareRemove: CiSquareRemove,
  FaPlus: FaPlus,
  FaRegTrashCan: FaRegTrashCan,
  FaTrashCan: FaTrashCan,
  FaMinus: FaMinus,
};

type IconName = keyof typeof list;

interface IconProps {
  name?: IconName;
  className?: string;
  size?: number;
  color?: string;
  title?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

export default function Icon({
  name = "AiOutlineEye",
  className,
  size = 30,
  color,
  title,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: IconProps) {
  const IconComponent = list[name];
  
  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <IconComponent
        className={className}
        size={size}
        color={color}
        title={title}
        onClick={onClick}
      />
    </div>
  );
}
