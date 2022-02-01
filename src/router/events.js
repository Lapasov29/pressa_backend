import {Router} from "express"
import {controllers} from "../controller/eventsController.js"
import validate from "../middlewares/validation.js"

const router = Router()

router.get('/events', controllers.GET)
router.get('/events/:id', controllers.GET)
router.post('/events', validate,  controllers.POST)
router.put('/events', controllers.PUT)

export default router