const express = require("express");

const app = express();
const port = 3000;

const cors = require("cors");
app.use(cors());

app.use(express.static(__dirname + "/public"));

app.use(express.json());

const cart = require("./cart");
app.use("/cart-items", cart);

app.listen(port, () => console.log(`Listening on port:  ${port}.`));
console.log("http://localhost:" + port);
