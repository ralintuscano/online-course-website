var createError = require("http-errors");
var express = require("express");
var path = require("path");
var favcon = require("serve-favicon");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");

var exphbs = require("express-handlebars");
//const { engine } = require("express-handlebars");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local"),
  Strategy;
var mongo = require("mongodb");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ocwp");
var db = mongoose.connection;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// // view engine setup
app.set("views", path.join(__dirname, "views"));
// app.engine("handlebars", exphbs.engine({ defaultLayout: "layout" }));
// //app.engine("handlebars",engine({ extname: ".handlebars", defaultLayout: "layout" }));
// app.set("view engine", "handlebars");

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine("handlebars", exphbs.engine({ defaultLayout: "layout" }));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//express session bar
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
//passport
app.use(passport.initialize());
app.use(passport.session());

//express validator
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;
      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value,
      };
    },
  })
);

//connect-flash
app.use(flash());

//global vars
app.use(function(req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
