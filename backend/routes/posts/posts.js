require("dotenv").config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();
// const { JSON } = require("express");

// Create a post
router.post('/createPost', async (req, res) => {

    try {
        const { userID, title, bpm, key, visibility } = req.body
        const userExists = await prisma.user.findUnique({
            where: { userID },
        });

        if (!userExists) {
            return res.status(400).json({
                msg: "User not found"
            })
        } else {
            //Create a single record
            const newPost = await prisma.post.create({
                data: {
                    userID: userID,
                    title: title,
                    bpm: bpm,
                    key: key,
                    visibility: visibility,
                    likeCount: 0
                }
            });

            res.json(newPost);
        }
    } catch (err) {
        res.status(500).send({ msg: err })
    }

});

// Get all posts based on a username
router.post('/getUserPostsByUsername', async (req, res) => {
    try {
        const username = req.body.username
        
        const userExists = await prisma.user.findUnique({
            where: { username }
        });

        if (!userExists) {
            return res.status(400).json({
                msg: "User not found"
            })
        } else {
            // Find the records
            const userPosts = await prisma.post.findMany({
                where: { userID: userExists.id }
            });

            if (!userPosts) {
                return res.status(400).json({
                    msg: "Posts not found"
                })
            }

            res.json(userPosts);
        }
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }
});

// Get all posts based on a user ID
router.post('/getUserPostsByID', async (req, res) => {
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

});

// TODO : Implement a post update api call

module.exports = router;