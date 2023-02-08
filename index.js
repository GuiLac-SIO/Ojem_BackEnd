const express = require("express");
const router = require("./routes/routes.js");

// import library and files
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const customCss = fs.readFileSync(process.cwd() + "/swagger.css", "utf8");

const app = express();
// let express to use this
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customCss })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(router);

app.listen(5000);
