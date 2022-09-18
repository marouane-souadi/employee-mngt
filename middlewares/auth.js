const jwt = require("jsonwebtoken");
const config = require("../config");

exports.loginRequired = (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, config.SECRET_KEY, (err, decoded)=>{
            if (decoded) {
                console.log(decoded)
                req.userId = decoded.id
                // TODO: Add expire and check TTL
                next()
            } else {
                next({
                    status : 401,
                    message : "Please login first"
                })
            }
        })
    } catch(e) {
        next({
            status : 401,
            message : "Please login first"
        })
    }
}