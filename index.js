const bodyParser = require("body-parser");
const port = 8000;

const express = require("express");
const cookie = require("cookie-parser");

const routes = require("./routes");

const app = express();

app.use(cookie());

app.use(bodyParser.json());

app.use(routes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("*", (req, res) => {
  res.status(404).end();
});

app.listen(port, () => {
  console.log(`Serveur NodeJS écoutant sur le port ${port}`);
});
