var express = require('express');
var app = express();
// var router = express.Router();
// var loginRouter = require('./login');

// app.use('/login', loginRouter);

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

app.use(express.json())

app.use('/api/user', require('./user'))
app.use('/api/post', require('./post'))

app.listen(3306, () => { 
  console.log('Listening on port 3306')
})

