var express = require('express');
var app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require('swagger-ui-express')
const YAML = require("yamljs");

const PORT = process.env.PORT || 3306;


var router = express.Router();
var loginRouter = require('./login');

app.use('/login', loginRouter);

// /* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


// SwaggerHub documentation
// For more info: https://swagger.io/specification/#infoObject
// To test API's, use the SwaggerHub UI by going to http://localhost:3306/api-docs/ after running the application with "nodemon ./backend/routes/index"
const swaggerJSDocs = YAML.load("./routes/api.yaml");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));



app.use(express.json())
app.use('/api/user', require('./user'))
app.use('/api/post', require('./post'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));