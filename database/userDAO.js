const { config } = require("dotenv")
let connection = require("./database")
let medicalRecord = require('./medicalRecordDAO')
let jwt = require('jsonwebtoken')
let passwordCompare = require ('../functions/passwordHashAndCompare')

userRegister = (user) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO user SET ?", user, (error, results, fields) => {
            if(error) return reject(error)
            return resolve()
        })
    })
}

userUpadetEmail = (user) => {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE user SET email_user = ? WHERE id_user = ?", typeof user == "undefined" ? reject("object not desined") : [user.email_user, user.id_user],(error, results, fields) => {
            if (error) return reject(error)
            console.log(results[0])
            return resolve(results[0]) 
        })
    })
}

userUpdatePassword = (user) => {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE user SET password_user = ? WHERE id_uder = ?", user == null ? null : [user.password_user, id_user], (error, results, fields) => {
            if(error) return reject(error)
            return resolve(results[0])
        })
    })
}

getAllUsers = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM user",(error, results, fields)=>{
            if (error) return reject(error)
            return resolve(results)
        })
    })
}

getUserById = (id_user) => {
    console.log("id")
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM user WHERE id_user = ?",id_user == null ? null : id_user, (error, results, fields) => {
            if(error) return reject(error)
            return resolve(results[0])
        })
    })
}

getUserByEmail = (user) => {
    console.log(user.email_user.toString())
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM user WHERE email_user = ?", user.email_user, (error, results, fields) => {
            if(error) reject(error)
            // console.log(results[0].toString())
            return resolve (results[0])
        })
    })
}

userAuthenticate = async (user) => {
    const userResults = await getUserByEmail(user)
    return new Promise( async (resolve, reject) => {
        if(userResults.email_user === 'undefined' || !(await passwordCompare.comparePassword(user.password_user, userResults.password_user))) 
            return reject("email or password not correct")
        // get jwt token
        const token = jwt.sign({sub: userResults.id_user, role: userResults.roles}, "123", {expiresIn : '7d'})
        console.log(token)
        return resolve({userResults ,token})
    })
}

module.exports = {userRegister, getAllUsers, userUpadetEmail, userUpdatePassword, getUserById, getUserByEmail, userAuthenticate}