import {Router} from "express"
import MovieController from "../controllers/movie-controller.js"
import { tryCatchHandler } from "../utils/try-catch-handler.js"
import {userAuthMiddleWare} from "../middlewares/auth-middleware.js"

const router = Router()

router.post("/create", userAuthMiddleWare, tryCatchHandler( MovieController.createMovie))

router.put("/update", userAuthMiddleWare, tryCatchHandler( MovieController.updateMovie))

router.get("/one", userAuthMiddleWare, tryCatchHandler( MovieController.getOneMovie))

router.get("/allbyfield", userAuthMiddleWare, tryCatchHandler( MovieController.findMoviesByField))

router.get("/allbyuser", userAuthMiddleWare, tryCatchHandler( MovieController.findMoviesByUser))

router.get("/all", userAuthMiddleWare, tryCatchHandler( MovieController.getAllMovies))

router.delete("/delete", userAuthMiddleWare, tryCatchHandler( MovieController.deleteAMovie))

export {router}