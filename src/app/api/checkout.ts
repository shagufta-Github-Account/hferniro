import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from 'next';




const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia"
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // Create a Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: req.body.items.map((item: { title: string; price: number; quantity: number }) => ({
          price_data: {
            currency: "usd", // Currency
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100, // Price in cents
          },
          quantity: item.quantity,
        })),
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`, // Where users go on success
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,   // Where users go if they cancel
      });

      // Return session id to frontend
      res.status(200).json({ id: session.id });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
}
