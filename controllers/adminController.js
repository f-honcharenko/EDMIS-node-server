const adminServices = require('../services/adminServices');

class AdminController {
    async register(req, res) {
        if (req.body.login && req.body.password) {
            console.log("Regestration new Administrator started.");
            console.log("\tLogin: [" + req.body.login + "]");
            console.log("\tPassword: [" + req.body.password + "]");

            let result = await adminServices.create({
                login: req.body.login,
                password: req.body.password
            });
            if (result) {
                return res.status(200).json(result)
            } else {
                return res.status(500).json(result)
            }
        } else {
            return res.status(400).json({
                message: 'Bad request.'
            });
        }
    };
}

module.exports = new AdminController();