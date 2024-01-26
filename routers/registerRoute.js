let api = require('express').Router()
let userRegisterMiddleware = require('../middlewares/userRegisterMiddleware')
 
api.get('/',(req, res) => {
    res.json({message:"regeser page"})
})

api.post('/',userRegisterMiddleware.registerSchema, userRegisterMiddleware.register)

module.exports = api