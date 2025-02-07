export type Order = {
    products: {
      title: string;
      price: number;
      quantity: number;
    }[];
    totalAmount: number;
    paymentMethod: "Stripe" | "COD";
    status: "Pending" | "Paid";
    createdAt: string;
  };
  