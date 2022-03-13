const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { user } = new PrismaClient();

//Get user info
router.get('/', async (req, res) => {
    //Find all users in db
    const users =  await user.findMany({
        select: {
            name: true,
            posts: true
        }
    });
    res.json(users)
})

//Post user info to local server 3306
router.post('/', async (req, res) => {
    const { name } = req.body;
    const { email } = req.body;

    const userExists = await user.findUnique({
       where: { 
            name 
        },
        select: {
            name: true
        }
    });

// Check if user already exists in db
    if(userExists) {
        return res.status(400).json({
            msg: "User already exists"
        })
    }

//Create new user 
    const newUser = await user.create({
        data: {
            name,
            email
        }
    });
    res.json(newUser)
})

module.exports = router
