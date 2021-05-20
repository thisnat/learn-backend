const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

const personSchema = require('../models/Person')

router.route('/').get((req, res) => {
    personSchema.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

router.route('/add').post((req, res, next) => {
    personSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

router.route('/id/:id').get((req, res, next) => {
    personSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

router.route('/id/:id').put((req, res, next) => {
    personSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log(`${req.params.id} updated successfully`);
        }
    })
})

router.route('/id/:id').delete((req, res, next) => {
    personSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;
