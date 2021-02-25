// const { request, response } = require("express");
const express = require("express");
const cart = express.Router();

const pool = require("./pg-connection-pool.js");

cart.get("/", (req, res) => {
  let maxPrice = req.query.maxPrice;
  if (maxPrice) {
    pool
      .query("SELECT * FROM shopping_cart WHERE price <=$1", [maxPrice])
      .then((results) => {
        res.status(200).json(results.rows);
      });
  }
  const prefix = req.query.prefix;
  if (prefix) {
    pool
      .query("SELECT * FROM shopping_cart WHERE product LIKE $1", [
        prefix + "%",
      ])
      .then((results) => {

        res.status(200).json(results.rows);
      });
  }
  const pageSize = parseInt(req.query.pageSize);
  if (pageSize) {
    pool
      .query("SELECT * FROM shopping_cart LIMIT $1", [pageSize])
      .then((results) => {
        res.status(200).json(results.rows);
      });
  } else {
    pool.query("SELECT * FROM shopping_cart").then((results) => {
      res.status(200).json(results.rows);
    });
  }
});

cart.get("/:id", (req, res) => {
  let id = parseInt(req.params.id);
  pool
    .query("SELECT * FROM shopping_cart WHERE id = $1", [id])
    .then((results) => {
      // if (!id) {
      //   res.status(404).send("ID Not Found!");
      // } else {
      res.status(200).json(results.rows);
      // }
    });
});

cart.post("/", (req, res) => {
  let item = req.body;
  let price = parseInt(req.body.price);
  pool
    .query(
      `INSERT INTO shopping_cart(product, price, quantity) VAlUES ($1, $2, $3)`,
      [item.product, price, item.quantity]
    )
    .then((results) => {
      res.status(201).json(item);
    });
});

cart.put("/:id", (req, res) => {
  let item = req.body;
  let id = parseInt(req.params.id);
  pool
    .query(
      `UPDATE shopping_cart SET product=$1, price=$2, quantity=$3 WHERE id=$4`,
      [item.product, item.price, item.quantity, id]
    )
    .then((results) => {
      res.status(200).json(item);
    });
});

cart.delete("/:id", (req, res) => {
  let id = parseInt(req.params.id);
  pool.query(`DELETE FROM shopping_cart WHERE id=$1`, [id]).then((results) => {
    res.status(204).json(results.rows);
  })
})

module.exports = cart;
