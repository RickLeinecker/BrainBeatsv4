const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { user } = new PrismaClient();

//Get all records
router.get('/', async (req, res) => {
    try 
    {
        const users =  await user.findMany({
            select: {
                name: true,
                email: true,
                posts: true
            }
        });
        res.json(users)
    } 
    catch(err) {
        console.log(err)
        res.status(500).json({msg: err})
    }
})

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
    } catch(err){
        console.log(err)
        res.status(500).json({msg: err})
    }
})

//Upsert to update info or create if none existent
router.put('/', async (req, res) => {
    try 
    {
        const { name } = req.body;
        const { email } = req.body;
        const upsertUser = await user.upsert({
            where: {
              name,
              email
            },
            update: {
              name,
              email
            },
            create: {
              name,
              email
            },
          })
          res.json(upsertUser)
    } catch(err) {
        console.log(err)
        res.status(500).json({msg: err})
    }

})

//Delete 
// router.delete('/', async (req, res) => {
//     const deleteUser = await user.delete({
//         where: {
//           email: 'Samuel@gmail.com',
//           name: 'Samuel'
//         },
//       })
// })

module.exports = router
