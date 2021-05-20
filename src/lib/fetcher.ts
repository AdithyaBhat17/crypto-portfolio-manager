type Method = "GET" | "POST" | "PUT" | "DELETE";

const URL = "https://pro-api.coinmarketcap.com/v1";

const CMC_KEY = process.env.REACT_APP_COINMARKETCAP_KEY || "";

export async function fetcher(
  endpoint: string,
  method: Method = "GET",
  body?: string
) {
  return fetch(URL + endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-CMC_PRO_API_KEY": CMC_KEY,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
    .then((response) => response.json())
    .catch((e) => {
      throw new Error(e);
    });
}
