const express = require('express');
const app = express();
const session = require('express-session');
const exphbs = require('express-handlebars');
const configRoutes = require('./routes');

const myLogger = function (req, res, next) {
    console.log(`[${new Date().toUTCString()} ]: ${req.method} ${req.originalUrl} ${  req.session.user ? '':'Non-' }Authenticated User`);
    next();
}

app.use(express.json());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
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
  // console.log(req.session.id);
  if (!req.session.user) {
    // return res.redirect('/');
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
