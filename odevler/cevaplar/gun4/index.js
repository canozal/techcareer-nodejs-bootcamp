const express = require("express");
const app = express();
const path = require("path");

const PORT = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
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
