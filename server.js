
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
// FOR MONGOOSE USE
//const mongodb = require("./db/mongoose");
//
const mongodb = require("./db/connect");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const session = require("express-session");
const passport = require('passport');
require('dotenv').config();

// PASSPORT CONFIG
require('./config/passport')(passport);

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"));
// API DOCUMENTATION (SWAGGER)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// SESSION MIDDLEWARE
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))

// PASSPORT MIDDLEWARE
app.use(passport.initialize())
app.use(passport.session())

// FOR MONGOOSE USE
  
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(`Sorry, we were unable to connect to the DB. ` + err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
  
});
