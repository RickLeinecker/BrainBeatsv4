require("dotenv").config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();
// const { JSON } = require("express");

// Create a user like
router.post('/createUserLike', async (req, res) => {

    try {
        const { userID, postID} = req.body
        const userExists = await prisma.user.findUnique({
            where: { id: userID },
        });

        const postExists = await prisma.post.findUnique({
            where: { id: postID },
        });

        if (!userExists) {
            return res.status(400).json({
                msg: "User not found"
            });
        } else if (!postExists) { 
            return res.status(400).json({
                msg: "Post not found"
            })
        } else {
            // Create a like
            const newLike = await prisma.like.create({
                data: {
                    userID: userID,
                    postID: postID
                }
            });

            res.json(newLike);
        }
    } catch (err) {
        res.status(500).send({ msg: err })
    }

});

// Remove a user like
router.delete('/removeUserLike', async (req, res) => { 
    try {
        const deleteLike = await prisma.like.delete({
            where: { 
                userLike: {
                    postID: req.body.postID,
                    userID: req.body.userID,
                },
            }
        });
        res.status(200).send({ msg: "Deleted a user like" });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get user like status
router.get('/getUserLike', async (req, res) => {
    try {
        const likeStatus = await prisma.like.findUnique({
            where: {
                userLike: {
                    postID: req.query.postID,
                    userID: req.query.userID,
                },
            }
        });

        res.json(likeStatus);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get all user likes
router.post('/getAllUserLikes', async (req, res) => {
    try {
        const allLikes = await prisma.like.findMany({
            where: { userID: req.query.userID }
        });

        res.json(allLikes);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;