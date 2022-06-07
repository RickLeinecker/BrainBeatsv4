require("dotenv").config();
const jwt =  require('jsonwebtoken');
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();
const fs = require('fs');
var MidiWriter = require('midi-writer-js')

router.post('/midi', async (req, res) => {  
  
        const { userId, bpm, key} =  req.body
        const userExists = await prisma.user.findUnique({
            where: { id: userId  },
        });
    
        if(!userExists) {
            return res.status(400).json({
                msg: "User not found"
            })

        } else {
    
        const newMidi = await prisma.post.updateMany({
            data: {
                userId,
                bpm, // TODO
                key, // C#M - C sharp major
            }
            
        })
        res.json(newMidi)
     }
})
module.exports = router;