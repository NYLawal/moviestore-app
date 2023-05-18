import {createMovieValidator, updateMovieValidator} from "../validators/movie-validator.js"
import Movie from "../models/movie-model.js"
import User from "../models/user-model.js"
import { BadUserRequestError, NotFoundError, AccessDeniedError } from "../utils/errors.js"
import { mongoIdValidator } from "../validators/mongoId-validator.js"

export default class MovieController {
  
  static async createMovie(req, res,){
    const { error } = createMovieValidator.validate(req.body)
    if(error) throw error
    const newMovie = await Movie.create({...req.body, creator: req.user._id})
    res.status(201).json({
    message: "Movie created successfully",
    status: "Success",
    data:{
      movie: newMovie
    }
  })
}

  static async updateMovie(req, res){
    const { title } = req.query
    const updateValidatorResponse = await updateMovieValidator.validate(req.body)
    const updateMovieError = updateValidatorResponse.error
    if(updateMovieError) throw updateMovieError

    const movie = await Movie.findOne({title: title})
    if(!movie) throw new NotFoundError(`The movie with this title: ${title}, does not exist`)

    const updateMovie = await Movie.findOneAndUpdate({title: title}, {description: req.body.description}, {new: true})
    return res.status(200).json({
      message: "Movie updated successfully",
      status: "Success",
      data:{
        movie: updateMovie
      }
    })
  }

  static async getOneMovie(req, res) {
    const { title } = req.query
    const movie = await Movie.findOne({title: title})
    if(!movie) throw new NotFoundError(`The movie with this title: ${title}, does not exist`)

    return res.status(200).json({
      message: "Movie found!",
      status: "Success",
      data: {
        movie: movie
      }
    })
  }

    static async findMoviesByField(req, res) {
    const  search_key = (Object.keys(req.query))[0] 
    const search_value = (Object.values(req.query))[0]
    const queryObj = {}
    queryObj[search_key] = search_value
    console.log(queryObj)
    const movies = await Movie.find(queryObj)
    if( movies.length < 1) throw new NotFoundError(`No movie with the ${search_key} ${search_value} exists`)

    return res.status(200).json({
      message: "Movies found!",
      status: "Success",
      data: {
        movies,
      }
    })
  }

  static async getAllMovies(req, res,) {
    const movies = await Movie.find()
    if (!movies) throw new NotFoundError('No movies found')
      res.status(200).json({
      message: movies.length < 1 ? " No movies found" :  "Movies found",
      status: "Success",
      data: {
        movies,
      }
    })
  }

  static async findMoviesByUser(req, res) {
        const id = req.user._id
        const { error } = mongoIdValidator.validate(req.query)
        if( error ) throw new BadUserRequestError("Please pass in a valid mongoId")
    
        const user = await User.findById(id)
        if(!user) throw new NotFoundError(`The user with this id: ${id}, does not exist`)
    
        const movies =  await Movie.find({ creator: id }).populate("creator")
    
        return res.status(200).json({
          message: movies.length < 1 ? " No movies not found" :  "Movies found",
          status: "Success",
          data: {
            movies,
          }
        })
      }


  static async deleteAMovie(req, res) {
    const { id } = req.query
    const { error } = mongoIdValidator.validate(req.query)
    if( error ) throw new BadUserRequestError("Please pass in a valid mongoId")

    const movie = await Movie.findById(id)
    if(!movie) throw new NotFoundError(`The movie with this id: ${id}, does not exist`)
    
    if(req.user._id != movie.creator) throw new AccessDeniedError(`Access Denied!!, You do not have the permission to delete this movie`)
    
    await Movie.findByIdAndUpdate(id, {
      isDeleted: true
    })
   
    return res.status(200).json({
      message: "Movie deleted successfully",
      status: "Success",
    })
  }

}