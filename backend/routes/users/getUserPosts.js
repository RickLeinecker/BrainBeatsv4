const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Get record by name or unique identifier
router.post('/', async (req, res) => {
    try 
    {
        const { name, email } = req.body;
        const userExists = await prisma.user.findUnique({
        where: { name },
            select: { name: true }
        });

    // Check if user already exists in db
        if(userExists) {
            return res.status(400).json({
                msg: "User already exists"
            })
        }

    //Create a single record
        const newUser = await prisma.user.create({
            data: {
                name,
                email
            }
        });
        res.json(newUser)
    } 
    catch(err) {
        console.log(err)
        res.status(500).json({msg: "Unable to create user"})
    }
});

module.exports = router;