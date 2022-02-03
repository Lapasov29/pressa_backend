import {Router} from "express"
import {controllers} from "../controller/eventsController.js"
import checkToken from "../middlewares/checkToken.js"

const adminRouter = Router()
adminRouter.get('/', controllers.GET)
adminRouter.put('/', checkToken, controllers.PUT)

export default adminRouter