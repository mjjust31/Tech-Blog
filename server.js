const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const routes = require('./routes')
const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);


// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3002;

const hbs = exphbs.create({ helpers });

// Set up sessions
const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 60 * 60 * 1000, //one hour
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));



// Set Handlebars as the default template engine.

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// app.use(express.static("images"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);



// Starts the server to begin listening
app.listen(PORT, () => {
  console.log("Server listening on: http://localhost:" + PORT);
  sequelize.sync({ force: false });
});
