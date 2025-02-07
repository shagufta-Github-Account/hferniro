import { NextResponse } from "next/server";
import Stripe from "stripe";

console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-01-27.acacia" });

interface Order {
  products: { title: string; price: number; quantity: number }[];
  totalAmount: number;
  paymentMethod: string;
  status: string;
}

let orders: Order[] = []; // In-memory storage

export async function POST(req: Request) {
  const cartItems = await req.json();

  const lineItems = cartItems.map((item: any) => ({
    price_data: {
      currency: "usd",
      product_data: { name: item.title },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity || 1,
  }));

  try {
    // Create a Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cart`,
    });

    // Save order in memory (or replace with a real database)
    const totalAmount = cartItems.reduce((total: number, item: { title: string; price: number; quantity: number }) => total + item.price * item.quantity, 0);

    const order: Order = {
      products: cartItems,
      totalAmount,
      paymentMethod: "Stripe",
      status: "Paid",
    };

    orders.push(order);

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
}
