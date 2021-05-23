export const CURRENCY_KEY = "MUDREX_USER_CURRENCY";

export const SUPPORTED_CURRENCIES = {
  INR: { symbol: "₹", rate: 73.61 },
  USD: { symbol: "$", rate: 1 },
};

export type Currency = keyof typeof SUPPORTED_CURRENCIES;

function isValidCurrency(currency: any): asserts currency is Currency {
  if (!(currency in SUPPORTED_CURRENCIES))
    throw new TypeError(`${currency} is not supported`);
  return;
}

export function getUserCurrency(): Currency {
  const persistedCurrency = localStorage.getItem(CURRENCY_KEY);
  isValidCurrency(persistedCurrency);
  return persistedCurrency || "INR";
}

export function setUserCurrency(currency: Currency): void {
  localStorage.setItem(CURRENCY_KEY, currency);
}
