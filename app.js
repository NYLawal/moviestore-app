import express  from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import {globalErrorHandler} from "./src/utils/errorHandler.js"
import {config} from "./src/config/index.js"

// Importing Routes
import {router as userRouter} from "./src/routers/user-router.js"
import {router as movieRouter} from "./src/routers/movie-router.js"

const app = express()
mongoose.connect(config.mongodb_connection_url).then(()=> console.log("Database connection established")).catch(e=> console.log(e.message))
const port = Number(config.port) || 4000;

// Defining Middlewares
app.use(morgan('tiny'))
app.use(express.json())

// Defining Routes 
app.use('/api/v1/user', userRouter)
app.use('/api/v1/movie', movieRouter)

app.use(globalErrorHandler)

// Setting up the express server
app.listen(port, ()=>{
  console.log(`Server running on port: ${port}`)
})