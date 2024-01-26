let api = require('express').Router()
let loginMiddleware = require('../middlewares/loginMiddleware')

api.get('/',(req, res) => {
    res.status(200).send({page:'login'})
})
 
api.post('/', loginMiddleware.loginSchema, loginMiddleware.login, loginMiddleware.authorazation)


module.exports = api