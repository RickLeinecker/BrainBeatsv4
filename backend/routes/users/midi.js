require("dotenv").config();
const jwt =  require('jsonwebtoken');
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();
const fs = require('fs');
var MidiWriter = require('midi-writer-js')

router.post('/midi', async (req, res) => {  
    try {    
        const { userId, title, targetTime, noteAndOctave, floorOctave} =  req.body
        const userExists = await prisma.user.findUnique({
            where: { id: userId  },
        });
    
        if(!userExists) {
            return res.status(400).json({
                msg: "User not found"
            })

        } else {
    
        const newMidi = await prisma.post.create({
            data: {
                userId,
                title,
                // targetTime,
                // noteAndOctave,
                // floorOctave
            }
            
        })
        res.json(newMidi)
        res.status(200).json({
            msg: "MIDI uploaded successfully!"
        });
     }
    }
    catch(err) {
        res.status(500).send(err);
    }
})
module.exports = router;