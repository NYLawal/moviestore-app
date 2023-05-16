import express  from "express";
import dotenv  from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import {globalErrorHandler} from "./src/utils/errorHandler.js"

// Importing Routes
import {router as userRouter} from "./src/routers/user-router.js"
import {router as movieRouter} from "./src/routers/movie-router.js"

const app = express()
dotenv.config()
mongoose.connect(process.env.MONGODB_CONNECTION_URL).then(()=> console.log("Database connection established")).catch(e=> console.log(e.message))
const port = Number(process.env.PORT) || 4000;

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