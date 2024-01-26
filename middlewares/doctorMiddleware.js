let userDataBase = require('../database/userDAO')
let doctorDataBase = require('../database/doctorDAO')
let appoinmentDataBase = require('../database/appointmentDAO')


getDoctorInfos = async (req, res, next) => {
        doctor = await userDataBase.getUserById(jwt.verify(req.cookies.token, '123').sub)
        doctor.data = await doctorDataBase.getDoctorByIdAccount(doctor.id_user)
        res.json(doctor)
}

getDoctorAppointments = async(req, res, next) => {
    doctorAccount.doctorAppointments = appoinmentDataBase.getAppointmentsByDoctorID(req.id_doctor)
    res.json(doctorAccount)
}

module.exports = {getDoctorInfos, getDoctorAppointments}