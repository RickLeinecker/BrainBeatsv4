require("dotenv").config();
const bcrypt =  require('bcryptjs');
const jwt =  require('jsonwebtoken');
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();

const jwtAPI =  require("../../utils/jwt");

// login an existing user
router.post('/loginOut', async (req, res) => {
    try {

      } catch (err) {
        console.log(err)
      }

});

module.exports = router;