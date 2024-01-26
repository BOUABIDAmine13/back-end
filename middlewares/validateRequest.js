
validateRequest = (req, next, schema) => {
    const options = {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: false
    }
    const { error, value } = schema.validate(req.body, options)
    if (error) {
        next('Validation error:' + error.details.map(x => x.message).join(', '))
    } else {
        req.body = value
        console.log("validation")
        console.log(req.body)
        next()
    }
}

module.exports = validateRequest