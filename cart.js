const express = require("express");
const cart = express.Router();

const cartList = [
  { id: 1, item: "laptop", price: 1500, quantity: 5 },
  { id: 2, item: "guitar", price: 200, quantity: 10 },
  { id: 3, item: "textbook", price: 100, quantity: 50 },
  { id: 4, item: "headphones", price: 75, quantity: 15 },
  { id: 5, item: "charger", price: 12, quantity: 35 },
  { id: 6, item: "fancy folder", price: 3, quantity: 150 },
  { id: 7, item: "altoid", price: 3, quantity: 200 },
  { id: 8, item: "backpack", price: 50, quantity: 15 },
];

cart.get("/", (req, res) => {
  const price = (req.query.price);

  if (price) {
    const newCart = cartList.filter((maxPrice) => {
      return maxPrice.price <= price;
    });
    res.json(newCart);
  }

  res.status(200);
  res.json(cartList);
});

cart.get("/", (req, res) => {
  const id = (req.query.id);
  if (id) {
    const newCartwithId = cartList.includes((getId) => {
      return getId.id = id;
    });
    res.json(newCartwithId);
  }
  res.status(200);
  res.json(cartList);
})

module.exports = cart;
