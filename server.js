const express = require("express"); //initializing express+its methods
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 3001;

require("dotenv").config();

let notes = [
  { user: "Striemer#4188", country: "DEU" },
  { user: "wart#0416", country: "USA" },
  { user: "ISellDrugsToTheCommunity#8648", country: "USA" },
];

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = "to-do-app";

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }) //connecting database to mongo
  .then((client) => {
    console.log(`Now connected to the ${dbName} database.`);
    db = client.db(dbName);
  });

app.set("view engine", "ejs"); //middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// root directory
app.get("/", (req, res) => {
  res.send("<h1>Test</h1>");
});

// req and res are short for request and response
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
