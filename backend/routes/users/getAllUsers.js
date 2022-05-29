const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();

//Get all users with all records
router.get('/getAllUsers', async (req, res) => {
    try 
    {
        const users =  await prisma.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                dob: true,
                email: true,
                username: true,
                password: true,
                posts: true
            }
        });
        res.status(200).send({Object: users});
    } 
    catch(err) {
        res.status(500).send({msg: err})
    }
});

module.exports = router;