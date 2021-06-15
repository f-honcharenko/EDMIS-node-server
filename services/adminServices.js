const admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const config = require('config');

class AdminService {
    getAdmin(data) {
        return new Promise((res, rej) => {
            admin.findOne({
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
    createAdmin(data) {
        let candidate = new admin({
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
                    message: "Admin created.",
                    details: resS,
                    code: 201
                });
            });
        });
    }
    createAdminToken(data) {
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
    verifiyAdminToken(token) {
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
                        message: "undefined data token.",
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
    deleteAdmin(login) {
        return new Promise((res, rej) => {
            admin.deleteOne({
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
    updateAdmin(data) {
        return new Promise((res, rej) => {
            admin.updateOne({
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
}

module.exports = new AdminService()