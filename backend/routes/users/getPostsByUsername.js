const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();

//Get user post information by ID
router.get('/getPostsByUsername', async (req, res) => {
    const username =  req.body.username

    const userExist = await prisma.user.findUnique({
        where: { username: username  },
        select: {
            posts: true
        }
    });

    if(!userExist) {
        return res.status(400).json({
            msg: "Username not found"
        })
    }
    
    res.status(200).send({userExist});

})

module.exports = router;