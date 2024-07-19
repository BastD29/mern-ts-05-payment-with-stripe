import { BASE_URL, CREATE_CHECKOUT_SESSION } from "../constants/endpoints";
import { CheckoutErrorType, CheckoutResponseType } from "../models/checkout";
import { ItemType } from "../models/item";

const createCheckoutSession = async (items: ItemType[]): Promise<string> => {
  try {
    const url = `${BASE_URL}${CREATE_CHECKOUT_SESSION}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });

    if (!response.ok) {
      const error: CheckoutErrorType = await response.json();
      throw new Error(error.error);
    }

    const data: CheckoutResponseType = await response.json();
    console.log("data from service:", data);

    return data.url;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { createCheckoutSession };
