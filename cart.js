const { request, response } = require("express");
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
  // filteredcart = cartlist
  const price = req.query.price;
  const prefix = req.query.prefix;
  const pageSize = req.query.pageSize;

  if (price) {
    const newCart = cartList.filter((maxPrice) => {
      return maxPrice.price <= price;
    });
    res.json(newCart);
  }

  if (prefix) {
    const itemList = cartList.filter((items) => {
      return items.item.toLowerCase().startsWith(prefix.toLowerCase());
    })
    //startsWith
    res.json(itemList)
  }

  if (pageSize) {
    const newList = cartList.slice(0, parseInt(req.query.pageSize)); 
    res.json(newList); 
  }
  res.status(200).json(cartList);
});

cart.get("/:id", (request, response) => {
  var cartItem = cartList.find(
    (cartItem) => cartItem.id === parseInt(request.params.id)
  );
  if (!cartItem) {
    response.status(404).send("ID Not Found");
  }
  response.status(200).json(cartItem);
});

cart.post("/", (req, res) => {
  let item = req.body;
  item.id = cartList.length + 1;
  cartList.push(req.body);
  res.status(201).json(cartList);
});

cart.put("/:id", (req, res) => {
  const index = cartList.findIndex((item) => {
    return item.id === parseInt(req.params.id);
  })
  cartList.splice(index, 1, req.body);
  res.status(200).json(cartList);
});

cart.delete("/:id", (req, res) => {
  const deleteIndex = cartList.findIndex((item) => {
    return item.id === parseInt(req.params.id);
  });
  cartList.splice(deleteIndex, 1);
  res.status(204).json(cartList);
});
module.exports = cart;
