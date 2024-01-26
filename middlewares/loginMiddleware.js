let Joi = require('joi')
let validateRequest = require('../middlewares/validateRequest')
let userDatabase = require ('../database/userDAO')
let jwt = require('jsonwebtoken')

loginSchema = (req, res, next) => {
    console.log("login schema")
    const schema = Joi.object ({
        email_user: Joi.string().required(),
        password_user: Joi.string().required()
    })
    validateRequest(req, next, schema)
}

login = async (req, res, next) => {
    console.log("login")
    await userDatabase.userAuthenticate(req.body).then(data => {
        res.cookie("token", data.token, {httpOnly: true})
        next()
    }).catch(next)
}

authorazation = (req, res, next) => {
    console.log("auth")
    if(jwt.verify(req.cookies.token, '123')){
        switch (true) {
                case jwt.verify(req.cookies.token, '123').role === 'user' : res.redirect('/user')
                    break
                case jwt.verify(req.cookies.token, '123').role === 'admin': res.redirect('/admin')
                    break
                case jwt.verify(req.cookies.token, '123').role === 'reception' : res.redirect('/reception')
                    break
                default: next('not authrized')
            }
    }
}

module.exports = {loginSchema, login, authorazation}