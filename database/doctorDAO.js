let connection = require('./database')

insertDoctor = (doctor) => {
    try {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO doctor SET ?", doctor == 'undefind' ? reject(error) : doctor, (error, results, fields) =>{
                if (error) reject (error)
                return resolve(results[0])
            })
        })
    } catch (error) {
        //
    }
}

updateDoctor = (doctor) => {
    try {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE doctor SET ? WHERE id_doctor = ?", doctor == 'indefind' ? reject(error) : [doctor, doctor.id_doctor], (error, results, fields) => {
                if(error) reject(error)
                return resolve(results[0])
            })
        })
    } catch(error) {

    }
}

getDoctorById = (id_doctor) => {
    try {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM doctor WHERE id_doctor = ?", id_doctor == 'indefind' ? reject(error) : id_doctor, (error,results, fields) => {
                if(error) reject (error)
                return resolve(results[0])
            })
        })
    } catch (error) {
        //
    }
}

getAllDoctors = () => {
    try {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM doctor", (error, results, fields) => {
                if(error) reject(error)
                return resolve(results)
            })
        })
    } catch (error) {
        
    }
}

deleteDoctor = (doctor) => {
    try {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM doctor WHERE id_doctor = ?", doctor == 'undefind' ? reject(error) : doctor.id_doctor, (error, results, fields) => {
                if(error) reject(error)
                return resolve(results)
            })
        })
    } catch (error) {
        
    }
}

getDoctorByIdAccount = (account_id) => {
    try {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM doctor WHERE id_counnet = ?", account_id, (error, results, fields) => {
                if(error) return reject ("no doctor informaions")
                return resolve(results[0])
            })
        })
    } catch (error) {
        
    }
}

module.exports = { insertDoctor, updateDoctor, deleteDoctor, getAllDoctors, getDoctorById, getDoctorByIdAccount}