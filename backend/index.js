require("dotenv").config({
  path: __dirname + "/.env",
});

// import express
const express = require("express"); // create an instance of the express application.
const cors = require("cors");
const PORT = 8000;

const sql = require("mysql2");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/static", express.static("public"));

const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const cashierRouter = require("./routes/cashier");
const cartRouter = require("./routes/cart")
const transactionRouter = require("./routes/transaction")

// Routing
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/cashier", cashierRouter);
app.use("/cart", cartRouter);
app.use("/transaction", transactionRouter);

// 404 middleware
app.use((req, res) => {
  console.log(`404: ${req.url}`);
  res.status(404).json({
    msg: "Not Found Broo",
  });
});

// error middleware
app.use((err, req, res, next) => {
  console.log(`500: ${req.url}`);
  console.log(err);
  res.status(500).json({
    msg: "Internal Server Error Broo",
    err,
  });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT} Gilee`);
});
