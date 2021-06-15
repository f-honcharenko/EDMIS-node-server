const config = require('config');
const {
    Schema,
    model
} = require('mongoose');


const adminSchema = new Schema({
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
    }
}, {
    collection: "adminUsers"
}, {
    timestamps: true
});

module.exports = model('Admin', adminSchema);