const config = require('config');
const {
    Schema,
    model
} = require('mongoose');


const messageSchema = new Schema({
    sender: {
        type: String,
        required: true,
    },
    recepient: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
}, {
    collection: "messages"
}, {
    timestamps: true
});

module.exports = model('Message', messageSchema);