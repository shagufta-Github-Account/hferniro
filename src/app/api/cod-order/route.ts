import { NextResponse } from "next/server";

// In-memory storage or replace with your new database solution
let orders: any[] = [];

export async function POST(req: Request) {
  const cartItems: { price: number; quantity: number }[] = await req.json();

  try {
    // Add order to in-memory array (you can replace this with another DB or storage solution)
    const totalAmount = cartItems.reduce((total, item: { price: number; quantity: number }) => total + item.price * item.quantity, 0);

    const order = {
      products: cartItems,
      totalAmount,
      paymentMethod: "COD", // Replace with dynamic payment method if needed
      status: "Pending",
    };

    orders.push(order); // Simulating an order store, replace with actual DB/API if needed

    return NextResponse.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error placing order" }, { status: 500 });
  }
}
