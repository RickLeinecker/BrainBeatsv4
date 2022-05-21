
require("dotenv").config();
const bcrypt =  require('bcryptjs');
const jwt =  require('jsonwebtoken');
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();

// Create a new user
router.post('/createUser', async (req, res) => {
    try 
    {
        const { firstName, lastName, dob, email, username, password } = req.body;
        const userExists = await prisma.user.findUnique({
        where: { email },
            select: { email: true }
        });

    // Check if user already exists in db
        if(userExists) {
            return res.status(400).json({
                msg: "Email already exists"
            })
        }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    //Create a single record
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                dob,
                email,
                username,
                password: encryptedPassword,
            }
        });

    // Create token
    const token = jwt.sign(
        { userId: newUser.id, email },
        process.env.NEXT_PUBLIC_JWT_KEY,
        {
            expiresIn: "1h",
        }
        );

    // save user token
    newUser.token = token;

    res.json(newUser)
    } 
    catch(err) {
        console.log(err)
        res.status(500).json({msg: "Unable to create user"})
    }
});

module.exports = router;