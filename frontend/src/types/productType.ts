
export interface Product {
  _id: string;
  title: string;
  brand: string;
  category: string[];
  description: string;
  originalPrice: number;
  discountedPrice: number | null;
  discountPercentage: number | null;
  imageSrc: string;
  inventory: number;
  soldCount: number;
}
