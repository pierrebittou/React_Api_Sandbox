//import { createRequire } from "module";
//const require = createRequire(import.meta.url);

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const router = express.Router();
const http = require("http");

const app = express();
const port = process.env.PORT || 8080;

//const admin = require("firebase-admin");
//const db = require("./db");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(morgan("combined"));
app.use(cors());

//db.use();

// const firebaseConfig = {
//   apiKey: "AIzaSyDsnT0Zhj4lXBkX4g21o9ngV242MLyEP1A",
//   authDomain: "dashboard-f83a6.firebaseapp.com",
//   databaseURL: "https://dashboard-f83a6-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "dashboard-f83a6",
//   storageBucket: "dashboard-f83a6.appspot.com",
//   messagingSenderId: "156514531064",
//   appId: "1:156514531064:web:ba6105143bb7cb85eeed0d"
// };

// initializeApp(firebaseConfig);
// export const db = getFirestore(app);

// Requests processing will be defined in the file router
require("./router")(app);
app.use(router);

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
