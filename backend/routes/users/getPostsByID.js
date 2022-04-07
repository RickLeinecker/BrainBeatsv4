const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();

//Get user post information by ID
router.get('/getPostsByID', async (req, res) => {
    try 
    {
    const userId =  req.body.userId
    const posts = await prisma.post.findMany({
        where: { userId: userId }, 
        select: {
            user: true,
            title: true,
            createdAt: true,
            updatedAt: true,
            post: true
        }
    });
    res.status(200).send({Object: posts});
    } 
    catch(err) {
        res.status(500).send(err);
    }
})

module.exports = router;