const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { user, post } = new PrismaClient();
const prisma = new PrismaClient();

//Get user post information by ID
router.get('/:userId', async (req, res) => {
    const { userId } = req.params
    let posts = await prisma.post.findMany({
        where: { userId: parseInt(userId) }, 
        select: {
            user: true,
            title: true,
            createdAt: true,
            post: true
        }
    });
    res.send(posts);
})

module.exports = router;