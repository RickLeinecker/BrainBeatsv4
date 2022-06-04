var express = require('express');
var app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require('swagger-ui-express')
const YAML = require("yamljs");
const cors = require("cors")
require("dotenv").config();

const PORT = process.env.PORT || 2000;

const corsOptions ={
    origin: '*', 
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

var router = express.Router();
var loginRouter = require('./login');

app.use('/login', loginRouter);

 /* GET home page. */
router.get('/', function(req, res, next) {
   res.render('index', { title: 'Express' });
 });

// SwaggerHub documentation
// For more info: https://swagger.io/specification/#infoObject
// To test API's, use the SwaggerHub UI by going to http://localhost:2000/api-docs/ after running the application with "nodemon ./backend/routes/index"
const swaggerJSDocs = YAML.load("./routes/api.yaml");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));

app.use(express.json())
app.use('/api/users', require('./users/findUser')); 
app.use('/api/users', require('./users/getAllUsers'));
app.use('/api/users', require('./users/createUser'));
app.use('/api/users', require('./users/loginUser')); 
app.use('/api/users', require('./users/updateUser'));
app.use('/api/users', require('./users/deleteUser'));
app.use('/api/users', require('./users/createPost'));
app.use('/api/users', require('./users/midi'));
app.use('/api/users', require('./users/getPostsByID'));
// app.use('/api/users', require('./users/jwtStuff'));
app.use('/api/users', require('./users/sendVerificationEmail'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = router;