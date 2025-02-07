import { atom, useAtom } from "jotai";
import { Iproduct } from "@/services/sanityApi";

// Cart State
const cartAtom = atom<Iproduct[]>([]);

export function useCart() {
  const [cart, setCart] = useAtom(cartAtom);

  const addToCart = (product: Iproduct) => {
    setCart((prev) => {
      const existing = prev.find((p) => p._id === product._id);
      if (existing) {
        return prev.map((p) =>
          p._id === product._id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return { cart, addToCart };
}
