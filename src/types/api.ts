import { data } from "../lib/topCryptoCurrencies__mock__";

export type CryptoListLatest = {
  data: {
    [key in keyof typeof data[0]]: typeof data[0][key];
  }[];
};
