// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

const fetch = require("cross-fetch");
var querystring = require("querystring");
//const db = require("./db");

module.exports = function (router) {
  const weather_api = require("./weather");
  // require("./login")(router);

  router.get("/api/weather/:city", async (req, res) => {
    let response = await weather_api.fetch_weather_api(req.params.city);
    console.log("====================");
    console.log(response);
    console.log("====================");

    res.status(200);
    res.send(response);
  });

  router.get("/about.json", (req, res) => {
    let jsonData = require("./about.json");
    res.send(jsonData);
  });

  router.get("/", (req, res) => {
    res.send("HOME PAGE SERVER. USE CORECT ROUTES TO MAKE REQUESTS");
  });

  router.get("/database/dump", (req, res) => {
    res.send("DATABASE DUMP");
  });

  router.use((req, res) => {
    res.status(404);
    res.json({
      error: "Page not found",
    });
  });

  router.get("/user/login", (req, res) => {
    res.send("/user/login");
  });

  router.get("/user/create", (req, res) => {
    res.send("/user/create");
  });
};
