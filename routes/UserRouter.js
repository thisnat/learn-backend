const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');

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
