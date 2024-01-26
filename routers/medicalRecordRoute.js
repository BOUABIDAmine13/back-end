let api = require('express').Router()
let Joi = require('joi')
let id_medcalRecord = require('../functions/idGenerated')
let medicalRecordDAO = require('../database/medicalRecordDAO')
let appointmentDAO = require('../database/appointmentDAO')
let vacciensData = require('../vaccineData/vaccinesData.json')
let isAuthonticat = require('../middlewares/authonticate')

registerSchema = (req, res, next) => {
    const schema = Joi.object ({
    full_name_child: Joi.string(),//.email({minDomainSegments: 2, tlds : Joi.allow ['com']}).required(),
    birth_day_child: Joi.date().less('now').iso(),//.pattern(new RegExp('^[a-zA-Z0-9]{8,15}$')).required(),
    address_child: Joi.string(),//.max(2).required(),
    phone_child: Joi.string(),
})
validateRequest(req, next, schema)
}

generateId = async (req, res, next) => {
    // date = new Date (req.body.birth_day_child)
    // console.log(req.body.birth_day_child.getFullYear())
    // addres = req.body.address_child.split(' ')
    // console.log(addres)
    req.body.id_record = await id_medcalRecord.idGenerate(req.body)
    //console.log(typeof req.body.id_record)
    next()
}

registerMedicalRecord = async (req, res, next) => {
    //console.log(req.body)
    //console.log("database register")
    await medicalRecordDAO.insertMedicalRecord(req.body)
    next()
}

appointmentsAutoRegister = async(req, res, next) => {
    for(let i = 1; i< Object.keys(vacciensData.vaccines).length+1; i++){
        let date = new Date(req.body.birth_day_child);
	    date.setDate(date.getDate() + +vacciensData.vaccines[i].data)
        appointment = {
            id_appointment :req.body.id_record+'AP'+i,
            date_appointment: date,     
            id_record: req.body.id_record,
            id_vaccineInfo:""
        }
        console.log(appointment)
        await appointmentDAO.insertAppointment(appointment)
    }
    next()
}

api.get('/' ,(req, res) => {
    res.json({message: "medical record page"})
})

api.post('/register_child', isAuthonticat.isAuthonticat, registerSchema, generateId, registerMedicalRecord, appointmentsAutoRegister, (req, res) => {
    console.log("post2")
})



module.exports = api