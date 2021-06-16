const user = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');

class UserService {
    getUser(data) {
        return new Promise((res, rej) => {
            user.findOne({
                login: data.login
            }, (errF, resF) => {
                if (errF) {
                    return res({
                        message: "Undefined error.",
                        details: errF,
                        code: 520
                    })
                }
                if (resF != null) {
                    return res({
                        message: "Done. User finded.",
                        details: resF,
                        code: 200
                    })
                } else {
                    return res({
                        message: "User do not finded.",
                        details: resF,
                        code: 404
                    })
                }
            });
        })
    }
    createUser(data) {
        let candidate = new user({
            login: data.login,
            password: data.password,
            fname: data.fname,
            lname: data.lname
        });
        return new Promise((res, rej) => {
            candidate.save((errS, resS) => {
                if (errS) {
                    return res({
                        message: "Error. Cannot add user in DB.",
                        details: errS,
                        code: 409
                    });
                };
                return res({
                    message: "User created.",
                    details: resS,
                    code: 201
                });
            });
        });
    }
    createUserToken(data) {
        return new Promise((res, rej) => {
            jwt.sign(data, config.jwt.secret, {
                    // algorithm: 'RS256'
                },
                function (err, token) {
                    if (err) {
                        return res({
                            message: "Token generation error.",
                            details: err,
                            code: 500
                        })
                    }
                    if (token == null) {
                        return res({
                            message: "Token was not generation.",
                            details: null,
                            code: 500
                        })
                    }
                    return res({
                        message: "Succses!",
                        details: null,
                        token: token,
                        code: 200
                    })
                });
        });

    }
    verifiyUserToken(token) {
        return new Promise((res, rej) => {
            jwt.verify(token, config.jwt.secret, function (err, decoded) {
                if (err) {
                    return res({
                        message: "Token decoding error.",
                        details: err,
                        code: 500
                    })
                }
                if (decoded == "undefined") {
                    return res({
                        message: "Undefined data token.",
                        details: null,
                        code: 500
                    })
                }
                return res({
                    message: "Succses!",
                    details: null,
                    data: decoded,
                    code: 200
                })
            });
        });

    }
    deleteUser(login) {
        return new Promise((res, rej) => {
            user.deleteOne({
                login: login
            }, (errD, resD) => {

                if (errD) {
                    return res({
                        message: "Undefined error.",
                        details: errD,
                        code: 520
                    })
                }
                if (resD == null) {
                    return res({
                        message: "User do not finded.",
                        details: resD,
                        code: 404
                    })
                } else {
                    return res({
                        message: "User succsesduly deleted.",
                        details: resD,
                        code: 200
                    })
                }
            });
        });

    }
    updateUser(data) {
        return new Promise((res, rej) => {
            user.updateOne({
                    login: data.login
                },
                data, (errU, resU) => {

                    if (errU) {
                        return res({
                            message: "Undefined error.",
                            details: errU,
                            code: 520
                        })
                    }
                    if (resU == null) {
                        return res({
                            message: "User do not finded.",
                            details: resU,
                            code: 404
                        })
                    } else {
                        return res({
                            message: "User succsesduly updated.",
                            details: resU,
                            code: 200
                        })
                    }
                });
        });
    }
    getAllUsers() {
        return new Promise((res, rej) => {
            user.find({}, (errF, resF) => {
                if (errF) {
                    return res({
                        message: "Undefined error.",
                        details: errF,
                        code: 520
                    })
                }
                if (resF != null) {
                    return res({
                        message: "Done. Users getted.",
                        details: resF,
                        code: 200
                    })
                } else {
                    return res({
                        message: "null users.",
                        details: resF,
                        code: 404
                    })
                }
            });
        });
    }
}


module.exports = new UserService()