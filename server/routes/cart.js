const express = require("express");

const router = express.Router();

let cart;

router.get("/cart", (req, res) => {
  console.log(cart);
  res(cart);
});

router.post("/cart", (req, res) => {
  console.log(req.body);
  cart = req.body;
  console.log(cart);
  res.sendStatus(200);
});

module.exports = router;
