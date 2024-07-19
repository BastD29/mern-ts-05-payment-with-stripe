import { Request, Response } from "express";
import Stripe from "stripe";
import { CLIENT_URL, STRIPE_PRIVATE_KEY } from "../config/environments";
import { storeItems } from "../data/storeItems";
import { ItemType } from "../types/items";

const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    if (!STRIPE_PRIVATE_KEY) {
      throw new Error("Stripe private key is not defined");
    }

    const stripe = new Stripe(STRIPE_PRIVATE_KEY);
    // console.log("stripe:", stripe);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item: ItemType) => {
        const storeItem = storeItems.get(item.id);
        // console.log("storeItem:", storeItem);

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem?.name,
            },
            unit_amount: storeItem?.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${CLIENT_URL}/success.html`,
      cancel_url: `${CLIENT_URL}/cancel.html`,
    });
    console.log("session:", session);

    res.json({ url: session.url });
  } catch (error) {
    // res.status(500).json({ error: error.message });
    res.status(500).json({ error: (error as Error).message });
  }
};

export { createCheckoutSession };
