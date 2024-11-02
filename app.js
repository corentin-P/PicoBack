// imports 
const env = require('dotenv').config().parsed;
const express = require('express');
const app = express();

const db = require('./routes/status.js')
const login = require('./routes/login.js')
const tournament = require('./routes/tournament.js')

app.use(express.json());

// configuration of the app port (see .env)
const PORT = env.PORT;
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });

// routes 
app.use('/api/status', db)
app.use('/api/login', login)
app.use('/api/tournament', tournament)

/*
app.post("/api/login/new", (request, response) => {
    if (!request.body.admin-email || !request.body.admin-password || !request.body.new-admin-email || !request.body.new-admin-password) {
        response.status(404)
        response.send({"error": "You forgot to enter your one of the parameter."})
        return
    }
    
    connection(database, request.body.email, request.body.password)
})*/