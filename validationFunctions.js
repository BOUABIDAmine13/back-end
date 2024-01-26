let email_regExpr = /^[a-zA-Z0-9._%+-]+@[a-z]+(mail)\.(com|net|gov)$/
let password_regExpr = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

email_valide = (email) => {
    if (email_regExpr.test(email))
        return true
    return false
}

password_valide = (password) => {
    if(password_regExpr.test(password))
        return true
    return false
}

idGenerated = (parames) => {
    return parames._idClinic+parames.birthdayChild.split('-').join("")+parames.birthCertafictId;
}

module.exports = {email_valide, password_valide, idGenerated}