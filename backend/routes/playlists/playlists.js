require("dotenv").config();
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();
// const { JSON } = require("express");
const jwtAPI = require("../../utils/jwt");
const dbUtil = require("../../utils/database");

// Create a new playlist
router.post('/createPlaylist', async (req, res) => {

    try {
        const { name, userID, token } = req.body;

        const decoded = jwtAPI.verifyJWT(token);

        if (!decoded) {
            return res.status(400).json({
                msg: "Invalid token"
            });
        }

        const userExists = userUtil.getUserExists(id, "id");

        if (!userExists) {
            return res.status(400).json({
                msg: "User not found"
            });
        } else {
            const newPlaylist = await prisma.Playlist.create({
                data: {
                    name: name,
                    userID: userID,
                }
            });

            res.json(newPlaylist);
        }
    } catch (err) {
        res.status(500).send({ msg: err });
    }
});


// Get all playlists
router.get('/getAllPlaylists', async (req, res) => {
    try {
        const playlists = await prisma.Playlist.findMany();
        res.json(playlists);
    } catch (err) {
        res.status(500).send({ msg: err });
    }
});

// Get playlist by ID
router.get('/getPlaylistByID', async (req, res) => {
    try {
        const playlistExists = dbUtil.getPlaylistExists(req.query.id, "id");

        if (!playlistExists) {
            return res.status(400).json({
                msg: "Playlist does not exist."
            });
        }

        res.json(playlistExists);
    } catch (err) {
        res.status(500).send({ msg: err })
    }
});

// Get all playlists for a post by post ID
router.get('/getPlaylistsByPostID', async (req, res) => {

    try {
        const postID = req.query.postID;

        const playlists = await prisma.PlaylistPost.findMany({
            where: { postID: postID },
            select: { playlistID: true },
            distinct: ['playlistID']
        });

        if (!playlists) {
            return res.status(400).json({
                msg: "Post does not exist"
            })
        }

        res.json(playlists);
    } catch (err) {
        res.status(500).send({ msg: err })
    }

});

// Get all posts in a playlist
router.get('/getPostsByPlaylistID', async (req, res) => {
    try {
        const playlistExists = dbUtil.getPlaylistExists(req.query.id, "id");

        if (!playlistExists) {
            return res.status(400).json({
                msg: "Playlist does not exist."
            });
        } else {
            const posts = await prisma.PlaylistPost.findMany({
                where: { playlistID: req.query.id }
            });

            res.json(posts);
        }

        res.json(playlist);
    } catch (err) {
        res.status(500).send({ msg: err });
    }
});

// Delete a playlist
router.delete('/deletePlaylist', async (req, res) => {

    try {
        const decoded = jwtAPI.verifyJWT(req.body.token);

        if (!decoded) {
            return res.status(400).json({
                msg: "Invalid token"
                });
        }

        const deletePlaylist = await prisma.Playlist.delete({
            where: { id: req.body.id }
        });

        res.status(200).send({ msg: "Deleted a user playlist" });
    }
    catch (err) {
        res.status(500).send(err);
    }

});


// Put post in playlist
router.post('/addPostToPlaylist', async (req, res) => {
    try {
        const { playlistID, postID, token } = req.body;

        const decoded = jwtAPI.verifyJWT(token);

        if (!decoded) {
            return res.status(400).json({
                msg: "Invalid token"
            });
        }

        const playlistExists = dbUtil.getPlaylistExists(playlistID, "id");

        const postExists = dbUtil.getPostExists(postID, "id");

        if (!playlistExists) {
            return res.status(400).json({
                msg: "Playlist does not exist."
            });
        } else if (!postExists) {
            return res.status(400).json({
                msg: "Post does not exist."
            });
        } else {
            const newPost = await prisma.PlaylistPost.create({
                data: {
                    postID: postID,
                    playlistID: playlistID
                }
            });
            res.json(newPost);
        }
    }
    catch (err) {
        res.status(500).send({ msg: err });
    }
});

// Remove a post from a playlist
router.delete('/removePostFromPlaylist', async (req, res) => {
    try {
        const { postID, playlistID, token } = req.body;

        const decoded = jwtAPI.verifyJWT(token);

        if (!decoded) {
            return res.status(400).json({
                msg: "Invalid token"
            });
        }

        const removePost = await prisma.PlaylistPost.delete({
            where: {
                postID_playlistID: {
                    postID: postID, 
                    playlistID: playlistID 
                }
            }
        });
        res.status(200).send({ msg: "Removed a post from a playlist" });
    }
    catch (err) {
        res.status(500).send(err);
    }
});

// TODO : Update a playlist
router.put('/updatePlaylist', async (req, res) => {
    try {
        const { id, name, thumbnail, token} = req.body;

        const decoded = jwtAPI.verifyJWT(token);

        if (!decoded) {
            return res.status(400).json({
                msg: "Invalid token"
                });
        }

        const updatePlaylist = await prisma.Playlist.update({
            where: { id },
            data: {
                name: name,
                thumbnail: thumbnail
            }
        });
        //   res.status(200).send({msg: "Updated OK"});
        res.json(updatePlaylist);
    }

    catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;