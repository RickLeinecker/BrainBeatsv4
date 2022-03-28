const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { user } = new PrismaClient();
var express = require('express');
var app = express();
const prisma = new PrismaClient();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require('swagger-ui-express')


// // SwaggerHub documentation
// // For more info: https://swagger.io/specification/#infoObject
// const swaggerOptions = {
//     swaggerDefinition: {
//       info: {
//         version: "1.0.0",
//         title: "BrainBeatsAPI",
//         description: "User Information",
//         contact: {
//           name: "Amazing Developer"
//         },
//         servers: ["http://localhost:3306"]
//       }
//     },
//     // ['.routes/*.js']
//     apis: ["./backend/routes/user.js"]
//   };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));


// // Routes
// /**
//  * @swagger
//  * /users:
//  *  get:
//  *    description: Use to request all users information
//  *    responses:
//  *      '200':
//  *        description: A successful response
//  */

//Get all records
router.get('/', async (req, res) => {
    try 
    {
        const users =  await prisma.user.findMany({
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
        const userExists = await prisma.user.findUnique({
        where: { name },
            select: { name: true }
        });

    // Check if user already exists in db
        if(userExists) {
            return res.status(400).json({
                msg: "User already exists"
            })
        }

    //Create a single record
        const newUser = await prisma.user.create({
            data: {
                name,
                email
            }
        });
        res.json(newUser)
    } 
    catch(err) {
        console.log(err)
        res.status(500).json({msg: "Unable to create user"})
    }
});

//Update user info 
router.put('/', async (req, res) => {
    try 
    {
        const { id, name, email } = req.body
        const updateUser = await prisma.user.update({
            where: { id : Number(id)},
            data: {
                name: name,
                email: email
            }
          })
          res.status(200).send({msg: "Updated OK"});
    } 
    catch(err) {
        res.status(500).send(err);
    }
});

//Delete user info by ID
router.delete('/', async (req, res) => {
    try 
    { 
        const id =  req.body.id
        const deleteUser = await prisma.user.delete({
            where: 
            {
                id: Number(id)
            }
        })
        res.status(200).send({msg: "Deleted OK"});
    } 
    catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router
