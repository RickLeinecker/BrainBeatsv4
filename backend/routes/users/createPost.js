const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();

//Post at user account
router.post('/createPost', async (req, res) => {

    const { title, userId, targetTime, noteAndOctave, floorOctave} =  req.body
    // const userExists = await prisma.user.findUnique({
    //     where: { id: userId  },
    // });

    // if(!userExists) {
    //     return res.status(400).json({
    //         msg: "User not found"
    //     })
    // }
    // else {

    const newPost = await prisma.post.create({
        data: {
            userId,
            title,
            targetTime,
            noteAndOctave,
            floorOctave
        }
    })
    res.json(newPost)
    // }

});

module.exports = router;