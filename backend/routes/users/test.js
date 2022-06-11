
require("dotenv").config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();

const jwtAPI = require("../../utils/jwt");

// Create a new user
router.post('/test', async (req, res) => {

    // const { firstName, lastName, username, email , dob, password } = req.body;

    //Create a single record
    const newUser = await prisma.user.create({
        data: req.body        
    });

    res.json(newUser);

});

router.post('/test2', async (req, res) => {

    const { id, title, bpm, key} = req.body;

    //Create a single record
    const newPost = await prisma.user.update({
        where: { id: id },
        data: {
            posts: {
                create: 
                    {
                        title,
                        // midi,
                        data: '\TVRoZAAAAAYAAQADAGRNVHJrAAAAGgD/AwtMaXR0bGUgTGFtZQD/UQMKLCsA/y8ATVRyawAAAPMA/wMG\
                                THlyaWNzAP8BGEBUTWFyeSBXYXMgQSBMaXR0bGUgTGFtZWT/AQNcTWFL/wEDcnkgGf8BBHdhcyAy/wEC\
                                YSAy/wEDbGl0Mv8BBHRsZSAy/wEFbGFtZSxk/wEEL0xpdDL/AQR0bGUgMv8BBWxhbWUsZP8BBC9MaXQy\
                                /wEEdGxlIDL/AQVsYW1lLGT/AQMvTWFL/wEDcnkgGf8BBHdhcyAy/wECYSAy/wEDbGl0Mv8BBHRsZSAy\
                                /wEFbGFtZSwy/wEDL0EgMv8BA2xpdDL/AQR0bGUgMv8BBWxhbWUgMv8BBHdhcyAy/wEEc2hlIQD/LwBN\
                                VHJrAAAA8gD/AwVNdXNpYwDAC2SQQH9LgEBAAJA+fxmAPkAAkDx/MoA8QACQPn8ygD5AAJBAfzKAQEAA\
                                kEB/MoBAQACQQH9agEBACpA+fzKAPkAAkD5/MoA+QACQPn9agD5ACpBAfzKAQEAAkEN/MoBDQACQQ39a\
                                gENACpBAf0uAQEAAkD5/GYA+QACQPH8ygDxAAJA+fzKAPkAAkEB/MoBAQACQQH8ygEBAAJBAfzKAQEAZ\
                                kEB/GYBAQACQPn8ygD5AAJA+fzKAPkAAkEB/MoBAQACQPn8ygD5AAJA8f2RAZABDZABIf1qAPEAAQEAA\
                                Q0AASEAK/y8A', // raw midi data for midi file
                        bpm,
                        key,
                    }      
            }
        }, 
        include: {
            posts: true
        }
    });

    res.json(newPost);

});

router.get('/test3', async (req, res) => {

    const { id } = req.body;

    //Create a single record
    const user = await prisma.user.findUnique({
        where: { id: id },
        include: {
            posts: true
        }
    })

    res.json(user?.posts);

});

router.delete('/test4', async (req, res) => {

    const { id } = req.body;

    //Create a single record
    const users = await prisma.user.delete({
        where: { id: id },
    })

    res.json(users);

});

module.exports = router;