import {auth} from "../controller/auth.js"
import {Router} from "express"

const authRouter = Router()

authRouter.post('/login', auth.LOGIN)

export default authRouter