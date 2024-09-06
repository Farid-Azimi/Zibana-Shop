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
  
  export interface Category {
    title: string;
    items: string[];
  }

  export interface User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
  }