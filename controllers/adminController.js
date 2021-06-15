const adminServices = require('../services/adminServices');

class AdminController {
    async register(req, res) {
        if (req.body.login && req.body.password && req.body.fname && req.body.lname) {
            console.log("Regestration new Administrator started.");

            let result = await adminServices.createAdmin({
                login: req.body.login,
                password: req.body.password,
                fname: req.body.fname,
                lname: req.body.lname
            });

            return res.status(result.code).json(result)
        } else {
            return res.status(400).json({
                message: 'Bad request.'
            });
        }
    };
    async login(req, res) {
        if (req.body.login && req.body.password) {
            let result = await adminServices.getAdmin({
                login: req.body.login
            });

            if (result.code == 200) {
                let admin = result.details;
                if (admin.password == req.body.password) {
                    return res.status(token.code).json(token)
                } else {
                    return res.status(412).json({
                        message: "Password is wrong!",
                    })
                }
            }
            return res.status(result.code).json(result)
        } else {
            return res.status(400).json({
                message: 'Bad request.'
            });
        }
    };
}

module.exports = new AdminController();