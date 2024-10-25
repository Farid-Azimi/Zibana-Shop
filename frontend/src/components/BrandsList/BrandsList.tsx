"use client";
import Link from "next/link";
import Image from "next/image";
import Button from "../Button/Button";
import loveShopping from "../../images/love-shopping.png";
import p1 from "../../images/brands/purest/تونر-سالیسیلیک-اسید-پیورست-min.jpg";
import p2 from "../../images/brands/purest/سرم-آربوتین-پیورست-min.jpg";
import p3 from "../../images/brands/purest/سرم-رتینول-پیورست-سولوشن-min.jpg";
import p4 from "../../images/brands/purest/سرم-نیاسینامید-و-زینک-پیورست-min.jpg";
import { MdArrowForwardIos } from "react-icons/md";

export default function BrandsList() {
  return (
    <>
      <div className="my-8 p-4 bg-[#cd84f1] rounded-lg flex justify-between items-center w-[85%] mx-auto">
    
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
          className="bg-[#8854d0] text-white text-xl font-bold px-4 py-2 rounded-2xl flex items-center transition-all hover:bg-purple--secondary"
          onClick={() => alert("BrandList Button clicked!")}
        >
          <MdArrowForwardIos />
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


//responsive
// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import Button from "../Button/Button";
// import loveShopping from "../../images/love-shopping.png";
// import p1 from "../../images/brands/purest/تونر-سالیسیلیک-اسید-پیورست-min.jpg";
// import p2 from "../../images/brands/purest/سرم-آربوتین-پیورست-min.jpg";
// import p3 from "../../images/brands/purest/سرم-رتینول-پیورست-سولوشن-min.jpg";
// import p4 from "../../images/brands/purest/سرم-نیاسینامید-و-زینک-پیورست-min.jpg";
// import { MdArrowForwardIos } from "react-icons/md";

// export default function BrandsList() {
//   return (
//     <div className="mt-8 p-4 bg-[#cd84f1] rounded-lg flex flex-col md:flex-row justify-between items-center w-[90%] md:w-[85%] mx-auto">
      
//       <div className="w-16 h-16 md:w-24 md:h-24 relative mr-0 md:mr-3 mb-4 md:mb-0">
//         <Image
//           src={loveShopping}
//           alt="loveShopping"
//           layout="fill"
//           objectFit="contain"
//         />
//       </div>

//       <div className="text-center md:text-left flex-1 mb-4 md:mb-0">
//         <span className="text-xl md:text-3xl font-bold">محصولات درمانی پیورست</span>
//       </div>

//       <Button
//         className="bg-[#8854d0] text-white text-sm md:text-xl font-bold px-4 py-2 md:rounded-2xl rounded-lg flex items-center transition-all hover:bg-purple--secondary mb-4 md:mb-0"
//         onClick={() => alert("BrandList Button clicked!")}
//       >
//         <MdArrowForwardIos className="ml-2" />
//         مشاهده و خرید
//       </Button>

//       <div className="flex flex-wrap justify-center md:justify-between items-center w-full md:w-[40%]">
//         <Link href="p1">
//           <div className="w-16 h-16 md:w-24 md:h-24 relative m-2">
//             <Image src={p1} alt="p1" layout="fill" className="rounded-full" />
//           </div>
//         </Link>
//         <Link href="p2">
//           <div className="w-16 h-16 md:w-24 md:h-24 relative m-2">
//             <Image src={p2} alt="p2" layout="fill" className="rounded-full" />
//           </div>
//         </Link>
//         <Link href="p3">
//           <div className="w-16 h-16 md:w-24 md:h-24 relative m-2">
//             <Image src={p3} alt="p3" layout="fill" className="rounded-full" />
//           </div>
//         </Link>
//         <Link href="p4">
//           <div className="w-16 h-16 md:w-24 md:h-24 relative m-2">
//             <Image src={p4} alt="p4" layout="fill" className="rounded-full" />
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// }

