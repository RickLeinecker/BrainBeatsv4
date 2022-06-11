const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { transformDocument } = require("@prisma/client/runtime");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();

// Get user by username
router.get('/findUser', async (req, res) => {

    try 
    {
        const findUser =  await prisma.user.findUnique({
            where: { username: req.body.username },
            select: {
                firstName: true,
                lastName: true,
                dob: true,
                email: true,
                username: true,
                bio: true,
                posts: true
            }
        });

        if(!findUser) {
            return res.status(400).json({
                msg: "Username does not exist"
            })
        }
        res.json(findUser)
    } 
    catch(err) {
        res.status(500).send({msg: err})
    }

});

module.exports = router;