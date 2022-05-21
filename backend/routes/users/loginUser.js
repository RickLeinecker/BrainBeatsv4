require("dotenv").config();
const bcrypt =  require('bcryptjs');
const jwt =  require('jsonwebtoken');
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();

// login an existing user
router.post('/loginUser', async (req, res) => {
    try {

        // Get user input
        const { email, password } = req.body;
    
        // Validate if user exist in our database
        const user = await prisma.user.findUnique({
          where: { email: email }
          });
        
        // If password is related to the email console log a successful login
        if (user && (await bcrypt.compare(password, user.password))) {
          console.log("Logged in!")
          res.status(200).json(user);
        } else {
        return res.status(400).send("Invalid Credentials");
        }
      } catch (err) {
        console.log(err)
      }

});

module.exports = router;