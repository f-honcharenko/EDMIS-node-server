const admin = require('../models/admin');
const adminServices = require('../services/adminServices');

class AdminController {
    async register(req, res) {
        if (req.body.login && req.body.password && req.body.fname && req.body.lname) {

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
                    let token = await adminServices.createAdminToken(admin.toJSON());
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
    async delete(req, res) {
        if (req.body.token) {
            let verifying = await adminServices.verifiyAdminToken(req.body.token);
            if (verifying.code == 200) {
                let findAdmin = await adminServices.getAdmin({
                    login: verifying.data.login
                });
                if (findAdmin.code == 200) {
                    let deleted = await adminServices.deleteAdmin(verifying.data.login);
                    return res.status(deleted.code).json(deleted);
                } else {
                    return res.status(findAdmin.code).json(findAdmin);
                }
            }
            return res.status(verifying.code).json(verifying);
        } else {
            return res.status(400).json({
                message: 'Bad request.'
            });
        }

    };
    async update(req, res) {
        if (req.body.token && req.body.fname && req.body.lname) {
            //TODO: Добавить проверку новых данных
            let verifying = await adminServices.verifiyAdminToken(req.body.token);
            if (verifying.code == 200) {
                let findAdmin = await adminServices.getAdmin({
                    login: verifying.data.login
                });
                if (findAdmin.code == 200) {
                    let updated = await adminServices.updateAdmin({
                        login: verifying.data.login,
                        password: verifying.data.password,
                        fname: req.body.fname,
                        lname: req.body.lname
                    });
                    return res.status(updated.code).json(updated);
                } else {
                    return res.status(findAdmin.code).json(findAdmin);
                }
            }
            return res.status(verifying.code).json(verifying);
        } else {
            return res.status(400).json({
                message: 'Bad request.'
            });
        }
    };
}
module.exports = new AdminController();