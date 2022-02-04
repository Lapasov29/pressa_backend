import jwt from 'jsonwebtoken'
import errors from '../utils/error.js'

// token checking
const checkToken = (req, res, next) => {
	try {
        const { token } = req.headers

		if(!token) {
            throw new errors.ClientError(401, "user is not authorized!")
		}

        const { id, agent } = jwt.verify(req.headers.token, 'PRESSA-KEY')
		if(req['headers']['user-agent'] !== agent) {
			throw new errors.ClientError(401, "The token is sent from wrong device!")
		}

        const stuff = req.select('stuff')
		let admin = stuff.find(s => s.admin_id == id)

		if(!admin) {
			throw new errors.ClientError(401, "The token is invalid!")
		}

		return next()
	} catch(error) {
		error.status = 401
		return next(error)
	}
}

export default checkToken