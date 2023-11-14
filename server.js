const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
// const hbs = exphbs.create({});
const session = require("express-session");
// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;
const helpers = require("./utils/helpers");

// Set up sessions
const sess = {
  secret: "Super secret secret",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });
// Set Handlebars as the default template engine.

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static("images"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(require("./controllers/index"));
// app.use(require("./controllers/homePage"));

// Starts the server to begin listening
app.listen(PORT, () => {
  console.log("Server listening on: http://localhost:" + PORT);
});
