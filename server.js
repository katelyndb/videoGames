
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// Error Handling and Validation
const createError = require('http-errors');
const path = require('path');
const cors = require('cors');
const { signupValidation, loginValidation } = require('./validation.js');
//


app
// Error Handling and Validation
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  use(cors())
  // 
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"));

/*
  app.post('/register', signupValidation, (req, res, next) => {
    // your registration code
 });
  
  
 app.post('/login', loginValidation, (req, res, next) => {
    // your login code
 });
  
 // Handling Errors
 app.use((err, req, res, next) => {
     // console.log(err);
     err.statusCode = err.statusCode || 500;
     err.message = err.message || "Internal Server Error";
     res.status(err.statusCode).json({
       message: err.message,
     });
 });

 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
