import { useRouter } from 'next/router';
import { FC } from 'react';
import { Category as CategoryItem } from "../../types/categoryType";

const categories = {
  perfume: [
    { id: 1, name: 'Floral Scent' },
    { id: 2, name: 'Citrus Scent' },
  ],
  sanitary: [
    { id: 1, name: 'Hand Sanitizer' },
    { id: 2, name: 'Face Masks' },
  ],
  makeup: [
    { id: 1, name: 'Lipstick' },
    { id: 2, name: 'Foundation' },
  ],
  hair: [
    { id: 1, name: 'Shampoo' },
    { id: 2, name: 'Hair Dryer' },
  ],
  electric: [
    { id: 1, name: 'Electric Shaver' },
    { id: 2, name: 'Blender' },
  ],
  mod: [
    { id: 1, name: 'Fashion Mod 1' },
    { id: 2, name: 'Fashion Mod 2' },
  ],
};

const CategoryPage: FC = () => {
  const router = useRouter();
  const { category } = router.query;

  // Access the correct category array based on the URL
  const items = categories[category as keyof typeof categories] || [];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold capitalize">{category} Products</h1>
      {items.length > 0 ? (
        <ul>
          {items.map(item => (
            <li key={item.id} className="mt-2">
              {item.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found for this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
