import {Router} from "express"
import {controllers} from "../controller/eventsController.js"

const router = Router()

router.get('/events', controllers.GET)
router.get('/events/:id', controllers.GET)

export default router