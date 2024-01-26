let connection = require('./database')

insertEmploye = (employe) => {
   try {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO employe SET ?", employe == "undefind" ? reject (error) : employe, (error, results, fields) => {
            if(error) reject(error)
            return resolve(results)
        })
    })
   } catch (error) {
    //return json
   }
}


//test the id 
updateEmloye = (employe) => {
    try {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE employe SET ? WHERE id_employe = ?", employe == 'infefind' ? reject(error): [employe, employe.id_emioye], (error, results, fields) => {
                if(error) reject(error)
                return resolve(results[0])
            })
        })
    } catch (error) {
        //
    }
}

getAllEmployes = () => {
    try {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM employe", (error, results, fields) => {
                if (error) reject(error)
                return resolve(results)
            })
        })
    } catch (error) {
        //
    }
}

deleteEmploye = (employe) => {
    try {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM employe WHERE id_employe = ?", employe == 'undefind' ? reject(error) : employe.id_employe, (error, results, fields) => {
                if(error) reject(false)
                return resolve(true)
            })
        })
    } catch(error) {
        //
    }
}

