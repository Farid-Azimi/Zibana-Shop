// interface ProductProps {
//     product: {
//       id: number;
//       name: string;
//       price: string;
//       image: string;
//       isAvailable: boolean;
//       discount: number | null;
//     };
//   }
  
//   const ProductCard: React.FC<ProductProps> = ({ product }) => {
//     return (
//       <div className="border p-4 rounded shadow-md">
//         <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4" />
//         <h2 className="text-md font-bold">{product.name}</h2>
//         <p className={`text-lg ${product.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
//           {product.isAvailable ? product.price : 'ناموجود'}
//         </p>
//         {product.discount && (
//           <p className="text-sm text-gray-500">تخفیف: {product.discount}%</p>
//         )}
//       </div>
//     );
//   };
  
//   export default ProductCard;
  