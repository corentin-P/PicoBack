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


// première route : statut de l'API
app.get("/status", (request, response) => {
    const status = {
        "Status": "Running"
    };

    response.send(status);
});

