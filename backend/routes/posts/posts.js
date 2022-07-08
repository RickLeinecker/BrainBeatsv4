require("dotenv").config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();
// const { JSON } = require("express");

// TODO : This needs to be updated/cleaned up
// Post at user account
router.post('/createPost', async (req, res) => {

    try {
        const { id, title, bpm, key, midi } = req.body
        const userExists = await prisma.user.findUnique({
            where: { id },
        });

        if (!userExists) {
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
    } catch (err) {
        res.status(500).send({ msg: err })
    }

});

// TODO : This doesn't actually do a proper search. Update and fix this.
// Get user post information by username HERE
router.post('/findUserPostsByUsername', async (req, res) => {

    try {
        const title = req.body.title
        let userPosts;
        if (title != "") {
            userPosts = await prisma.post.findMany({
                take: 10,
                where: {
                    title: {
                        contains: title,
                    },
                },
            });
        }else{
            userPosts = await prisma.post.findMany({
                take: 10,
            })
        
        }

        // res.json(userPosts)

        if (!userPosts) {
            return res.status(400).json({
                msg: "Username not found"
            })
        }

        res.json(userPosts)
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }

})


// Get user post information by user id HERE
router.post('/findUserPostsByID', async (req, res) => {
    //res.json([req.body, 'hello'])
    try {
        const userPosts = await prisma.post.findMany({
            where: { userID: req.body.userID },

        });

        //res.json([req.body, "hello"])


        if (!userPosts) {
            return res.status(400).json({
                msg: "User ID not found"
            })
        }

        res.json(userPosts)
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }

})

module.exports = router;