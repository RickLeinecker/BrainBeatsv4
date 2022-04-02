const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get user by ID
router.post('/findUser', async (req, res) => {
    try 
    {
        const id =  req.body.id
        const findUserbyID =  await prisma.user.findUnique({
            where: { id: parseInt(id) },
            select: {
                name: true,
                email: true
            }
        });

        if(!findUserbyID) {
            return res.status(400).json({
                msg: "User ID does not exist"
            })
        }
        
        res.status(200).send({Object: findUserbyID});
    } 
    catch(err) {
        res.status(500).send({msg: err})
    }
});

module.exports = router;