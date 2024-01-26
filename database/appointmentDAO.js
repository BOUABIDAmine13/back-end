
let connection = require('./database')

insertAppointment = (appointment) => {
    try{
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO appointment (id_appointment, date_appointment, id_record, id_vaccineInfo) VALUE (?,?,?,?)", appointment == 'undefiend' ? reject(error) : [appointment.id_appointment, appointment.date_appointment, appointment.id_record, appointment.id_vaccineInfo], (error, results, fields) =>{
                if (error) return reject(error)
                return resolve(results)
            })
        })
    } catch(error) {
        //???
    }
}

updateAppointment = (appointment) => {
    try {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE appointment SET ?", appointment == 'undefind' ? reject (error) : appointment, (error, results, fields) => {
                if(error) return reject (error)
                return resolve (results)
            })
        })
    } catch(error) {
        //error
    }
}

setDateAndDoctorAndRoom = (id_appointment, doctor_id, nbRoom) => {
    try {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE appointment (room_number, id_doctor) SET (?,?) WHERE id_appointment = ?",[nbRoom, doctor_id, id_appointment], (error, results, fields) => {
                if (error) return reject(error)
                return resolve(true)
            })
        })
    } catch (error) {
        
    }
}

getAppointmentByUserID = (id_user) => {
    try{
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM appointment WHERE id_user = ?", user == "undefind" ? reject (error) : id_user, (error, results, fields) => {
                if (error) reject (error)
                return resolve (results[0])
            })
        })
    }catch{
        //????
    }
}

getAppointmentById = (id_appointment) => {
    try {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM appointment WHERE id_appointment = ?", id_appointment == "undefind" ? reject(error) : id_appointment, (error, results, fields) => {
                if(error) reject(error)
                return resolve (results[0])
            })
        })
    } catch (error) {
        //return error json 
    }
}

getAllApointment = () => {
    try{
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM appointment", (error, results, fields) => {
                if(error) reject (error)
                return resolve(results)
            })
        })
    } catch (error) {
        //????
    }
}

getAppointmentByPage = (page) => {
    offset = (page -1)*15
    try {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM appointment LIMIT ? OFFSET ?", [15, offset], (error, results, fields) => {
                if (error) reject (error)
                return resolve(results)
            })
        })
    } catch (error) {
        
    }
}

getPagesData = ()=> {
    try {
        return new Promise((resolve, reject) => {
            connection.query("SELECT count(*) AS count FROM appointment ", (error, results, fields) => {
                if(error) reject(error)
                return resolve(Math.ceil(+results[0]?.count / 15))
            })
        })
    } catch (error) {
        
    }
}

//update function must return !!!
setAppointmentCheck = (id_appointment) => {
    try {
            return new Promise((resolve, reject) => {
                connection.query("UPDATE appointment SET checkAppointment = checked WHERE id_appointment = ?", id_appointment, (error, results, fields) =>{
                    if (error) return reject(false)
                    return resolve (true)
                })
            })
    } catch(error) {
        //??? return error on json
    }
}

deleteAppointment = (appointment) => {
    try{
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM appointment WHERE id_appointment = ?", appointment == 'undefind' ? reject (error) : appointment.id_appointment,(error,results, fields) => {
                if(error) reject(error)
                return resolve(results[0])
            })
        })
    } catch (error) {
        //
    }
}

getAppointmentsByDoctorID = (doctor_id) => {
    try {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM appointment WHERE id_doctor = ?", doctor_id, (error, results, fields) => {
                if(error) return reject("no appointments")
                return resolve(results)
            })
        })
    } catch (error) {
        
    }
}

module.exports = {insertAppointment, getAppointmentsByDoctorID, getAppointmentByUserID, getAppointmentByPage, getPagesData, setDateAndDoctorAndRoom, setAppointmentCheck}