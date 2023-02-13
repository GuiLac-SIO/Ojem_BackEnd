const express = require('express');

 

const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const customCss = fs.readFileSync(process.cwd() + "/swagger.css", "utf8");
// import des packages
const app = require("express")(); 
// package utilisé pour créer un serveur
require("dotenv").config(); 
// package utilisé pour créer des variables d'environnement
// import des routes
const userRoutes = require("./routes/userRoutes");
app.use(userRoutes);

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


// route .all qui attrape toutes les requêtes vers des routes non existantes
app.all("*", (req, res) => {
  return res.status(404).json({ error: "Page Not Found" });
});
// démarrage du serveur
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server Has Started on port ${process.env.PORT || 3001}`);
});
