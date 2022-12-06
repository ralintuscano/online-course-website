const express = require('express');
const app = express();
const session = require('express-session');
const exphbs = require('express-handlebars');
const hbshelpers = require('handlebars-helpers');
// const multihelpers = hbshelpers();

const configRoutes = require('./routes');
// const helpersDM = require('./')



const myLogger = function (req, res, next) {
    console.log(`[${new Date().toUTCString()} ]: ${req.method} ${req.originalUrl} ${  req.session.user ? '':'Non-' }Authenticated User`);
    next();
}

app.use(express.json());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// const hbs = exphbs.create({
//   defaultLayout: 'main',
//   helpers: {...multihelpers, ...helpersDM},
// });



const hbs = exphbs.create({
  // Specify helpers which are only registered on this instance.
  defaultLayout:'main',
  helpers: {
      renderNav() {return true },
      foo() { return 'FOO!'; },
      bar() { return 'BAR!'; }
  }
});

app.engine('handlebars', hbs.engine);

// app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}

  }));

app.use(myLogger);

app.use('/protected', (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).render('forbiddenAccess');
  } else {
    next();
  }
});

configRoutes(app);


app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
