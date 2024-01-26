let userDataBase = require('../database/userDAO')
let validateRequest = require('./validateRequest')
let Joi = require('joi')
let passwordHash = require('../functions/passwordHashAndCompare')

registerSchema = (req, res, next) => {
    const schema = Joi.object ({
    email_user: Joi.string(),//.email({minDomainSegments: 2, tlds : Joi.allow ['com']}).required(),
    password_user: Joi.string(),//.pattern(new RegExp('^[a-zA-Z0-9]{8,15}$')).required(),
    id_clinic: Joi.string(),//.max(2).required(),
    roles: Joi.string().default('user'),
})
validateRequest(req, next, schema)
}

register = async (req, res, next) => {
    req.body.password_user = await passwordHash.hashPassword(req.body.password_user)
    await userDataBase.userRegister(req.body).then(() => res.redirect('/login')).catch(next)
}


module.exports = {registerSchema, register}