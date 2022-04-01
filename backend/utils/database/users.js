import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcryptjs';

/// Get the user by using email or id (Feel free to change this)
async function getUser({email, id} = {}) {
    const prisma = new PrismaClient();
    // TODO: Add more stuff here
}

// Update arguments and code as necessary to create a new user in the database
async function createUser(email, password) {
    const prisma = new PrismaClient();
    // TODO: Add more stuff here
}

// Update arguments and code as necessary to update a user in the database
async function updateUser({email, id} = {}, data) {
    const prisma = new PrismaClient();
    // TODO: Add more stuff here
}


export {getUser, updateUser, createUser};