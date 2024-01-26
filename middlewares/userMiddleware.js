let userDataBase = require('../database/userDAO')
let medicalRecordDataBase = require('../database/medicalRecordDAO')
let appointmentDataBase = require('../database/appointmentDAO')
let jwt = require('jsonwebtoken')

getUserInfos = async (req, res, next) => {
    console.log("122")
    if(jwt.verify(req.cookies.token, '123').role === 'user'){
        user = await userDataBase.getUserById(jwt.verify(req.cookies.token, '123').sub)
        user.data = await medicalRecordDataBase.getMedicalRecordByIdAccount(user.id_user)
        res.json(user)
    } else {
        next("not authrized: only users!")
    }
}

getUserAppointments = async(req, res, next) => {
    if(jwt.verify(req.cookies.token, '123').role === 'user'){
        user = await userDataBase.getUserById(jwt.verify(req.cookies.token, '123').sub)
        user.appointments = await appointmentDataBase.getAppointmentByUserID(user.id_user)
        res.json(user)
    } else {
        next("not authrized: only users!")
    }
}

module.exports = {getUserInfos, getUserAppointments}