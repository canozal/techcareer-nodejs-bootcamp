const mongoose = require("mongoose");
const { Schema } = mongoose;

const express = require("express");
const app = express();
var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

mongoose.connect("your connection string").catch((err) => {
  //Bağlantı sırasında bir hata meydana gelirse buraya düşüyor
  console.log("Connection Error: ", err);
});

//VS Code üzerinden collection oluşturacağım
const webUserSchema = new Schema({
  name: { type: String, required: true },
  surname: String,
  email: String,
  address: String,
  city: [],
  detail: {},
  addDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  addDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

const bootcampSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  addDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  duration: { type: String, required: true },
});

const webUserModel = mongoose.model("WebUser", webUserSchema);
const productModel = mongoose.model("Product", productSchema);
const bootcampModel = mongoose.model("Bootcamp", bootcampSchema);

app.post("/bootcamp", (req, res) => {
  const newBootcamp = new bootcampModel(req.body);
  newBootcamp.save((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

app.post("/product", (req, res) => {
  const product = new productModel(req.body);
  product.save((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

app.post("/webUser", (req, res) => {
  var webUser = new webUserModel({
    name: "can",
    surname: "ozal",
    email: "canozal@gmail.com",
    address: "Olmayan bir kolon",
    city: ["İzmir", "İstanbul", "Ankara"],
    detail: { language: "English", color: "Yellow" },
  });

  webUser.save((err, result) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log("Result: ", result);
    }
    res.send(result);
  });
});

app.listen(8080, () => {
  console.log("Sunucum çalışıyor...");
});
