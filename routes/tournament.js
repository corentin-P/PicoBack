const express = require('express');
const router = express.Router();
const TournamentController = require('../controllers/tournament.js');

// Handle the /tournament/{type} endpoint
router.get('/all', TournamentController.getAllTournament);
router.get('/next', TournamentController.getNextTournament);
router.get('/last', TournamentController.getLastTournament);
router.post('/new', TournamentController.createNewTournament);
router.put('/modify', TournamentController.modifyTournament);


module.exports = router;