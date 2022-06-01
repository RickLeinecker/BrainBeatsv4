require("dotenv").config();
const jwt =  require('jsonwebtoken');
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();
const jwtAPI = require("../../utils/jwt");

router.post('/jwtStuff', async (req, res) => {
    try {


    } 
    catch(err) {
        console.log(err)
        res.status(500).json({msg: "Unable to create JWT token"})
    }
})