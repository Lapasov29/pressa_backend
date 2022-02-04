import {Router} from "express"
import {controllers} from "../controller/eventsController.js"
import validate from "../middlewares/validation.js"
import checkToken from "../middlewares/checkToken.js"

const router = Router()

router.get('/', controllers.GET)
router.get('/:id', controllers.GET)
router.post('/', validate,  controllers.POST)
router.put('/', controllers.PUT)
router.put('/admin', checkToken,  controllers.PUT)

export default router