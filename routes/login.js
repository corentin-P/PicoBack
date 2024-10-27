const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.js');

// Handle the /login endpoint
router.post('/', UserController.connectUser);

// Add more routes for the /login endpoint as needed

module.exports = router;