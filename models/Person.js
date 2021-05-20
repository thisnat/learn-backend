const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let personSchema = new Schema({
    name: {
        type: String
    },
    username: {
        type: String
    }
}, {
    collection: "person"
})

module.exports = mongoose.model('Person', personSchema);