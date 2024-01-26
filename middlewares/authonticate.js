let jwt = require('jsonwebtoken')


isAuthonticat = (req, res, next) => {
        if ( ! jwt.verify(req.cookies.token, '123')) {
            res({message:"not authonticate"})
        }
        next()
    }

module.exports = {isAuthonticat}
    


