import express from "express";
import { NODE_ENV, PORT /* STRIPE_PRIVATE_KEY */ } from "./config/environments";
import session from "./routes/session";
// import Stripe from "stripe";

// if (!STRIPE_PRIVATE_KEY) {
//   throw new Error("Stripe private key is not defined");
// }

const app = express();

app.use(express.json());

// const stripe = new Stripe(STRIPE_PRIVATE_KEY);

// const storeItems = new Map([
//   [1, { priceInCents: 10000, name: "Learn React Today" }],
//   [2, { priceInCents: 20000, name: "Learn CSS Today" }],
// ]);

app.use("/api/sessions", session);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${NODE_ENV} environment`);
});
