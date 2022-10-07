const express = require("express");
const axios = require("axios");
const Port = 1488;
const app = express();

app.get("/price", async (req, res) => {
  try {
    const { from, to, amount } = req.query;
    if (typeof from !== "string" || typeof to !== "string" || isNaN(amount)) {
      console.log("err");
      const ERROR = {
        ERR: "Ne validnie danniy",
      };
      res.send(ERROR);
      return;
    }
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/tools/price-conversion",
      {
        params: {
          symbol: `${from}`,
          convert: `${to}`,
          amount: `${amount}`,
        },
        headers: {
          "X-CMC_PRO_API_KEY": "19b9c5be-e8c4-4b3d-98fc-60b76dd095cd",
        },
      }
    );
    const price = response.data.data.quote[to.toUpperCase()].price;
    const Prices = {
      Prices: price,
    };
    res.send(Prices);
  } catch (err) {
    const ERROR = {
      ERR: "error",
    };
    res.send(ERROR);
  }
});

app.listen(Port, () => {
  console.log(`http://localhost:${Port}/`);
});
