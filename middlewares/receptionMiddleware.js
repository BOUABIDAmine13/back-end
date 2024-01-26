appointmentDataBase = require('../database/appointmentDAO')

getAllApointments = async (req, res, next) => {
    appointments.data = await appointmentDataBase.getAppointmentByPage(+req.param.page)
    appointments.pages = await appointmentDataBase.getPagesData()
    appointments.currentPage = req.param.page
    res.json(appointments);
}

getAppointment = async(req, res, next) => {
    appointment = await appointmentDataBase.getAppointmentById(req.param.appointmentId)
    res.json(appointment)
}

setDateAndDoctorId = async (req, res, next) => {
    if(await appointmentDataBase.setDateAndDoctorAndRoom(req.param.appointmentId, req.param.doctor,req.param.nbRoom)){
        appointment = await appointmentDataBase.getAppointmentById(req.param.appointmentId)
        res.json(appointment)
    }else {
        next("error in update")
    }
}

setAppointmentChecked = async(req, res, next) => {
    if(await appointmentDataBase.setAppointmentCheck(req.param.appointmentId)){
        appointment = await appointmentDataBase.getAppointmentById(req.param.appointmentId)
        res.json(appointment)
    }else{
        next("error in update")
    }

}

module.exports = {getAllApointments, getAppointment, setDateAndDoctorAndRoom, setAppointmentChecked}