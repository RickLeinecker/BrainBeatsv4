require("dotenv").config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();
// const { JSON } = require("express");

// Create a new playlist
router.post('/createPlaylist', async (req, res) => {

    try {
        const { name, userID } = req.body;

        const userExists = await prisma.user.findUnique({
            where: { id: userID }
        });

        if (!userExists) {
            return res.status(400).json({
                msg: "User not found"
            })
        } else {

            const newPlaylist = await prisma.playlist.create({
                data: {
                    name: name,
                    userID: userID,
                }
            });

            res.json(newPlaylist);
        }
    } catch (err) {
        res.status(500).send({ msg: err })
    }

});


// Get all playlists
router.get('/getAllPlaylists', async (req, res) => {

    try {
        const playlists = await prisma.playlist.findMany();
        res.json(playlists);
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }

});

// Get playlist by ID
router.get('/getPlaylistByID', async (req, res) => {
    try {
        const playlist = await prisma.playlist.findUnique({
            where: { id: req.body.id }
        });

        if (!playlist) {
            return res.status(400).json({
                msg: "Playlist does not exist."
            });
        }

        res.json(playlist);
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }
});

// Get all playlists for a post by post ID
router.get('/getPlaylistsByPostID', async (req, res) => {

    try {
        const playlists = await prisma.playlistpost.findMany({
            where: { postID: req.body.postID },
            distinct: ['playlistID']
        });

        if (!playlists) {
            return res.status(400).json({
                msg: "Post does not exist"
            })
        }
        res.json(playlist)
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }

});

// Get all posts in a playlist
router.get('/getPostsByPlaylistID', async (req, res) => {
    try {
        const playlist = await prisma.playlist.findUnique({
            where: { id: req.body.id }
        });

        if (!playlist) {
            return res.status(400).json({
                msg: "Playlist does not exist."
            });
        } else {
            const posts = await prisma.playlistpost.findMany({
                where: { playlistID: req.body.id }
            });

            res.json(posts);
        }

        res.json(playlist);
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }
});

// Delete a playlist
router.delete('/deletePlaylist', async (req, res) => {

    try {
        const deletePlaylist = await prisma.playlist.delete({
            where: { id: req.body.id }
        })
        res.status(200).send({ msg: "Deleted a user playlist" });
    }
    catch (err) {
        res.status(500).send(err);
    }

});


// Put post in playlist
router.post('/addPostToPlaylist', async (req, res) => {
    try {
        const playlist = await prisma.playlist.findUnique({
            where: { playlistID: req.body.playlistID }
        });

        const post = await prisma.post.findUnique({
            where: { postID: req.body.postID }
        });

        if (!playlist) {
            return res.status(400).json({
                msg: "Playlist does not exist."
            });
        } else if (!post) {
            return res.status(400).json({
                msg: "Post does not exist."
            });
        } else {
            const newPost = await prisma.playlistpost.create({
                data: {
                    postID: req.body.postID,
                    playlistID: req.body.playlistID
                }
            });

            res.json(newPost);
        }
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }
});

// TODO : Update a playlist
router.put('/updatePlaylist', async (req, res) => {

    try {
        const { id, name, thumbnail} = req.body
        const updateUser = await prisma.playlist.update({
            where: { id },
            data: {
                name: name,
                thumbnail: thumbnail
            }
        })
        //   res.status(200).send({msg: "Updated OK"});
        res.json(updateUser);
    }

    catch (err) {
        res.status(500).send(err);
    }

});

// #**** Swagger API requests ****#

// Get playlist by ID
router.post('/getPlaylistWithID', async (req, res) => {
    try {
        const playlist = await prisma.playlist.findUnique({
            where: { id: req.body.id }
        });

        if (!playlist) {
            return res.status(400).json({
                msg: "Playlist does not exist."
            });
        }

        res.json(playlist);
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }
});

// Get all playlists for a post by post ID
router.post('/getPlaylistsByPostsID', async (req, res) => {

    try {
        const playlists = await prisma.playlistpost.findMany({
            where: { postID: req.body.postID },
            distinct: ['playlistID']
        });

        if (!playlists) {
            return res.status(400).json({
                msg: "Post does not exist"
            })
        }
        res.json(playlist)
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }

});

// Get all posts in a playlist
router.post('/getPostsByPlaylistsID', async (req, res) => {
    try {
        const playlist = await prisma.playlist.findUnique({
            where: { id: req.body.id }
        });

        if (!playlist) {
            return res.status(400).json({
                msg: "Playlist does not exist."
            });
        } else {
            const posts = await prisma.playlistpost.findMany({
                where: { playlistID: req.body.id }
            });

            res.json(posts);
        }

        res.json(playlist);
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }
});

module.exports = router;