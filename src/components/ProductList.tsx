
 "use client";

import { fetchData, Iproduct } from "@/services/sanityApi"; // Ensure this path is correct
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductList() {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [error, setError] = useState<string | null>(null); // Updated to handle potential null values

  useEffect(() => {
    const sanityFetch = async () => {
      try {
        const res = await fetchData();
        setProducts(res);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred."); // Handle error messages gracefully
      }
    };

    sanityFetch();
  }, []);

  if (error) {
    return <h1>Error: {error}</h1>; // Display error if one occurs
  }

  return (
    <div>
      {products.map((item, index) => (
        <div key={index}>
          <h1>{item.title}</h1>
          <h2>{item.tags}</h2>
          <h3>{item.price}</h3>
          <p>Discount: {item.dicountPercentage || "N/A"}%</p>
          <p>Condition: {item.isNew ? "New" : "Old"}</p>
          <Image width={300} height={200} src={item.image} alt = {`Image of ${item.title}`} />
          <hr />
        </div>
      ))}
    </div>
  );
}