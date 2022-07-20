require("dotenv").config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();
var nodemailer = require("nodemailer");
const jwtAPI = require("../../utils/jwt");
// const { JSON } = require("express");

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: 'brainbeatsdev@gmail.com',
        pass: process.env.EMAIL_PASSWORD,
    },
    secure: true,
});

router.get('/getLoginJWT', async (req, res) => {
    try {
        const email = req.query.email;
        const inputPassword = req.query.password;

        const userExists = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!userExists) {
            // Error here
            return res.status(400).json({
                msg: "User does not exist."
            });
        } else {
            res.send(jwt.getLoginJWT(userExists, inputPassword));
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/getSignUpJWT', async (req, res) => {
    try {
        const { id, email } = req.query;
        res.send(jwt.getSignUpJWT(id, email));
    } catch (err) {
        res.status(500).send(err);
    }
});


router.get('/verifyJWT', async (req, res) => {
    try {
        const jwt = req.query.jwt;
        res.json(jwt.verifyJWT(jwt));
    } catch (err) {
        res.status(500).send(err);
    }
});


// Send Email to user to verify login
/*router.post('/sendVerificationEmail', async (req, res) => {
    try {
        const { email, subject, text } = req.body;
        const userExists = await prisma.user.findUnique({
            where: { email },
            select: { email: true }
        });

        // If the user is an existing user, then send a verification email based on their ID
        if (userExists) {
            const mailData = {
                from: 'brainbeatsdev@gmail.com',  // Sender address
                to: email,                           // List of receivers
                subject: subject,
                text: 'Verify your login to BrainBeats by clicking the following link, or copy and paste it into your browser: ',
                html: '<a href=\"https://www.brainbeats.dev/verify/${userExists._id}\">Verify Email</a>',
            };

            transporter.sendMail(mailData, function (err, info) {
                if (err) {
                    return console.log(err);
                } else {
                    console.log('Email Sent: ' + info.response);
                }

                res.status(200).send({ message: "Mail send", message_id: info.messageId });
            });
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: "User does not exist." })
    }
});


router.post('/jwtStuff', async (req, res) => {
    try {


    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Unable to create JWT token" })
    }
})*/

// Login an existing user
router.post('/loginUser', async (req, res) => {

    try {

        // Get user input
        const { email, password } = req.body;

        // Validate if user exist in our database
        const user = await prisma.user.findUnique({
            where: { email: email }
        });

        // if (jwtAPI.verifyJWT()) {
        //   console.log("User logged in via JWT");
        //   return res.status(200).json(user, {
        //       msg: "User authenticated via JWT."
        //   });
        // }

        // If password is related to the email console log a successful login
        if (user && (await bcrypt.compare(password, user.password))) {
            // res.json("Logged In!")
            res.json(user)
            // jwtAPI.giveLoginJWT({id: user.id, email: user.email})
        } else {
            return res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        console.log(err)
    }

});


module.exports = router;