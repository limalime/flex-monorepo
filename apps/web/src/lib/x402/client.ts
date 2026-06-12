import {
  wrapFetchWithPaymentFromConfig,
} from "@x402/fetch";

export const fetchWithPayment =
  wrapFetchWithPaymentFromConfig(
    fetch,
    {
      schemes: [],
    },
  );