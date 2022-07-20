const { prisma } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {getUser} = require('./database/users');
const router = require("express").Router();

// Checks the local storage for an existing token and logs them in if one exists
function verifyJWT(jwtToken) {
    let token;

    if (jwtToken) {
        token = jwtToken;
    } else {
        // TODO : Error
    }

    return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY, function (err, decoded) {
        if (err) {
            console.log(err);
            return false;
        } else {
            if (decoded) {
                return decoded;
            }
        }
    });
}

// Checks the user exists and then creates and saves a JWT onto their machine's local storage
async function getLoginJWT(user, password) {
    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                username: user.username
            }, process.env.NEXT_PUBLIC_JWT_KEY, {
                expiresIn: '30d'
            });
            
            return token;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

async function getSignUpJWT(id, email, username) {
    const token = jwt.sign({
        id: id,
        email: email,
        username: username
    }, process.env.NEXT_PUBLIC_JWT_KEY, {
        expiresIn: '30d'
    });
    return token;
}

// TODO : Turn these into API calls for frontend to use so it's actually client side local storage

// Save a JWT onto local storage
function saveJWT(token) {
    localStorage.setItem('BrainBeatsToken', token);
    console.log("Saved JWT", token);
}

// Retrive JWT from local storage
function getJWT() {
    return localStorage.getItem('BrainBeatsToken');
}

// Remove JWT from local storage
function removeJWT() {
    return localStorage.removeItem('BrainBeatsToken');
}

module.exports = {
    verifyJWT: verifyJWT,
    saveJWT: saveJWT,
    getLoginJWT: getLoginJWT,
    getSignUpJWT: getSignUpJWT,
    getJWT: getJWT,
    removeJWT: removeJWT
}