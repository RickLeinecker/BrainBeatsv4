require("dotenv").config();
const jwt =  require('jsonwebtoken');
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();
const fs = require('fs');
var MidiWriter = require('midi-writer-js')

router.post('/midi', async (req, res) => {  
  
        // Might want to change 'userId' req body to 'username' (Dont really think we need this file)
        const { id, bpm, key} =  req.body
        const userExists = await prisma.user.findUnique({
            where: { id: id  },
        });
    
        if(!userExists) {
            return res.status(400).json({
                msg: "User not found"
            })

        } else {
    
        const newMidi = await prisma.post.updateMany({
            data: {
                id,
                bpm, // TODO
                key, // C#M - C sharp major
            }
            
        })
        res.status(200).send({Object: newMidi});
     }
})
module.exports = router;