const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let userSchema = new Schema({
    user: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    status: {
        type: String
    }
}, {
    collection: "user"
})

module.exports = mongoose.model('User', userSchema);