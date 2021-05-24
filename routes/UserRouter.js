const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

const userSchema = require('../models/User')

//use authenticate middleware
router.get('/',authenticateToken,(req, res) => {
    userSchema.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

//use bcrypt
router.post('/',async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        req.body.password = hashedPassword;
    } catch {
        return res.status(500).send();
    }

    userSchema.create(req.body,(error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

//check hashed password
router.post('/check', (req, res) => {
    userSchema.findOne({'user' : req.body.user}, async (error, data) => {
        if (error) {
            return next(error);
        } else {
            if (data === null) {
                res.status(400).send('user not found');
            } else {
                if (await bcrypt.compare(req.body.password,data.password)){
                    res.send('password correct !');
                } else {
                    res.send('incorrect password');
                }
            }
        }
    })
})

router.post('/login',(req,res) => {
    //not need to check password because its a test
    const username = req.body.username;
    const password = req.body.password;

    //in production save your secret key in .env file
    //"wowzalnwmak" is my temp secret key
    const token = jwt.sign(username,"wowzalnwmak");
    res.json({za: token});
})

//authenticate middleware
function authenticateToken(req,res,next) {
    //get token from request
    const authHeader = req.headers['authorization'];
    const token =  authHeader && authHeader.split(' ')[1];

    if (token == null){
        return res.sendStatus(403)
    } else {
        //"result" in callback return sign value
        //in sign method, username is signed so "result" value = username
        jwt.verify(token,"wowzalnwmak", (err,result) => {
            if (err) return res.sendStatus(403);

            req.username = result;
            next();
        })
    }
}


module.exports = router;
