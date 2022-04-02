const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Get all users with all records
router.get('/', async (req, res) => {
    try 
    {
        const users =  await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
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