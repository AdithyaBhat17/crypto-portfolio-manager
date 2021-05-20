import { data } from "../lib/topCryptoCurrencies";

export type CryptoListLatest = {
  data: {
    [key in keyof typeof data[0]]: typeof data[0][key];
  }[];
};
