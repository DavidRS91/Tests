var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('clucks');
});

router.get('/new', function(req, res, next) {
  res.render('clucks/new');
});

module.exports = router;
