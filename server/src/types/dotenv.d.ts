declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test" | "local" | "staging";
    STRIPE_PRIVATE_KEY: string | undefined;
    PORT: string;
    CLIENT_URL: string;
  }
}
