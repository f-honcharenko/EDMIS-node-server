const admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const config = require('config');

class AdminService {
    getAdmin(data) {
        return new Promise((res, rej) => {
            admin.findOne({
                login: data.login
            }, (errF, resF) => {
                console.log(resF);

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
        console.log("Start adnimServices.CREATE");
        let candidate = new admin({
            login: data.login,
            password: data.password,
            fname: data.fname,
            lname: data.lname
        });
        // console.log(candidate);
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
            }, function (err, token) {
                if (err) {
                    console.log(err);
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


    updateUser(data) {
        return new Promise((res, rej) => {
            fs.writeFile(
                'data.json',
                JSON.stringify(data),
                (err, response) => {
                    if (err) return res(false)

                    return res({
                        message: 'User updated.'
                    })
                }
            )
        })
    }
    deleteUser(data) {
        return new Promise((res, rej) => {
            fs.writeFile(
                'data.json',
                JSON.stringify(data),
                (err, response) => {
                    if (err) return res(false)

                    return res({
                        message: 'User deleted.'
                    })
                }
            )
        })
    }
}

module.exports = new AdminService()