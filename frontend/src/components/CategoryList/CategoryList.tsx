import Link from "next/link";
import Image from "next/image";
import bodyLotion from "../../images/categories/body-lotion.png";
import eyeMakeup from "../../images/categories/eye-makeup.png";
import lipStick from "../../images/categories/lip-stick.png";
import makeup from "../../images/categories/makeup.png";
import mouthWash from "../../images/categories/mouthwash.png";
import perfume from "../../images/categories/perfume.png";
import skinCare from "../../images/categories/skin-care.png";

const categories = [
  {
    id: 1,
    name: "آرایش صورت",
    imageSrc: makeup,
  },
  {
    id: 2,
    name: "آرایش لب",
    imageSrc: lipStick,
  },
  {
    id: 3,
    name: "لوسیون و روغن بدن",
    imageSrc: bodyLotion,
  },
  {
    id: 4,
    name: "پاک کننده آرایش",
    imageSrc: skinCare,
  },
  {
    id: 5,
    name: "عطر و ادکلن",
    imageSrc: perfume,
  },
  {
    id: 6,
    name: "دهان و دندان",
    imageSrc: mouthWash,
  },
  {
    id: 7,
    name: "آرایش چشم",
    imageSrc: eyeMakeup,
  },
];

export default function CategoryList() {
  return (
    <>
      <div className="bg-white p-4">
        <h2 className="text-center text-2xl font-semibold mb-8">
          دسته‌بندی ها
        </h2>
        <div className="flex justify-evenly">
          {categories.map((category) => (
            <Link
              key={category.id}
              href="#"
              className="flex flex-col items-center gap-3 transition-transform duration-300 hover:scale-110"
            >
              <Image
                src={category.imageSrc}
                alt={category.name}
                objectFit="contain"
                width={130}
                height={130}
              />
              <span className="text-lg">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
