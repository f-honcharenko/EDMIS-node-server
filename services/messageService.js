const message = require('../models/message');

class MessageService {
    sendMessage(data) {
        console.log(data);
        let msg = new message(data);
        return new Promise((res, rej) => {
            msg.save((errS, resS) => {
                if (errS) {
                    return res({
                        message: "Error. Cannot add message in DB.",
                        details: errS,
                        code: 409
                    });
                };
                return res({
                    message: "Message sended.",
                    details: resS,
                    code: 201
                });
            });
        });
    }
    getBySender(sender) {
        return new Promise((res, rej) => {
            message.find({
                sender: sender
            }, (errF, resF) => {
                if (errF) {
                    console.log(errF);
                    return res({
                        message: "Error. Cannot get message from DB.",
                        details: errF,
                        code: 409
                    });
                };
                return res({
                    message: "Message getted.",
                    details: resF,
                    code: 201
                });
            });
        });
    }
    getByRecepient(recepient) {
        return new Promise((res, rej) => {
            message.find({
                recepient: recepient
            }, (errF, resF) => {
                if (errF) {
                    console.log(errF);
                    return res({
                        message: "Error. Cannot get message from DB.",
                        details: errF,
                        code: 409
                    });
                };
                return res({
                    message: "Message getted.",
                    details: resF,
                    code: 201
                });
            });
        });
    }
    getAll() {
        return new Promise((res, rej) => {
            message.find({

            }, (errF, resF) => {
                if (errF) {
                    console.log(errF);
                    return res({
                        message: "Error. Cannot get message from DB.",
                        details: errF,
                        code: 409
                    });
                };
                return res({
                    message: "Message getted.",
                    details: resF,
                    code: 201
                });
            });
        });
    }
}

module.exports = new MessageService()