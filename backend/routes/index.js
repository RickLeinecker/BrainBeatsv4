var express = require('express');
var router = express.Router();
var loginRouter = require('./login');
var app = express();

app.use('/login', loginRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
