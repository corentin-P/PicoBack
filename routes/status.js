const express = require('express');
const router = express.Router();
const Db = require('../controllers/db.js');

// Handle the /status endpoint
router.get('/', Db.connectionStatus);

// Add more routes for the /status endpoint as needed

module.exports = router;