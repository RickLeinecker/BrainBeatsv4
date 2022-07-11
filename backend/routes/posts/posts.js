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
        const { userID, title, bpm, key, visibility} = req.body
        const userExists = await prisma.user.findUnique({
            where: { id: userID }
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
router.get('/getUserPostsByUsername', async (req, res) => {
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
router.get('/getUserPostsByID', async (req, res) => {
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

// Get all posts
router.get('/getAllPosts', async (req, res) => {
    try {
        const posts = await prisma.post.findMany();

        res.json(posts)
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }

});

// Delete a post
router.delete('/deletePost', async (req, res) => {
    try {
        const deletePost = await prisma.post.delete({
            where: { id: req.body.id }
        })
        res.status(200).send({ msg: "Deleted a user post" });
    }
    catch (err) {
        res.status(500).send(err);
    }
});

// Update user post info 
router.put('/updatePost', async (req, res) => {

    try {
        const { id, title, visibility, bio, thumbnail, likeCount} = req.body

        // Check if the id already exists in db
        const userIDExists = await prisma.post.findUnique({
            where: { id },
        });

        if (!userIDExists) {
            return res.status(400).json({
                msg: "Post ID not found"
            })
        } else {
            
        const updatePost = await prisma.post.update({
            where: { id },
            data: {
                title: title,
                bio: bio,
                likeCount: likeCount,
                visibility: visibility,
                thumbnail: thumbnail
            }
        })
        //   res.status(200).send({msg: "Updated OK"});
        res.json(updatePost);
      }
    }

    catch (err) {
        res.status(500).send(err);
    }

});

// ****** SwaggerUI calls ******

// Get all posts based on a username 
router.post('/getUsersPostsByUsername', async (req, res) => {
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
router.post('/getUsersPostsByID', async (req, res) => {
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

module.exports = router;