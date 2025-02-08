"use client";
import Link from "next/link";
import Image from "next/image";
import balance from "../../images/brands/محصولات-بالانس-min.png";
import purest from "../../images/brands/محصولات-پیورست-بنر-min.png";
import dermedic from "../../images/brands/محصولات-درمدیک-min.png";
import neutrogena from "../../images/brands/نوتروژینا-بنر-min.png";

export default function BrandsList() {
  return (
    <>
      <div className="flex items-center justify-center w-full p-4 gap-4">
        <Link href="balance">
          <div className="w-80 h-60 relative transition-transform duration-300 hover:scale-105">
            <Image
              src={balance}
              alt="balance"
              layout="fill"
              loading="lazy"
              className="rounded-b-2xl"
            />
          </div>
        </Link>
        <Link href="purest">
          <div className="w-80 h-60 relative transition-transform duration-300 hover:scale-105">
            <Image
              src={purest}
              alt="purest"
              layout="fill"
              loading="lazy"
              className="rounded-b-2xl"
            />
          </div>
        </Link>
        <Link href="dermedic">
          <div className="w-80 h-60 relative transition-transform duration-300 hover:scale-105">
            <Image
              src={dermedic}
              alt="dermedic"
              layout="fill"
              loading="lazy"
              className="rounded-b-2xl"
            />
          </div>
        </Link>
        <Link href="neutrogena">
          <div className="w-80 h-60 relative transition-transform duration-300 hover:scale-105">
            <Image
              src={neutrogena}
              alt="neutrogena"
              layout="fill"
              loading="lazy"
              className="rounded-b-2xl"
            />
          </div>
        </Link>
      </div>
    </>
  );
}
