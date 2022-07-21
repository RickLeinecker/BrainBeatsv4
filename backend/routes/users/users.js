require("dotenv").config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();
// const { JSON } = require("express");
const multer  = require('multer')
const upload = multer()
const fs = require('fs');
const jwtAPI = require("../../utils/jwt");

// Create a new user
router.post('/createUser', async (req, res) => {

    try {
        const { firstName, lastName, dob, email, username, password } = req.body;

        // Check if the email already exists in db
        const userEmailExists = await prisma.User.findUnique({
            where: { email },
        });

        // Check if the username already exists in db
        const userNameExists = await prisma.User.findUnique({
            where: { username },
        });

        if (userEmailExists || userNameExists) {
            return res.status(400).json({
                msg: "Email or username already exists. Please try again."
            })
        } else {

            //Encrypt user password
            encryptedPassword = await bcrypt.hash(password, 10);

            //Create a single record
            const newUser = prisma.User.create({
                data: {
                    firstName,
                    lastName,
                    dob,
                    email,
                    username,
                    password: encryptedPassword
                }
            });

            // Create token

            const token = jwtAPI.getJWT(newUser.id, newUser.email);

            const data = {
                user: newUser,
                token: token
            }

            res.json(data);
        }

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Unable to create user" })
    }

});

// Login an existing user
router.post('/loginUser', async (req, res) => {
    try {

        // Get user input
        const { email, password } = req.body;

        // Validate if user exists in our database
        const user = await prisma.User.findUnique({
            where: { email: email }
        });

        // If password is related to the email console log a successful login
        if (user && (bcrypt.compare(password, user.password))) {
            const token = jwtAPI.getJWT(user.id, user.email);
            const data = {
                user: user,
                token: token
            }
            res.json(data);
        } else {
            return res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        console.log(err)
    }

});

// Get all users with all records
router.get('/getAllUsers', async (req, res) => {

    try {
        const users = await prisma.User.findMany();
        res.json(users)
        // FIND THE LENGTH OF USERS IN MYSQL USER TABLE
        // res.json(users.length)
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }

});

// Get user by username
router.get('/getUserByUsername', async (req, res) => {
    console.log(req.query.username)
    try {
        const findUser = await prisma.User.findUnique({
            where: { username: req.query.username }
        });

        if (!findUser) {
            return res.status(400).json({
                msg: "Username does not exist"
            })
        }
        res.json(findUser)
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }

});

// Get user by user ID
router.get('/getUserByID', async (req, res) => {

    try {
        const findUser = await prisma.User.findUnique({
            where: { id: req.query.id }
        });

        if (!findUser) {
            return res.status(400).json({
                msg: "User does not exist"
            })
        }
        res.json(findUser)
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }

});

// for (let i = 0; i <= user.length; i++) {
//     title: 'Song ' + i;
//     artist: user.lastName + user.lastName;
//     time: user.createdAt;
//     data: user.data;
//   };

// Update user info 
router.put('/updateUser', upload.single('profilePicture'), async (req, res) => {

    // try{
        const { id, firstName, lastName, dob, email, username, bio, token } = req.body;

        const decoded = jwtAPI.verifyJWT(token);

        if (!decoded) {
            return res.status(400).json({
                msg: "Invalid token"
                });
        }

        // Required field for profilePicture as an entry
        
        const profilePicture = req.file;
                
        // Check if the id already exists in db
        const userIDExists = await prisma.User.findUnique({
            where: { id },
        });

        if (!userIDExists) {
            return res.status(400).json({
                msg: "User ID not found"
            });
        } else {
        const updateUser = await prisma.User.update({
            where: { id },
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                dob: new Date(dob).toISOString(),
                username: username,
                bio: bio
            }
        });    
        
        const uploadPath = "../images/profilePicture/" + id;

        fs.writeFile(uploadPath, profilePicture.buffer, function(err) {
            if (err) throw new Error('Unable to save images');
        });
        // const profilepic2 = fs.readFile(uploadPath);
        // console.log(profilepic2);
        res.status(200).send({msg: "Updated OK"});
        }
    // } catch (err) {
    //     res.status(500).send(err);
    // }
});

// Delete user by ID
router.delete('/deleteUser', async (req, res) => {
    const decoded = jwtAPI.verifyJWT(res.body.token);

        if (!decoded) {
            return res.status(400).json({
                msg: "Invalid token"
                });
        }

    try {
        const deleteUser = await prisma.User.delete({
            where: { id: req.body.id }
        })
        res.status(200).send({ msg: "Deleted a user" });
    }
    catch (err) {
        res.status(500).send(err);
    }

});

module.exports = router;