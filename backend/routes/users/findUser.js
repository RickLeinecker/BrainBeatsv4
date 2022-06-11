const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { transformDocument } = require("@prisma/client/runtime");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();

// Get user by username
router.get('/findUser', async (req, res) => {
    try 
    {
        const username =  req.body.username
        const findUserbyUsername =  await prisma.user.findUnique({
            where: { username: username },
            select: {
                firstName: true,
                lastName: true,
                dob: true,
                email: true,
                username: true,
                posts: true
            }
        });

        if(!findUserbyUsername) {
            return res.status(400).json({
                msg: "Username does not exist"
            })
        }
        
        res.status(200).send({Object: findUserbyUsername});
    } 
    catch(err) {
        res.status(500).send({msg: err})
    }
});

module.exports = router;