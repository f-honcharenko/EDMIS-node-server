const message = require('../models/message');
const user = require('../models/user');
const messageService = require('../services/messageService');
const userServices = require('../services/userServices');

class MessageController {
    async sendMessage(req, res) {
        if (req.body.token && req.body.recepient && req.body.content) {
            let verifying = await userServices.verifiyUserToken(req.body.token);
            if (verifying.code == 200) {
                let msg = await messageService.sendMessage({
                    sender: verifying.data.login,
                    recepient: req.body.recepient,
                    content: req.body.content,
                })
                return res.status(msg.code).json(msg);
            }
            return res.status(verifying.code).json(verifying);
        } else {
            return res.status(400).json({
                message: 'Bad request.'
            });
        }
    };
    async getBySender(req, res) {
        if (req.body.token) {
            let verifying = await userServices.verifiyUserToken(req.body.token);
            if (verifying.code == 200) {
                let msg = await messageService.getBySender(verifying.data.login);
                return res.status(msg.code).json(msg);
            }
            return res.status(verifying.code).json(verifying);
        } else {
            return res.status(400).json({
                message: 'Bad request.'
            });
        }

    };
    async getByRecepient(req, res) {
        if (req.body.token) {
            let verifying = await userServices.verifiyUserToken(req.body.token);
            if (verifying.code == 200) {
                let msg = await messageService.getByRecepient(verifying.data.login);
                return res.status(msg.code).json(msg);
            }
            return res.status(verifying.code).json(verifying);
        } else {
            return res.status(400).json({
                message: 'Bad request.'
            });
        }
    };
    async getAll(req, res) {
        if (req.body.token) {
            let verifying = await userServices.verifiyUserToken(req.body.token);
            if (verifying.code == 200) {
                let msg = await messageService.getAll();
                return res.status(msg.code).json(msg);
            }
            return res.status(verifying.code).json(verifying);
        } else {
            return res.status(400).json({
                message: 'Bad request.'
            });
        }
    };

}
module.exports = new MessageController();