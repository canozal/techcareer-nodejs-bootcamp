const express = require("express");
const app = express();
const path = require("path");

const PORT = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get("/employees", (req, res) => {
  res.json([
    {
      name: "can",
      duty: "founder",
    },
  ]);
});

app.get("/about", (req, res) => {
  res.json({
    name: "e-corp",
    founder: "can",
  });
});

app.get("/contact", (req, res) => {
  res.json({
    phone: "1234567890",
    adress: "nowhere",
  });
});

app.get("/products", (req, res) => {
  res.json([
    {
      id: 1,
      name: "computer",
    },
    {
      id: 2,
      name: "phone",
    },
  ]);
});

app.listen(PORT, () => {
  console.log("Server is up and running");
});
