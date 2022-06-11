const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();

//Get user post information by ID
router.get('/findUserPosts', async (req, res) => {

    try {
        const userPosts = await prisma.user.findUnique({
            where: { username: req.body.username  },
            select: {
                posts: true
            }
        });

        if(!userPosts) {
            return res.status(400).json({
                msg: "Username not found"
            })
        }
        
        res.json(userPosts)
    } 
    catch(err) {
        res.status(500).send({msg: err})
    }

})

module.exports = router;