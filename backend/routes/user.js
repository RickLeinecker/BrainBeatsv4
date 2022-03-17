const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { user } = new PrismaClient();

//Get all records
router.get('/', async (req, res) => {
    try 
    {
        const users =  await user.findMany({
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

//Get record by name or unique identifier
router.post('/', async (req, res) => {
    try 
    {
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
                msg: "user already exists"
            })
        }

    //Create a single record
        const newUser = await user.create({
            data: {
                name,
                email
            }
        });
        res.json(newUser)
    } 
    catch(err) {
        console.log(err)
        res.status(500).json({msg: err})
    }
});

//Upsert to update info or create if none existent
router.patch('/', async (req, res) => {
    try 
    {
        const upsertUser = await user.upsert({
            where: 
            {
              id: req.body.id
            },
            data: {
                name: req.body.name,
                email: req.body.email
            }
          })
          res.json(upsertUser)
          res.status(200).send({msg: "OK"});
    } 
    catch(err) {
        res.status(500).send(err);
    }
});

//Delete 
router.delete('/', async (req, res) => {
    try 
    { 
        const deleteUser = await user.delete({
            where: 
            {
            // id: req.body.id,
            name: req.body.name,
            email: req.body.email
            },
            select: {
                // id: true,
                name: true,
                email: true
            }
        })
        res.status(200).send({msg: "Deleted OK"});
    } 
    catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router
