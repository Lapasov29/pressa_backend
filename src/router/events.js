import {Router} from "express"
import {controllers} from "../controller/eventsController.js"
import validate from "../middlewares/validation.js"

const router = Router()

router.get('/', controllers.GET)
router.get('/:id', controllers.GET)
router.post('/', validate,  controllers.POST)
router.put('/', controllers.PUT)

export default router