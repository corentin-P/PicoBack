// imports 
const env = require('dotenv').config().parsed;
const express = require('express');
const app = express();

const db = require('./routes/status.js')
const login = require('./routes/login.js')

app.use(express.json());

// configuration of the app port (see .env)
const PORT = env.PORT;
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });

// API Status
/*app.get("/api/status", (request, response) => {
    let status = {
        "Status": "Running"
    };
    response.status(200);
    if (database.error) {
        response.status(409);
        status["database"] = "Not connected";   
    }
    response.send(status);
});*/


app.use('/api/status', db)
app.use('/api/login', login)

/*
app.post("/api/login/new", (request, response) => {
    if (!request.body.admin-email || !request.body.admin-password || !request.body.new-admin-email || !request.body.new-admin-password) {
        response.status(404)
        response.send({"error": "You forgot to enter your one of the parameter."})
        return
    }
    
    connection(database, request.body.email, request.body.password)
})*/