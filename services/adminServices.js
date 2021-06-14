const admin = require('../models/admin');
const user = require('../models/admin');

class AdminService {
    getUsers() {
        return new Promise((res, rej) => {
            fs.readFile('data.json', (err, data) => {
                if (err) {
                    return res(false)
                }
                return res(JSON.parse(data))
            })
        })
    }

    createUser(data) {
        return new Promise((res, rej) => {
            fs.writeFile(
                'data.json',
                JSON.stringify(data),
                (err, response) => {
                    if (err) return res(false)

                    return res({
                        message: 'User created.'
                    })
                }
            )
        })
    }
    create(person) {
        console.log("Start adnimServices.CREATE");
        let candidate = new admin({
            login: person.login,
            password: person.password,
        });
        // console.log(candidate);
        return new Promise((res, rej) => {
            candidate.save((errS, resS) => {
                if (errS) return res({
                    message: "Error. Cannot add user in DB.",
                    details: errS
                });
                return res({
                    message: "Admin created"
                });
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