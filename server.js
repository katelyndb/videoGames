const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"));


  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
