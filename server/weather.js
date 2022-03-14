// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

const fetch_re = require("cross-fetch");
//const db = require("./db");

var weather_api = {
  fetch_weather_api: async function (city) {
    const response = await fetch_re.fetch(
      "http://api.weatherapi.com/v1/current.json?key=2759feacc4214e8a834155511212411&q=" +
        city
    );
    if (!response.ok) {
      return "No weather found.";
    }
    const data = await response.json();
    return data;
  },
};

module.exports = weather_api;

// 2759feacc4214e8a834155511212411 KEY weather
