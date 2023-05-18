import {Router} from "express"
import UserController from '../controllers/user-controller.js'
import { tryCatchHandler } from '../utils/try-catch-handler.js'

const router = Router()

router.post("/create", tryCatchHandler( UserController.createUser) )
router.get("/", tryCatchHandler( UserController.findUser) )
router.get("/all", tryCatchHandler( UserController.findAllUsers) )
router.post("/login", tryCatchHandler( UserController.loginUser) )


export { router }