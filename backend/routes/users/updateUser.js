const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();

//Update user info 
router.put('/updateUser', async (req, res) => {
    try 
    {
        const {id, firstName, lastName, dob, email, username } = req.body
        const updateUser = await prisma.user.update({
            where: {id: id},
            data: {
                firstName: firstName,
                lastName: lastName,
                dob: new Date(dob),
                email: email,
                username: username
            }
          })
          res.status(200).send({msg: "Updated OK"});
        //   res.status(200).json(updateUser);
    } 
    catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router;