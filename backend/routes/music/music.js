require("dotenv").config();
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();
const musicUtils = require("../../utils/music");
// const { JSON } = require("express");
const dbUtil = require("../../utils/database");

// TODO : Don't think this is needed, change it to actually work for our case for downloading to
// Get user midi information by ID
router.get('/findMidi', async (req, res) => {

    const { username } = req.body;
    const userExists = await dbUtil.getUserExists(username, "username");

    if (!userExists) {
        return res.status(400).json({
            msg: "User not found"
        });
    } else {
        const posts = await prisma.User.findUnique({
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
});

// Get BPM values
router.get('/getBPMValues', async (req, res) => {
    const bpmValues = await musicUtils.getBPMValues();
    res.json(bpmValues);
});

module.exports = router;