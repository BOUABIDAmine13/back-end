let connection = require('./database')

insertMedicalRecord = (medicalRecord) => {
    console.log("insert")
    try{
        return new Promise((resolev, reject) => {
            connection.query("INSERT INTO medical_record SET ?", typeof medicalRecord === 'undefined' ? reject("undefined object") : medicalRecord, (error, results, fields) => {
                if (error) return console.log(error)
                return resolev(results)
            })
        })
    } catch(error) {
        return "error: "
    }
}

getAllMedicalRecord = () => {
    try {
        return new Promise((resolev, reject) => {
            connection.query("SELECT * FROM medical_record", (error, results, fields) => {
                if (error) return reject(error)
                return resolev(results)
            })
        })
    } catch (error) {
        
    }
}

getMedicalRecordByID = (id_record) => {
    try {
        return new Promise((resolev, reject) => {
            connection.query("SELECT * FROM medical_record WHERE id_record = ?" ,[id_record], (error, results, fields) => {
                if(error) return reject("121212121212")
                return resolev(results[0])
            })
        })
    } catch (error) {
        console.log("hir1")
    }
}

updateMedicalRecord = (medicalRecord) => {
    try {
        return new Promise((resolev, reject) => {
            connection.query("UPDATE medical_record SET ? WHERE id_record = ?", [medicalRecord, medicalRecord.id_record], (error, results, fields) => {
                if (error) return reject(error)
                return resolev(results[0])
            })
        })
    } catch (error) {
        
    }
}

getMedicalRecordByIdAccount = (account_id) => {
    try {
        return new Promise((resolev, reject) => {
            connection.query("SELECT * FROM medical_record WHERE id_counnet = ?", account_id, (error, results, fields) => {
                if(error) return reject("no medical record exist")
                return resolev(results)
            })
        })
    } catch (error) {
        
    }
}

getNbChildsByYear = (year) => {
    try {
        return new Promise((resolev, reject) => {
            connection.query("SELECT nb_child FROM nb_by_year WHERE current_year = ?", year, (error, results, fields) => {
                if(error) return reject("no year")
                return resolev(results[0].nb_child)
            })
        })
    } catch (error) {
        
    }
}

module.exports = { insertMedicalRecord, getMedicalRecordByID, getAllMedicalRecord, updateMedicalRecord, getMedicalRecordByIdAccount, getNbChildsByYear}