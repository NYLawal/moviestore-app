import {Router} from "express"
import MovieController from "../controllers/movie-controller.js"
import { tryCatchHandler } from "../utils/try-catch-handler.js"

const router = Router()

router.post("/create",  tryCatchHandler( MovieController.createMovie))

router.put("/update", tryCatchHandler( MovieController.updateMovie))

router.get("/one", tryCatchHandler( MovieController.getOneMovie))

router.get("/allby", tryCatchHandler( MovieController.getMoviesByField))

router.get("/all", tryCatchHandler( MovieController.getAllMovies))

router.delete("/delete", tryCatchHandler( MovieController.deleteAMovie))

export {router}