const config = require('config');
const {
    Schema,
    model
} = require('mongoose');


const userSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
        default: "Manager"
    },
    type: {
        type: String,
        required: true,
        default: "user"
    },
    // addInfo: {
    //     prefix: {
    //         type: String,
    //         uppercase: true,
    //         required: true,
    //         default: "edmis"
    //     },
    //     link: {
    //         type: String,
    //         required: true,
    //         default: "-"
    //     },
    //     title: {
    //         type: String,
    //         required: true,
    //         default: "EDMIS-TITLE"
    //     }
    // }
}, {
    collection: "users"
}, {
    timestamps: true
});

module.exports = model('User', userSchema);