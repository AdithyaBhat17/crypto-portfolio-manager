type Method = "GET" | "POST" | "PUT" | "DELETE";

export const URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export async function fetcher(
  endpoint: string,
  method: Method = "GET",
  body?: string
) {
  return fetch(URL + endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Accept-Encoding": "deflate,gzip",
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
    .then((response) => response.json())
    .catch((e) => {
      throw new Error(e);
    });
}
