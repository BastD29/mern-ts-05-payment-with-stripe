import dotenv from "dotenv";

const env = process.env.NODE_ENV || "development";

dotenv.config({ path: `./environments/.env.${env}` });

const { NODE_ENV, STRIPE_PRIVATE_KEY, PORT, CLIENT_URL, ALLOWED_ORIGIN } =
  process.env;

export { NODE_ENV, PORT, STRIPE_PRIVATE_KEY, CLIENT_URL, ALLOWED_ORIGIN };
