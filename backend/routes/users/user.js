require("dotenv").config();
const bcrypt =  require('bcryptjs');
const jwt =  require('jsonwebtoken');
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();
var nodemailer = require("nodemailer");
const jwtAPI = require("../../utils/jwt");
// const { JSON } = require("express");



// Create a new user
router.post('/createUser', async (req, res) => {

    try 
    {
        const { firstName, lastName, dob, email, username, password, bio } = req.body;

        // Check if the email already exists in db
        const userEmailExists = await prisma.user.findUnique({
        where: { email },
        });

        // Check if the username already exists in db
        const userNameExists = await prisma.user.findUnique({
        where: { username },
        });

        if(userEmailExists || userNameExists) {
            return res.status(400).json({
                msg: "Email or username already exists. Please try again."
            })
        } else {
            
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
                    bio
                }
            });

            // Create token

            // const token = jwtAPI.giveSignUpJWT(newUser.id, newUser.email);

            //----COMMENTED OUT TO CLOSE USER LOOP----\\ 
            // const token = jwt.sign(
            //     { userId: newUser.id, email },
            //     process.env.NEXT_PUBLIC_JWT_KEY,
            //     {
            //         expiresIn: "1h",
            //     }
            //     );

            // // save user token
            // newUser.token = token;

            res.json(newUser);
        }

    } 
    catch(err) {
        console.log(err)
        res.status(500).json({msg: "Unable to create user"})
    }

});


// Get all users with all records
router.get('/getAllUsers', async (req, res) => {

    try 
    {
        const users =  await prisma.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                dob: true,
                email: true,
                username: true,
                password: true,
                bio: true,
                posts: true
            }
        });
        res.json(users)
        // FIND THE LENGTH OF USERS IN MYSQL USER TABLE
        // res.json(users.length)
    } 
    catch(err) {
        res.status(500).send({msg: err})
    }
    
});


// Get all users with all records
router.get('/getAllUsersPosts', async (req, res) => {

    try 
    {
        const allUsersPosts =  await prisma.post.findMany();
        res.json(allUsersPosts)
    } 
    catch(err) {
        res.status(500).send({msg: err})
    }
    
});


// Post at user account
router.post('/createPost', async (req, res) => {

    try 
    {
        const { id, title, bpm, key, midi} =  req.body
        const userExists = await prisma.user.findUnique({
            where: { id },
        });

        if(!userExists) {
            return res.status(400).json({
                msg: "User not found"
            })
        } else {
                
                
            // file reader to read sheetjs.xnxx
            // some way to (string) encode the sheetjs.xlsx file to a blob
            // actualMidi = blob
            // clean -- use file reader to delete the sheetjs.xlsx file

            // TEST IF YOU CAN SAVE THIS NEWLY UPDATED POST FOR USER OPTION FOR MUSIC CREATION REQUEST
            // TODO: ADD MORE FIELDS AND CHANGE THIS FILE TO MIDI.JS OR OTHER WAY AROUND. NEED TO CHECK WITH NOAH ABOUT MORE PARAMTERS NEEDED

            // Create a single or multiple records
            const newPost = await prisma.user.update({
                where: { id },
                data: {
                    posts: {
                        create: 
                            {
                                title,
                                // midi: actualMidi ,
                                data: JSON.stringify('\TVRoZAAAAAYAAQADAGRNVHJrAAAAGgD/AwtMaXR0bGUgTGFtZQD/UQMKLCsA/y8ATVRyawAAAPMA/wMG\
                                        THlyaWNzAP8BGEBUTWFyeSBXYXMgQSBMaXR0bGUgTGFtZWT/AQNcTWFL/wEDcnkgGf8BBHdhcyAy/wEC\
                                        YSAy/wEDbGl0Mv8BBHRsZSAy/wEFbGFtZSxk/wEEL0xpdDL/AQR0bGUgMv8BBWxhbWUsZP8BBC9MaXQy\
                                        /wEEdGxlIDL/AQVsYW1lLGT/AQMvTWFL/wEDcnkgGf8BBHdhcyAy/wECYSAy/wEDbGl0Mv8BBHRsZSAy\
                                        /wEFbGFtZSwy/wEDL0EgMv8BA2xpdDL/AQR0bGUgMv8BBWxhbWUgMv8BBHdhcyAy/wEEc2hlIQD/LwBN\
                                        VHJrAAAA8gD/AwVNdXNpYwDAC2SQQH9LgEBAAJA+fxmAPkAAkDx/MoA8QACQPn8ygD5AAJBAfzKAQEAA\
                                        kEB/MoBAQACQQH9agEBACpA+fzKAPkAAkD5/MoA+QACQPn9agD5ACpBAfzKAQEAAkEN/MoBDQACQQ39a\
                                        gENACpBAf0uAQEAAkD5/GYA+QACQPH8ygDxAAJA+fzKAPkAAkEB/MoBAQACQQH8ygEBAAJBAfzKAQEAZ\
                                        kEB/GYBAQACQPn8ygD5AAJA+fzKAPkAAkEB/MoBAQACQPn8ygD5AAJA8f2RAZABDZABIf1qAPEAAQEAA\
                                        Q0AASEAK/y8A'), // raw midi data for midi file
                                bpm,
                                key,
                            }      
                    }
                }, 
                include: {
                    posts: true
                }
            });
            res.json(newPost)
        }
    } catch(err) {
        res.status(500).send({msg: err})
    }

});


// Get user post information by username HERE
router.get('/findUserPostsByUsername', async (req, res) => {

    try {
        const userPosts = await prisma.user.findUnique({
            where: {username: req.body.username},
            select: {
                posts: true,
            }
        });
            // res.json(userPosts)
    
        if(!userPosts) {
            return res.status(400).json({
                msg: "Username not found"
            })
        }
        
        res.json(userPosts)
    } 
    catch(err) {
        res.status(500).send({msg: err})
    }

})


// Get user post information by user id HERE
router.get('/findUserPostsByID', async (req, res) => {

    try {
        const userPosts = await prisma.post.findMany({
            where: {authorId: req.query.authorId},
            select: {
                    post: true,                

            }
        });
        // res.json(userPosts)


        if(!userPosts) {
            return res.status(400).json({
                msg: "Author ID not found"
            })
        }
        
        // res.json(userPosts)
    } 
    catch(err) {
        res.status(500).send({msg: err})
    }

})


// Get user by username
router.get('/findUser', async (req, res) => {

    try 
    {
        const findUser =  await prisma.user.findUnique({
            where: { username: req.body.username },
            select: {
                firstName: true,
                lastName: true,
                dob: true,
                email: true,
                username: true,
                bio: true,
                posts: true
            }
        });

        if(!findUser) {
            return res.status(400).json({
                msg: "Username does not exist"
            })
        }
        res.json(findUser)
    } 
    catch(err) {
        res.status(500).send({msg: err})
    }

});


// for (let i = 0; i <= user.length; i++) {
//     title: 'Song ' + i;
//     artist: user.lastName + user.lastName;
//     time: user.createdAt;
//     data: user.data;
//   };

// Update user info 
router.put('/updateUser', async (req, res) => {

    try 
    {
        const {id, firstName, lastName, dob, email, username, bio} = req.body
        const updateUser = await prisma.user.update({
            where: { id },
            data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    username: username,
                    bio: bio
            }
          })
        //   res.status(200).send({msg: "Updated OK"});
          res.json(updateUser);
    } 

    catch(err) {
        res.status(500).send(err);
    }
    
});


// Delete user by ID
router.delete('/deleteUser', async (req, res) => {

    try 
    { 
        const deleteUser = await prisma.user.delete({
            where: { id: req.body.id }
        })
        res.status(200).send({msg: "Deleted OK"});
    } 
    catch(err) {
        res.status(500).send(err);
    }
    
});


const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'brainbeatsdev@gmail.com',
            pass: process.env.EMAIL_PASSWORD,
         },
    secure: true,
});


// Send Email to user to verify login
router.post('/sendVerificationEmail', async (req, res) => {
    try 
    {
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
                if(err) {
                    return console.log(err);
                } else {
                    console.log('Email Sent: ' + info.response);
                }
        
                res.status(200).send({message: "Mail send", message_id: info.messageId });
            });
        }
    } 
    catch(err) {
        console.log(err)
        res.status(500).json({msg: "User does not exist."})
    }
});


router.post('/jwtStuff', async (req, res) => {
    try {


    } 
    catch(err) {
        console.log(err)
        res.status(500).json({msg: "Unable to create JWT token"})
    }
})

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

// Get user midi information by ID
router.get('/findMidi', async (req, res) => {

    const { username } = req.body;
    const userExist = await prisma.user.findUnique({
        where: { username },
    });

    if(!userExist) {
        return res.status(400).json({
            msg: "User not found"
        })
    } else {

        const posts = await prisma.user.findUnique({
            where: { username: username }, 
            select: {
                posts: {
                    select: {
                        midi: true,
                        data: true
                    }
                }
            }
        });
    res.json(posts);
    }

})

module.exports = router;