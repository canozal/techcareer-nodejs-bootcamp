const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Brezilya dan kaç adert sipariş aldım
const brasilOrderCount = (data) => {
  console.log(
    data.filter((item) =>
      item.shipAddress?.street?.toLowerCase().includes("brasil".toLowerCase())
    ).length
  );
};

// Brezilyadan aldığım siparişlerin toplam tutarı
const orderPriceFromBrasil = (data) => {
  let price = 0;
  data.forEach((item) => {
    if (item.shipAddress?.street?.toLowerCase().includes("brasil")) {
      price += item.details[0]?.unitPrice * item.details[0]?.quantity;
    }
  });

  console.log(price);
};

// Birezilyadan aldığım en yüksek sipariş
const maxPriceFromBrasil = (data) => {
  console.log(
    data.sort(
      (a, b) =>
        b.details[0]?.unitPrice * b.details[0]?.quantity -
        a.details[0]?.unitPrice * a.details[0]?.quantity
    )[0]
  );
};

const homeWork = async () => {
  let response = await fetch("https://northwind.vercel.app/api/orders");
  response = await response.json();

  // brasilOrderCount(response);
  //   orderPriceFromBrasil(response);
  maxPriceFromBrasil(response);
};

homeWork();
