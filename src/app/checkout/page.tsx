
"use client";
import { useCart } from "@/lib/store";
import { stripePromise } from "@/lib/stripe";

export default function CheckoutPage() {
  const { cart } = useCart();

  const handleStripeCheckout = async () => {
    const stripe = await stripePromise;
    const res = await fetch("/api/stripe-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart),
    });

    const session = await res.json();
    if (stripe) {
      await stripe.redirectToCheckout({ sessionId: session.id });
    }
  };

  const handleCODCheckout = async () => {
    const res = await fetch("/api/cod-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart),
    });

    const data = await res.json();
    if (data.success) {
      alert("Order placed successfully! Our team will contact you soon.");
    } else {
      alert("Error placing order. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <p className="text-lg mt-2">Choose your payment method</p>

      <div className="mt-4 flex gap-4">
        <button onClick={handleStripeCheckout} className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700">
          Pay with Stripe
        </button>
        <button onClick={handleCODCheckout} className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700">
          Cash on Delivery
        </button>
      </div>
    </div>
  );
}















// "use client";

// import { useCart } from "@/lib/store";
// import { useState } from "react";

// export default function Checkout() {
//   const { cart } = useCart();
//   const [billing, setBilling] = useState({ name: "", email: "", address: "" });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBilling({ ...billing, [e.target.name]: e.target.value });
//   };

//   const handleCheckout = () => {
//     alert(`Order placed for ${billing.name}`);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//       {/* Billing Form */}
//       <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
//       <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
//       <input type="text" name="address" placeholder="Address" onChange={handleChange} className="w-full p-2 border rounded mb-4" />

//       {/* Order Summary */}
//       <h3 className="text-lg font-semibold">Order Summary:</h3>
//       {cart.map((item) => (
//         <div key={item._id} className="flex justify-between py-2 border-b">
//           <span>{item.title} (x{item.quantity})</span>
//           <span>${item.price * (item.quantity || 1)}</span>
//         </div>
//       ))}

//       <button onClick={handleCheckout} className="w-full bg-green-500 text-white py-2 mt-4 rounded-lg hover:bg-green-600">
//         Place Order
//       </button>
//     </div>
//   );
// }












// import Hero from "@/components/common/Hero";
// import { CheckoutBillingForm } from "@/components/forms/CheckoutBillingForm";

// import CheckoutDetailSection from "@/components/sections/checkout/CheckoutDetailSection";
// import ShopBannerSection from "@/components/sections/shop/ShopBannerSection";

// export default function CheckoutPage() {
//   return (
//     <div>
//       <Hero title="Checkout" />
//       <div className="mx-4 md:mx-[130px] flex gap-8 flex-col md:flex-row mt-[98px]">
//         <CheckoutBillingForm />
//         <CheckoutDetailSection />
//       </div>
//       <ShopBannerSection />
//     </div>
//   );
// }