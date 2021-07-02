const express = require("express");

const app = express();

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Origin', 'https://api.appfutsal.com/');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "REST API LAP FUTSAL" });
});
// user route
require("./app/routes/pengguna.routes.js")(app);
// lapangan route
require("./app/routes/lapangan.routes.js")(app);
// info kontak route
require("./app/routes/infkontak.routes.js")(app);
// Tanggal main route
require("./app/routes/tglmain.routes.js")(app);
// Tanggal main1 route
require("./app/routes/jammain.routes.js")(app);
// reservasi route
require("./app/routes/reservasi.routes.js")(app);
// reservasi jam main route
require("./app/routes/reservasi-jammain.routes.js")(app);

// set port, listen for requests
app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});
// PROD
// app.listen();