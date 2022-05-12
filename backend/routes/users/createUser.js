const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();

// Create a new user
router.post('/createUser', async (req, res) => {
    try 
    {
        const { firstName, lastName, email, username, password } = req.body;
        const userExists = await prisma.user.findUnique({
        where: { username },
            select: { username: true }
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
                firstName,
                lastName,
                email,
                username,
                password: "hashedPassword",

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