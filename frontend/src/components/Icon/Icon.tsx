import { IoBagHandleOutline, IoBagHandle } from "react-icons/io5";
import { VscAccount, VscSaveAs } from "react-icons/vsc";
import { AiOutlineEye, AiFillEye } from "react-icons/ai";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi2";
import {
  IoMdHeartEmpty,
  IoMdHeart,
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosCheckmarkCircle,
} from "react-icons/io";
import { CiSquareRemove, CiSearch } from "react-icons/ci";
import {
  FaPlus,
  FaRegTrashCan,
  FaTrashCan,
  FaMinus,
  FaPercent,
} from "react-icons/fa6";
import {
  MdErrorOutline,
  MdPhoneInTalk,
  MdArrowForwardIos,
  MdOutlineAccountCircle,
  MdAccountCircle,
} from "react-icons/md";
import {
  FaInstagram,
  FaTwitter,
  FaTelegram,
  FaLinkedin,
  FaWhatsapp,
  FaBars,
  FaHome,
  FaListUl,
  FaBlog,
  FaPhoneAlt,
  FaSprayCan,
  FaPumpSoap,
  FaMortarPestle,
  FaPlug,
  FaStar,
  FaCaretLeft,
} from "react-icons/fa";
import { GiLips } from "react-icons/gi";
import { SlDirections } from "react-icons/sl";
import { IoExitOutline } from "react-icons/io5";
import { TfiCommentAlt } from "react-icons/tfi";
import { FiX } from "react-icons/fi";
import { PiShoppingBagLight, PiHeadset, PiSealCheck } from "react-icons/pi";
import { GoStar } from "react-icons/go";
import { RiEBike2Line } from "react-icons/ri";
import { TbShoppingCartCheck, TbShoppingCartX } from "react-icons/tb";
import { FcApproval } from "react-icons/fc";

const list = {
  TbShoppingCartCheck: TbShoppingCartCheck,
  TbShoppingCartX: TbShoppingCartX,
  FcApproval: FcApproval,

  PiSealCheck: PiSealCheck,
  PiHeadset: PiHeadset,
  RiEBike2Line: RiEBike2Line,
  GoStar: GoStar,
  FiX: FiX,
  PiShoppingBagLight: PiShoppingBagLight,
  SlDirections: SlDirections,
  IoExitOutline: IoExitOutline,
  TfiCommentAlt: TfiCommentAlt,
  VscSaveAs: VscSaveAs,
  FaBars: FaBars,
  FaHome: FaHome,
  FaListUl: FaListUl,
  FaBlog: FaBlog,
  FaPhoneAlt: FaPhoneAlt,
  FaSprayCan: FaSprayCan,
  FaPumpSoap: FaPumpSoap,
  FaMortarPestle: FaMortarPestle,
  FaPlug: FaPlug,
  FaStar: FaStar,
  GiLips: GiLips,
  FaPercent: FaPercent,
  FaCaretLeft: FaCaretLeft,
  IoBagHandleOutline: IoBagHandleOutline,
  IoBagHandle: IoBagHandle,
  CiSearch: CiSearch,
  MdArrowForwardIos: MdArrowForwardIos,
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
  IoIosArrowDown: IoIosArrowDown,
  CiSquareRemove: CiSquareRemove,
  FaPlus: FaPlus,
  FaRegTrashCan: FaRegTrashCan,
  FaTrashCan: FaTrashCan,
  FaMinus: FaMinus,
  IoIosCheckmarkCircle: IoIosCheckmarkCircle,
  MdErrorOutline: MdErrorOutline,
  FaInstagram: FaInstagram,
  FaTwitter: FaTwitter,
  FaTelegram: FaTelegram,
  FaLinkedin: FaLinkedin,
  FaWhatsapp: FaWhatsapp,
  MdPhoneInTalk: MdPhoneInTalk,
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
