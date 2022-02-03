import sha256 from 'sha256'
import jwt from 'jsonwebtoken'

const LOGIN = (req, res) => {
    try {
        const { username, password } = req.body
        const data = req.select('stuff')
        if(!(username == data[0].username && sha256(password) == data[0].password)) {
            throw new errors.ClientError(404, "Invalid username or password!")
        }
        const id = data[0].admin_id
        res.json({
            status: 201,
            message: "The admin sucsesfully login",
            token: jwt.sign({ id,  agent: req.headers['user-agent'] }, 'PRESSA-KEY')
        })
    } catch (error) {
        return next(error)
    }
    
}

export const auth = {
    LOGIN
}