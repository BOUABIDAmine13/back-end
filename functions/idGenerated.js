let medicalRecord = require('../database/medicalRecordDAO')
idGenerate = async (body) => {
    wilayas = {
        "09":"blida",
        "16":"alger",
        "26":"media"

    }
    meri = {
        "09":{
            "002":"oulad-yaich",
            "001":"blida"},
        "16":{
            "001":"alger",
            "002":"kouba",
            "003":"bab-eljour"},
        "26":{
            "001":"media",
            "002":"ouzra",
            "003":"berougia"
        }
    }
    var wilayaId = Object.keys(wilayas).find((k) => {
        return wilayas[k] === body.address_child.split(' ')[0];
      })
    // console.log("found "+wilayaId)
    let meriId = Object.keys(meri[wilayaId]).find((k) => {
        return meri[wilayaId][k] === body.address_child.split(' ')[1];
      })
      return wilayaId+meriId+body.birth_day_child.getFullYear().toString()+(await medicalRecord.getNbChildsByYear(body.birth_day_child.getFullYear())+1)
}

module.exports = {idGenerate}