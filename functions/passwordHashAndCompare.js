let bcrypt = require('bcrypt')

let hashPassword = (password, saltRounds = 10) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds)
        .then(salt => {
                // console.log(salt)
                bcrypt.hash(password, salt)
                .then(hash => {
                    console.log("inside"+hash)
                    return resolve(hash)
                }).catch(err => { return reject(err) })
        }).catch(err => { return reject(err) })
    })
   
}

let comparePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash)
        .then(result => {
            console.log(result)
            return resolve(result)
        })
        .catch("lllllllllllll")
    })
}

module.exports = {hashPassword, comparePassword}