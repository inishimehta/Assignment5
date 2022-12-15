/*********************************************************************************
* BTI325 – Assignment 5
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Nishi Mehta Student ID: 152-417-218 Date: 2022-12-14
* Cyclic link: https://doubtful-ruby-pike.cyclic.app/
********************************************************************************/ 

//refactor the routes to put them in routes folder
const express = require("express");
const path = require("path");
const app = express();
const exphbs = require("express-handlebars");
const dotenv = require("dotenv");
dotenv.config();
const { initialize } = require("./data-service");

//PORT definition
const PORT = process.env.PORT || 8080;

//onServerStart function
const onServerStart = () =>
  console.log(`Express http server listening on port: ${PORT}`);

//show correct active item in navbar
app.use(function (req, res, next) {
  let route = req.baseUrl + req.path;
  app.locals.activeRoute = route == "/" ? "/" : route.replace(/\/$/, "");
  next();
});

//set up handlebars template engine
app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    defaultLayout: "main",
    helpers: {
      navLink: function (url, options) {
        return (
          "<li" +
          (url == app.locals.activeRoute ? ' class="active" ' : "") +
          '><a href=" ' +
          url +
          ' ">' +
          options.fn(this) +
          "</a></li>"
        );
      },
      equal: function (lvalue, rvalue, options) {
        if (arguments.length < 3)
          throw new Error("Handlebars Helper equal needs 2 parameters");
        if (lvalue != rvalue) {
          return options.inverse(this);
        } else {
          return options.fn(this);
        }
      },
    },
  })
);
app.set("view engine", ".hbs");

//serving static files like css
app.use(express.static(__dirname + "/public"));

//using urlencoded/json for form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//all the routes are defined under routes/routes.js
app.use("/", require("./routes/routes"));

//Error 404, if user tries to go to any other routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "/views/error.html"));
});

//start the server only if the data was populated to the global array
initialize()
  .then(() => app.listen(PORT, onServerStart))
  .catch((e) => console.log(e, "server is offline"));
