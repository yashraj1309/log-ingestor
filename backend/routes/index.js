var express = require('express');
var router = express.Router();

var logIngestorController = require('../controllers/ingestLogController');

var searchController = require("../controllers/searchController");

var searchTimestampController = require("../controllers/timeStampFilterController");

router.post('/addlog',logIngestorController.ingestLog);

router.get('/search',searchController.searchLog);

router.get('/search/timestamp/',searchTimestampController.searchLogBasedOnTime);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
