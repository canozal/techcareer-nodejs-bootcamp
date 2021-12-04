const express = require("express");
const app = express();
const { body, validationResult } = require("express-validator");
const bodyParser = require("body-parser");

let suppliers = require("./suppliers");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// get all suppliers (bir kaç tane query string ile)
app.get("/api/suppliers", function (req, res) {
  let orderBy = req.query.orderBy?.toLowerCase();
  let country = req.query.country?.toLowerCase();
  let data = [...suppliers];

  if (country) {
    data = data.filter(
      (supplier) => supplier.address.country?.toLowerCase() == country
    );
  }

  if (orderBy && orderBy == "asc") {
    data.sort((a, b) => a.id - b.id);
  } else if (orderBy && orderBy == "desc") {
    data.sort((a, b) => b.id - a.id);
  }

  res.json(data);
});

// get supplier by id
app.get("/api/suppliers/:id", function (req, res) {
  let id = req.params.id;
  let data = suppliers.find((supplier) => supplier.id == id);
  res.json(data);
});

app.post(
  "/api/suppliers",
  body("companyName").notEmpty(),
  body("contactName").notEmpty(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let data = req.body;
    let id = suppliers[suppliers.length - 1].id + 1;

    const supplier = {};
    supplier.address = {};
    supplier.id = id;

    supplier.companyName = data.companyName;
    supplier.contactName = data.contactName;
    supplier.contactTitle = data.contactTitle;
    supplier.address.street = data.street;
    supplier.address.city = data.city;
    supplier.address.region = data.region;
    supplier.address.postalCode = data.postalCode;
    supplier.address.country = data.country;
    supplier.address.phone = data.phone;

    suppliers.push(supplier);
    res.json(suppliers);
  }
);

app.delete("/api/suppliers/:id", function (req, res) {
  let id = req.params.id;
  let data = suppliers.filter((supplier) => supplier.id != id);
  suppliers = data;
  res.json(suppliers);
});

function setDefaultVal(value, defaultValue) {
  return value === undefined ? defaultValue : value;
}

app.put("/api/suppliers/:id", function (req, res) {
  let id = req.params.id;
  let data = req.body;
  let supplier = suppliers.find((supplier) => supplier.id == id);
  supplier.companyName = setDefaultVal(data.companyName, supplier.companyName);
  supplier.contactName = setDefaultVal(data.contactName, supplier.contactName);
  supplier.contactTitle = setDefaultVal(
    data.contactTitle,
    supplier.contactTitle
  );
  supplier.address.street = setDefaultVal(data.street, supplier.address.street);
  supplier.address.city = setDefaultVal(data.city, supplier.address.city);
  supplier.address.region = setDefaultVal(data.region, supplier.address.region);
  supplier.address.postalCode = setDefaultVal(
    data.postalCode,
    supplier.address.postalCode
  );
  supplier.address.country = setDefaultVal(
    data.country,
    supplier.address.country
  );
  supplier.address.phone = setDefaultVal(data.phone, supplier.address.phone);
  res.json(suppliers);
});

app.listen(3000, () => {
  console.log("Server is up and running...");
});
