import { BASE_URL, CREATE_CHECKOUT_SESSION } from "../constants/endpoints";
import { CheckoutErrorType, CheckoutResponseType } from "../models/checkout";
import { ItemType } from "../models/item";

/**
 * Creates a checkout session for the provided items.
 *
 * @param {ItemType[]} items - The items to include in the checkout session.
 * @returns {Promise<string>} The URL of the created checkout session.
 * @throws {Error} If the response is not ok or if there is a network error.
 */
const createCheckoutSession = async (items: ItemType[]): Promise<string> => {
  try {
    console.log("items:", items); // prints the expected result

    const url = `${BASE_URL}${CREATE_CHECKOUT_SESSION}`;
    console.log("url:", url);

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
