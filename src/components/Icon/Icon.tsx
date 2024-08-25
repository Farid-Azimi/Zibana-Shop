import React from "react";
import { AiOutlineEye, AiFillEye } from "react-icons/ai";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi2";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

const list = {
  AiOutlineEye: AiOutlineEye,
  AiFillEye: AiFillEye,
  HiOutlineShoppingCart: HiOutlineShoppingCart,
  HiShoppingCart: HiShoppingCart,
  IoMdHeartEmpty: IoMdHeartEmpty,
  IoMdHeart: IoMdHeart,
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
