// import { StaticImageData } from "next/image";

// export interface Product {
//   id: string;
//   name: string;
//   brand: string;
//   category: string;
//   description: string;
//   originalPrice: string;
//   hasDiscount: boolean;
//   discountedPrice?: string | null;
//   discountPercentage?: number | null;
//   imageSrc: StaticImageData;
// }

export interface Product {
  id: string; 
  title: string;
  brand: string;
  category: string[]; 
  description: string;
  originalPrice: number;
  discountedPrice?: number; 
  discountPercentage?: number; 
  imageSrc: string;
  likedUsers: string[]; 
  inventory: number;
  soldCount: number; 
}
