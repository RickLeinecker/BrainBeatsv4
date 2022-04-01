import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {getUser} from './database/users';

// Checks the local storage for an existing token and logs them in if one exists
function verifyJWT(token) {
    if (token) {
        return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);
    } else {
        return false;
    }
}

// Checks the user exists and then creates and saves a JWT onto their machine's local storage
async function giveLoginJWT(loginCred, password) {
    const user = await getUser(loginCred);
    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                name: user.name
            }, process.env.NEXT_PUBLIC_JWT_KEY, {
                expiresIn: '30d'
            });
            saveJWT(token);
            return token;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// Save a JWT onto local storage
function saveJWT(token) {
    localStorage.setItem('token', token);
    console.log("Saved JWT", token);
}

// Retrive JWT from local storage
function getJWT() {
    return localStorage.getItem('token');
}

// Remove JWT from local storage
function removeJWT() {
    return localStorage.removeItem('token');
}

export {verifyJWT, loginJWT, saveJWT, getJWT, removeJWT};