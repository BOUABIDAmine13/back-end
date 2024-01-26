let api = require('express').Router()
let doctorMeddileware = require('../middlewares/doctorMiddleware')

api.use((req, res, next) => {
    if ( ! jwt.verify(req.cookies.token, '123').role == 'doctor') {
        res({message:"not authonticate"})
    }
    next()
})

api.get('/', doctorMeddileware.getDoctorInfos)


api.get('/getAllAppoinments', doctorMeddileware.getDoctorAppointments)

module.exports = api