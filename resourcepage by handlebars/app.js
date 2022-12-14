
const express = require("express");
const app = express();

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
//const path = require('path');




app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', extname: '.handlebars' }));
//app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars');

configRoutes(app);


app.listen(4000, function() {
    console.log("Server started on port 4000");
  });
  