const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/Login', function(req, res, next) {

  res.render('Login');
});

module.exports = router;
