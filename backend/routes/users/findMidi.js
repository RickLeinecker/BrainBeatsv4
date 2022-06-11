const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();

//Get user post information by ID
router.get('/findMidi', async (req, res) => {
    const userId =  req.body.userId
    // const userExist = await prisma.user.findUnique({
    //     where: { id: userId  },
    // });

    // if(!userExist) {
    //     return res.status(400).json({
    //         msg: "User not found"
    //     })
    // }
    const posts = await prisma.post.findMany({
        where: { userId: userId }, 
        select: {
            data: true,
            midi: true
        }
    });
    res.json(posts);
})

module.exports = router;