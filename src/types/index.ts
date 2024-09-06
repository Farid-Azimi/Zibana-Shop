import { StaticImageData } from 'next/image';

export interface Product {
    id: string;
    name: string;
    brand: string;
    category: string;
    description: string;
    originalPrice: string;
    hasDiscount: boolean;
    discountedPrice: string;
    imageSrc: StaticImageData;
  }