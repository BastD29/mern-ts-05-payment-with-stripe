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

    // session: {
    //   id: 'cs_test_b1qz7k1X0m3nzSB1HiFAXx1vw6J6rH6UhAEG7RJgq7CG9Y7pUb4FIYvmPx',
    //   object: 'checkout.session',
    //   after_expiration: null,
    //   allow_promotion_codes: null,
    //   amount_subtotal: 50000,
    //   amount_total: 50000,
    //   automatic_tax: { enabled: false, liability: null, status: null },
    //   billing_address_collection: null,
    //   cancel_url: 'http://localhost:5173/cancel.html',
    //   client_reference_id: null,
    //   client_secret: null,
    //   consent: null,
    //   consent_collection: null,
    //   created: 1721410821,
    //   currency: 'usd',
    //   currency_conversion: null,
    //   custom_fields: [],
    //   custom_text: {
    //     after_submit: null,
    //     shipping_address: null,
    //     submit: null,
    //     terms_of_service_acceptance: null
    //   },
    //   customer: null,
    //   customer_creation: 'if_required',
    //   customer_details: null,
    //   customer_email: null,
    //   expires_at: 1721497221,
    //   invoice: null,
    //   invoice_creation: {
    //     enabled: false,
    //     invoice_data: {
    //       account_tax_ids: null,
    //       custom_fields: null,
    //       description: null,
    //       footer: null,
    //       issuer: null,
    //       metadata: {},
    //       rendering_options: null
    //     }
    //   },
    //   livemode: false,
    //   locale: null,
    //   metadata: {},
    //   mode: 'payment',
    //   payment_intent: null,
    //   payment_link: null,
    //   payment_method_collection: 'if_required',
    //   payment_method_configuration_details: null,
    //   payment_method_options: { card: { request_three_d_secure: 'automatic' } },
    //   payment_method_types: [ 'card' ],
    //   payment_status: 'unpaid',
    //   phone_number_collection: { enabled: false },
    //   recovered_from: null,
    //   saved_payment_method_options: null,
    //   setup_intent: null,
    //   shipping_address_collection: null,
    //   shipping_cost: null,
    //   shipping_details: null,
    //   shipping_options: [],
    //   status: 'open',
    //   submit_type: null,
    //   subscription: null,
    //   success_url: 'http://localhost:5173/success.html',
    //   total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
    //   ui_mode: 'hosted',
    //   url: 'https://checkout.stripe.com/c/pay/cs_test_b1qz7k1X0m3nzSB1HiFAXx1vw6J6rH6UhAEG7RJgq7CG9Y7pUb4FIYvmPx#fidkdWxOYHwnPyd1blpxYHZxWjA0VTJPTmtAajVsTzNLYWliVG5iVWNkXWE2PDJTf1UxYmJmMUhDQzFfdDRPU0tURn08M1Ywcl1hTGZDS21UYFFnVTd3M0pDMTdKcFxqU3FUR2h%2FZktwb3wxNTVoQWt1UnMycCcpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPydocGlxbFpscWBoJyknYGtkZ2lgVWlkZmBtamlhYHd2Jz9xd3BgeCUl'
    // }

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export { createCheckoutSession };
