import { Product } from "../types/productType";
import product1 from "../images/products/product1.jpg";
import product2 from "../images/products/product2.jpg";

const calculateDiscountPercentage = (
  originalPrice: string,
  discountedPrice: string
): number | null => {
  const original = parseInt(originalPrice.replace(/,/g, ""));
  const discounted = parseInt(discountedPrice.replace(/,/g, ""));

  if (original && discounted && original > discounted) {
    return Math.round(((original - discounted) / original) * 100);
  }

  return null;
};

const calculateDiscountedPrice = (
  originalPrice: string,
  discountPercentage: number
): string | null => {
  const original = parseInt(originalPrice.replace(/,/g, ""));

  if (original && discountPercentage > 0 && discountPercentage < 100) {
    const discounted = original * (1 - discountPercentage / 100);
    return discounted.toLocaleString("en-US");
  }

  return null;
};

const setProductDiscounts = (product: Product): Product => {
  if (product.discountedPrice && !product.discountPercentage) {
    product.discountPercentage = calculateDiscountPercentage(
      product.originalPrice,
      product.discountedPrice
    );
  } else if (!product.discountedPrice && product.discountPercentage) {
    product.discountedPrice = calculateDiscountedPrice(
      product.originalPrice,
      product.discountPercentage
    );
  }
  return product;
};

export const products: Product[] = [
  setProductDiscounts({
    id: "1",
    name: "اسنس حلزون کازرکس",
    brand: "بالانس",
    category: "آرایشی",
    description:
      "Labore aute elit Lorem anim sit aliqua cupidatat duis consequat nostrud. Dolor laborum eiusmod ex ad do nulla officia. Culpa commodo pariatur ullamco in minim cillum duis consequat ipsum id in ullamco. Excepteur mollit cillum nostrud est. Officia minim eu qui nisi labore sunt in exercitation ex qui fugiat ea ullamco. Incididunt cupidatat do consectetur eu pariatur est et nostrud occaecat quis sint irure non. Cupidatat ea ex ex excepteur officia reprehenderit est adipisicing ut sit laboris.",
    originalPrice: "989,000",
    hasDiscount: true,
    discountedPrice: "900,000",
    discountPercentage: null,
    imageSrc: product1,
  }),
  setProductDiscounts({
    id: "2",
    name: "ضد آفتاب فیوژن واتر مجیک ایزدین",
    brand: "نوت",
    category: "بهداشتی",
    description:
      "Aliqua sint cillum in do sit consequat laboris laborum quis sint deserunt occaecat. Cupidatat deserunt ipsum ad exercitation et enim. Do aliquip deserunt aute qui ex amet laborum cillum anim nisi ea Lorem id. Nulla duis magna magna in dolor cupidatat Lorem pariatur do ex enim dolore labore incididunt. Anim laboris minim enim et eu in incididunt cillum occaecat nostrud. Exercitation sunt sit eu pariatur velit ullamco magna dolore do. Proident consectetur consequat deserunt tempor anim nisi velit Lorem adipisicing.",
    originalPrice: "1,490,000",
    hasDiscount: true,
    discountedPrice: null,
    discountPercentage: 6,
    imageSrc: product2,
  }),
  setProductDiscounts({
    id: "3",
    name: "اسنس حلزون کازرکس",
    brand: "کازرکس",
    category: "آرایشی",
    description:
      "Lorem et nisi proident duis. Irure deserunt ad magna quis. Exercitation occaecat mollit consequat ad cillum reprehenderit sint.",
    originalPrice: "989,000",
    hasDiscount: true,
    discountedPrice: "930,000",
    discountPercentage: null,
    imageSrc: product1,
  }),
  setProductDiscounts({
    id: "4",
    name: "ضد آفتاب فیوژن واتر مجیک ایزدین",
    brand: "کازرکس",
    category: "مو",
    description:
      "Commodo consectetur consectetur est enim ea sint. Eiusmod eu est et anim amet fugiat non amet id qui ut et ut. Pariatur ullamco non nisi do magna ex excepteur sit enim enim. Officia amet deserunt ad nulla ullamco laboris nisi eiusmod voluptate enim ullamco. Incididunt esse excepteur consectetur anim nulla occaecat.",
    originalPrice: "1,490,000",
    hasDiscount: true,
    discountedPrice: null,
    discountPercentage: 10,
    imageSrc: product2,
  }),
  setProductDiscounts({
    id: "5",
    name: "اسنس حلزون کازرکس",
    brand: "کازرکس",
    category: "بهداشتی",
    description:
      "Non velit cillum mollit et. Nostrud nulla magna quis elit ullamco irure ullamco dolore pariatur nostrud reprehenderit. Proident elit nostrud adipisicing do aliquip ea eiusmod fugiat minim voluptate elit esse aliquip. Elit veniam et officia elit fugiat magna nostrud. Esse exercitation veniam eiusmod eu do mollit cupidatat. Ex qui ipsum duis sit fugiat anim laborum. In aliquip dolore voluptate occaecat cillum laboris aliquip sunt non.",
    originalPrice: "989,000",
    hasDiscount: true,
    discountedPrice: null,
    discountPercentage: 25,
    imageSrc: product1,
  }),
  setProductDiscounts({
    id: "6",
    name: "ضد آفتاب فیوژن واتر مجیک ایزدین",
    brand: "ایزدین",
    category: "آرایشی",
    description:
      "Non qui sit consequat ullamco reprehenderit tempor adipisicing deserunt consectetur consectetur nostrud eu Lorem cupidatat. Nostrud reprehenderit eiusmod consequat in ad. Eiusmod labore sunt eiusmod do voluptate eu. Ea excepteur et ad occaecat laboris adipisicing laboris minim esse culpa voluptate nulla.",
    originalPrice: "1,490,000",
    hasDiscount: false,
    discountedPrice: "1,399,000",
    discountPercentage: null,
    imageSrc: product2,
  }),
  setProductDiscounts({
    id: "7",
    name: "اسنس حلزون کازرکس",
    brand: "ایزدین",
    category: "مد و فشن",
    description:
      "Anim do irure esse tempor proident laborum. Consectetur exercitation officia excepteur esse cillum irure elit sunt non labore Lorem. Ea labore aliquip voluptate voluptate dolor qui. Tempor enim sunt ullamco mollit labore fugiat. Officia cillum ipsum sit velit excepteur. Officia et sit exercitation est id ut aliqua est consectetur anim.",
    originalPrice: "989,000",
    hasDiscount: false,
    discountedPrice: "930,000",
    imageSrc: product1,
  }),
  setProductDiscounts({
    id: "8",
    name: "ضد آفتاب فیوژن واتر مجیک ایزدین",
    brand: "بالانس",
    category: "عطر",
    description:
      "Cillum sint adipisicing aliqua et incididunt deserunt adipisicing quis nostrud Lorem. Aute consequat voluptate consequat laborum quis elit cillum ipsum do anim sit adipisicing esse. Ut adipisicing amet occaecat minim voluptate consequat velit eiusmod mollit fugiat ea proident laboris enim. Aute sunt nisi ex mollit in reprehenderit labore elit eiusmod mollit commodo. Veniam voluptate tempor excepteur id ex proident ut voluptate nostrud duis consequat reprehenderit.",
    originalPrice: "1,490,000",
    hasDiscount: false,
    discountedPrice: "1,399,000",
    discountPercentage: null,
    imageSrc: product2,
  }),
  setProductDiscounts({
    id: "9",
    name: "احلزون س",
    brand: "پیورست",
    category: "لوازم برقی",
    description:
      "Cupidatat duis laborum reprehenderit pariatur ad veniam labore Lorem occaecat. Voluptate cillum eiusmod elit ipsum nostrud qui culpa incididunt. Veniam nulla ipsum sunt duis adipisicing amet consectetur voluptate incididunt ipsum do exercitation ipsum amet. Elit et ad ea ea labore. Do dolor irure consectetur proident mollit labore Lorem sit magna consequat. Sunt anim velit veniam pariatur tempor eu cillum est voluptate labore qui velit qui proident.",
    originalPrice: "989,000",
    hasDiscount: false,
    discountedPrice: "930,000",
    discountPercentage: null,
    imageSrc: product1,
  }),
  setProductDiscounts({
    id: "10",
    name: "ضد آفتاب فیوژن واتر مجیک ایزدین",
    brand: "پیورست",
    category: "مو",
    description:
      "Et tempor duis esse eiusmod minim. Sunt enim sint nisi tempor. Reprehenderit labore elit nulla consectetur.",
    originalPrice: "1,490,000",
    hasDiscount: true,
    discountedPrice: null,
    discountPercentage: 15,
    imageSrc: product2,
  }),
];