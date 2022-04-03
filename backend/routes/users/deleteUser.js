const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();

//Delete user info by ID
router.delete('/deleteUser', async (req, res) => {
    try 
    { 
        const id =  req.body.id
        const deleteUser = await prisma.user.delete({
            where: 
            { id: Number(id) }
        })
        res.status(200).send({msg: "Deleted OK"});
    } 
    catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router
