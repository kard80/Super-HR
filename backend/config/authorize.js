const jwt = require('jsonwebtoken')

const auth = ((req, res, next) => {
    const auth = req.headers['authorization']
    const privateKey = 'myPersonalProject'
    if(auth === undefined) return res.status(401).json({
        "status": 401,
        "message": "Do not have headers"
    })

    const token = req.headers['authorization'].split('.')[1]
    if(token === undefined) return res.status(401).json({
        "status": 401,
        "message": "token is invalid"
    })

    jwt.verify(token, privateKey, function(error, decoded) {
        if(error) return res.status(401).json({
            "status": 401,
            "message": 'Unauthorize'
        })

        console.log(error)
        console.log(decoded)

        if(decoded.role === undefined || decoded.role !== 'admin') return res.status(403).json({
            "status": 403,
            "message": "Forbidden"
        })
        next()
    })
})

module.exports = auth