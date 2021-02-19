const express = require('express');
const cart = require('./cart');

const app = express();
app.use(express.json());

const port = 3000;

const cors = require("cors");

app.use(cors());
app.use(express.static(__dirname + "/public"));

app.use("/cart", cart);

app.listen(port, () => console.log(`Listening on port:  ${port}.`));
console.log("http://localhost:" + port)
