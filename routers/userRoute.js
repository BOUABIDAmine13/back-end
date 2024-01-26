let api = require('express').Router()
let userMiddleware = require('../middlewares/userMiddleware')
let isAuthonticat = require('../middlewares/authonticate')
api.use((req, res, next) => {
    if ( ! jwt.verify(req.cookies.token, '123').role == 'user') {
        res({message:"not authonticate"})
    }
    next()
})

api.get('/',  userMiddleware.getUserInfos)
api.get('/appointments', userMiddleware.getUserAppointments)


module.exports = api