import { config } from "dotenv";
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://mudrex.vercel.app"],
  })
);

const PORT = process.env.PORT || "8080";

const TOP_100_URL =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

const CMC_KEY = process.env.CMC_KEY || "";

(async () => {
  try {
    app.get("/latest", async (_req, res) => {
      const response = await fetch(TOP_100_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CMC_PRO_API_KEY": CMC_KEY,
          "Accept-Encoding": "deflate,gzip",
        },
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: response.statusText });
      }

      const data = await response.json();

      res.send(data);
    });

    app.listen(PORT, () => {
      console.log("Server up and running 🚀");
    });
  } catch (error) {
    console.error(error);
  }
})();
