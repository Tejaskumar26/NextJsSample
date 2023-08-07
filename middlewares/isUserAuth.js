import db from '../models'
const jwt = require('jsonwebtoken')

const userAuth = (handler) => {
    return async (req, res) => {
        const authHeader = req.headers['access-token']
        if (!authHeader) {
            res.status(401).json({
                message: 'Token Not Found'
            })
        }
        let decodedToken;
        try {
            decodedToken = jwt.verify(authHeader, process.env.JWT_SECRET,)
        } catch (err) {
            err.statusCode = 401
            console.log(err)
            res.status(401).json({
                status: false,
                message: err.message,
            })
        }
        if (!decodedToken) {
            res.status(401).json({
                message: 'not authenticated'
            })
        }
        req.token = decodedToken
        const user = await db.users.findOne({ where: { id: req.token.id } })
        if (!user) {
            res.status(401).json({
                message: 'User not found!'
            })
        }
        return handler(req, res)
    }
}
export default userAuth