let api = require('express').Router()
let isAuthonticat = require('../middlewares/authonticate')
let receptionMiddleware = require('../middlewares/receptionMiddleware')

api.get('/getAppointments/:page',isAuthonticat.isAuthonticat, receptionMiddleware.getAllApointments)
api.get('/getAppointment/:appointmentId', receptionMiddleware.getAppointment)
api.put('/setAppointment/:appointmentId/:doctor/:nbRoom', receptionMiddleware.setDateAndDoctorAndRoom)
api.put('/appointmentValide/:appointmentId', receptionMiddleware.setAppointmentChecked)

module.exports = api