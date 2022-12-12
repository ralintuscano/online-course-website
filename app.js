// Setup server, session and middleware here.
// Setup server, session and middleware here.
const express = require("express");
const app = express();
const session = require('express-session');
const static = express.static(__dirname + '/public');
const exphbs = require('express-handlebars');
const hbshelpers = require('handlebars-helpers');
// const multihelpers = hbshelpers();

const configRoutes = require('./routes');
// const helpersDM = require('./')



const exphbs = require("express-handlebars");

app.use("/public", static);

//app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// const hbs = exphbs.create({
//   defaultLayout: 'main',
//   helpers: {...multihelpers, ...helpersDM},
// });



const handlebarsInstance = exphbs.create({
  defaultLayout: 'main',
  // Specify helpers which are only registered on this instance.
  helpers: {
    renderNav: (input) => {
      return true
    },
    asJSON: (obj, spacing) => {
      if (typeof spacing === 'number')
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    },
    eachProperty: (context, options) => {
      var ret = "";
      for(var prop in context)
      {
          ret = ret + options.fn({property:prop,value:context[prop]});
      }
      return ret;
    }
  }
});




app.use;

app.use('/public', static);

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    name: "AuthCookie",
    secret: "some secret string!",
    resave: false,
    saveUninitialized: true,
  })
);

app.use('/protected', (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).render('forbiddenAccess');
  } else {
    next();
  }});
//middleware
const myLogger = function (req, res, next) {
  auth = "(Non-Authenticated User)";
  if (req.session.user) {
    auth = "(Authenticated User)";
  }
  console.log(
    "[" + new Date().toUTCString() + "]: ",
    req.method,
    req.originalUrl,
    auth
  );
  next();
};
app.use(myLogger);

app.engine('handlebars', handlebarsInstance.engine);

// app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

configRoutes(app);




app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
