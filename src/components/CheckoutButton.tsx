import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

// Load Stripe using the public key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function CheckoutButton({ items }: { items: any[] }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    // Call your API to create a checkout session
    const response = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ items }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // If session is created successfully, proceed to checkout
    const session = await response.json();

    if (session.id) {
      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId: session.id });

        if (error) {
          console.error("Stripe Checkout Error: ", error);
        }
      } else {
        console.error("Stripe has not loaded.");
      }
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="bg-blue-500 text-white p-2 rounded"
    >
      {loading ? "Processing..." : "Checkout"}
    </button>
  );
}
