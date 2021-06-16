const user = require('../models/user');
const userServices = require('../services/userServices');

class UserController {
    async register(req, res) {
        if (req.body.login && req.body.password && req.body.fname && req.body.lname) {

            let result = await userServices.createUser({
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
            let result = await userServices.getUser({
                login: req.body.login
            });

            if (result.code == 200) {
                let user = result.details;
                if (user.password == req.body.password) {
                    let token = await userServices.createUserToken(user.toJSON());
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
            let verifying = await userServices.verifiyUserToken(req.body.token);
            if (verifying.code == 200) {
                let findUser = await userServices.getUser({
                    login: verifying.data.login
                });
                if (findUser.code == 200) {
                    let deleted = await userServices.deleteUser(verifying.data.login);
                    return res.status(deleted.code).json(deleted);
                } else {
                    return res.status(findUser.code).json(findUser);
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
            let verifying = await userServices.verifiyUserToken(req.body.token);
            if (verifying.code == 200) {
                let findUser = await userServices.getUser({
                    login: verifying.data.login
                });
                if (findUser.code == 200) {
                    let updated = await userServices.updateUser({
                        login: verifying.data.login,
                        password: verifying.data.password,
                        fname: req.body.fname,
                        lname: req.body.lname
                    });
                    return res.status(updated.code).json(updated);
                } else {
                    return res.status(findUser.code).json(findUser);
                }
            }
            return res.status(verifying.code).json(verifying);
        } else {
            return res.status(400).json({
                message: 'Bad request.'
            });
        }
    };
    async updateOther(req, res) {
        if (req.body.token && req.body.fname && req.body.lname && req.body.login && req.body.position) {
            //TODO: Добавить проверку новых данных
            let verifying = await userServices.verifiyUserToken(req.body.token);
            if (verifying.code == 200) {
                let findUser = await userServices.getUser({
                    login: verifying.data.login
                });
                if (findUser.code == 200) {
                    let updated = await userServices.updateUser({
                        login: req.body.login,
                        password: verifying.data.password,
                        fname: req.body.fname,
                        lname: req.body.lname,
                        position: req.body.position,
                    });
                    return res.status(updated.code).json(updated);
                } else {
                    return res.status(findUser.code).json(findUser);
                }
            }
            return res.status(verifying.code).json(verifying);
        } else {
            return res.status(400).json({
                message: 'Bad request.'
            });
        }
    };
    async verify(req, res) {
        if (req.body.token) {
            let verifying = await userServices.verifiyUserToken(req.body.token);
            return res.status(verifying.code).json(verifying);

        } else {
            return res.status(400).json({
                message: 'Bad request.'
            });
        }
    };
    async findByToken(req, res) {
        if (req.body.token) {
            let verifying = await userServices.verifiyUserToken(req.body.token);
            if (verifying.code == 200) {
                let findUser = await userServices.getUser({
                    login: verifying.data.login
                });
                return res.status(findUser.code).json(findUser);
            }
            return res.status(verifying.code).json(verifying);

        } else {
            return res.status(400).json({
                message: 'Bad request.'
            });
        }
    };
    async findByLogin(req, res) {
        if (req.body.token && req.body.login) {
            let verifying = await userServices.verifiyUserToken(req.body.token);
            if (verifying.code == 200) {
                let findUser = await userServices.getUser({
                    login: req.body.login
                });
                return res.status(findUser.code).json(findUser);
            }
            return res.status(verifying.code).json(verifying);

        } else {
            return res.status(400).json({
                message: 'Bad request.'
            });
        }
    };
    async getAllUsers(req, res) {
        if (req.body.token) {
            let verifying = await userServices.verifiyUserToken(req.body.token);
            if (verifying.code == 200) {
                let findUser = await userServices.getAllUsers();
                return res.status(findUser.code).json(findUser);
            }
            return res.status(verifying.code).json(verifying);

        } else {
            return res.status(400).json({
                message: 'Bad request.'
            });
        }
    }
}
module.exports = new UserController();