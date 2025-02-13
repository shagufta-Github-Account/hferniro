



"use client";

import { fetchData, Iproduct } from "@/services/sanityApi";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/store"; // Cart State Hook
import Link from "next/link";
import { product } from "@/sanity/schemaTypes/product";

export default function ProductList() {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart(); // Add to Cart Function

  useEffect(() => {
    const sanityFetch = async () => {
      try {
        const res = await fetchData();
        setProducts(res);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      }
    };
    sanityFetch();
  }, []);

  if (error) {
    return <h1 className="text-red-500 text-center">Error: {error}</h1>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Our Products</h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div key={item._id} className="bg-white shadow-md rounded-lg p-4 hover:scale-105">
            <Image width={300} height={200} src={Array.isArray(item.image) ? item.image[0] : item.image || ''} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-500 text-sm">{item.tags}</p>
              <p className="text-lg font-bold text-gray-800">${item.price}</p>
              <button onClick={() => addToCart(item)} className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Button */}
      <div className="text-center mt-8">
        <Link href="/checkout">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}



















//"use client";

// import { fetchData, Iproduct } from "@/services/sanityApi";
// import { useEffect, useState } from "react";
// import Image from "next/image";

// import Link from "next/link";
// import { product } from "@/sanity/schemaTypes/product";

// export default function ProductList() {
//   const [products, setProducts] = useState<Iproduct[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const sanityFetch = async () => {
//       try {
//         const res = await fetchData();
//         setProducts(res);
//       } catch (err: any) {
//         setError(err.message || "An unexpected error occurred.");
//       }
//     };

//     sanityFetch();
//   }, []);

//   if (error) {
//     return <h1 className="text-red-500 text-center">Error: {error}</h1>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Hero Section */}
//       <div className="text-center mb-10">
//         <h1 className="text-4xl font-bold">Our Products</h1>
//       </div>
      
//       {/* Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((item, index) => (
//           <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden p-4 transition-transform transform hover:scale-105">
            
            
//             <Image width={300} height={200} src={item.image} alt={`Image of ${item.title}`} className="w-full h-48 object-cover" />
//             <div className="p-4">
//               <h2 className="text-lg font-semibold">{item.title}</h2>
//               <p className="text-gray-500 text-sm">{item.tags}</p>
//               <p className="text-lg font-bold text-gray-800">${item.price}</p>
//               <p className="text-sm text-green-500">Discount: {item.dicountPercentage || "N/A"}%</p>
//               <p className="text-sm text-gray-600">Condition: {item.isNew ? "New" : "Old"}</p>
//             </div>
          
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

















// "use client";

// import { fetchData, Iproduct } from "@/services/sanityApi";
// import { useEffect, useState } from "react";
// import Image from "next/image";

// export default function ProductList() {
//   const [products, setProducts] = useState<Iproduct[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const sanityFetch = async () => {
//       try {
//         const res = await fetchData();
//         setProducts(res);
//       } catch (err: any) {
//         setError(err.message || "An unexpected error occurred.");
//       }
//     };

//     sanityFetch();
//   }, []);

//   if (error) {
//     return <h1 className="text-red-500 text-center">Error: {error}</h1>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Hero Section */}
//       <div className="text-center mb-10">
//         <h1 className="text-4xl font-bold">Discover Our Most Collections</h1>
//       </div>
      
//       {/* Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((item, index) => (
//           <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden p-4">
//             <Image width={300} height={200} src={item.image} alt={`Image of ${item.title}`} className="w-full h-48 object-cover" />
//             <div className="p-4">
//               <h2 className="text-lg font-semibold">{item.title}</h2>
//               <p className="text-gray-500 text-sm">{item.tags}</p>
//               <p className="text-lg font-bold text-gray-800">${item.price}</p>
//               <p className="text-sm text-green-500">Discount: {item.dicountPercentage || "N/A"}%</p>
//               <p className="text-sm text-gray-600">Condition: {item.isNew ? "New" : "Old"}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

















//  "use client";

// import { fetchData, Iproduct } from "@/services/sanityApi"; // Ensure this path is correct
// import { useEffect, useState } from "react";
// import Image from "next/image";

// export default function ProductList() {
//   const [products, setProducts] = useState<Iproduct[]>([]);
//   const [error, setError] = useState<string | null>(null); // Updated to handle potential null values

//   useEffect(() => {
//     const sanityFetch = async () => {
//       try {
//         const res = await fetchData();
//         setProducts(res);
//       } catch (err: any) {
//         setError(err.message || "An unexpected error occurred."); // Handle error messages gracefully
//       }
//     };

//     sanityFetch();
//   }, []);

//   if (error) {
//     return <h1>Error: {error}</h1>; // Display error if one occurs
//   }

//   return (
//     <div>
//       {products.map((item, index) => (
//         <div key={index}>
//           <h1>{item.title}</h1>
//           <h2>{item.tags}</h2>
//           <h3>{item.price}</h3>
//           <p>Discount: {item.dicountPercentage || "N/A"}%</p>
//           <p>Condition: {item.isNew ? "New" : "Old"}</p>
//           <Image width={300} height={200} src={item.image} alt = {`Image of ${item.title}`} />
//           <hr />
//         </div>
//       ))}
//     </div>
//   );
// }