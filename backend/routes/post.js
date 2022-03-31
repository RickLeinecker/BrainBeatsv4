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


//Post at user account
router.post('/createPost', async (req, res) => {
    const { title, content, userId } =  req.body
    const userExists = await prisma.user.findUnique({
        where: { id: userId  },
    });

    if(!userExists) {
        return res.status(400).json({
            msg: "User not found"
        })
    }

    const newPost = await prisma.post.create({
        data: {
            userId,
            title,
            post: content
        }
    })
    res.json(newPost)
});

module.exports = router