"use client";
import Link from "next/link";
import Image from "next/image";
import Button from "../Button/Button";
import loveShopping from "../../images/love-shopping.png";
import p1 from "../../images/brands/purest/تونر-سالیسیلیک-اسید-پیورست-min.jpg";
import p2 from "../../images/brands/purest/سرم-آربوتین-پیورست-min.jpg";
import p3 from "../../images/brands/purest/سرم-رتینول-پیورست-سولوشن-min.jpg";
import p4 from "../../images/brands/purest/سرم-نیاسینامید-و-زینک-پیورست-min.jpg";
import Icon from "../Icon/Icon";


export default function PurestBanner() {
    return (
      <>
        <div className="my-8 p-4 bg-[#b2bec3] rounded-lg flex justify-between items-center w-[85%] mx-auto">
      
          <div className="w-20 h-20 md:w-24 md:h-24 relative mr-3">
            <Image
              src={loveShopping}
              alt="loveShopping"
              layout="fill"
              objectFit="contain"
            />
          </div>
  
          <div className="flex items-center">
            <span className="text-3xl font-bold">محصولات درمانی پیورست</span>
          </div>
  
          <Button
            className="bg-[#a29bfe] text-white text-xl font-bold px-4 py-2 rounded-2xl flex items-center transition-all hover:bg-[#6c5ce7]"
            onClick={() => alert("BrandList Button clicked!")}
          >
            <Icon name="MdArrowForwardIos" />
            مشاهده و خرید
          </Button>
  
          <div className="flex items-center justify-between w-[40%] ml-3">
            <Link href="p1">
              <div className="w-20 h-20 md:w-24 md:h-24 relative">
                <Image src={p1} alt="p1" layout="fill" className="rounded-full" />
              </div>
            </Link>
            <Link href="p2">
              <div className="w-20 h-20 md:w-24 md:h-24 relative">
                <Image src={p2} alt="p2" layout="fill" className="rounded-full" />
              </div>
            </Link>
            <Link href="p3">
              <div className="w-20 h-20 md:w-24 md:h-24 relative">
                <Image src={p3} alt="p3" layout="fill" className="rounded-full" />
              </div>
            </Link>
            <Link href="p4">
              <div className="w-20 h-20 md:w-24 md:h-24 relative">
                <Image src={p4} alt="p4" layout="fill" className="rounded-full" />
              </div>
            </Link>
          </div>
        </div>
      </>
    );
  }
  