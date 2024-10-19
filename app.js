// imports 
const functions = require('./functions.js');
const env = require('dotenv').config().parsed;
const express = require('express');
const app = express();
app.use(express.json());

// configuration of the app port (see .env)
const PORT = env.PORT;
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });

// connection to the DB 
let database = functions.connect();



// Statut de l'API
app.get("/api/status", (request, response) => {
    let status = {
        "Status": "Running"
    };
    response.status(200);
    if (database.error) {
        response.status(409);
        status["database"] = "Not connected";   
    }
    response.send(status);
});

// Connexion 
app.get("/api/login", (request, response) => {
    database.
    response.send(status);
});
