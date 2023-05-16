import User from "../models/user-model.js"
import { createUserValidator } from "../validators/user-validator.js"
import { NotFoundError } from "../utils/errors.js"

export default class UserController {

  static async createUser(req, res, next ) {
    // Joi validation
    const {error, value} = createUserValidator.validate(req.body)
    if(error){
      console.log(error.details)
      const err = new Error(error.details[0].message)
      err.status = 400
      err.message = error.details[0].message
      return next(err)
    }
      const newUser = await User.create(req.body)
      res.status(200).json({
        message: "User created successfully",
        status: "Success",
        data:{
          user: newUser
        }
      })
   }

  static async findUser(req, res,) {
    const { id } = req.query
    const user = await User.findById(id)
    if (!user) throw new NotFoundError('User not found')

    res.status(200).json({
      message: "User found successfully",
      status: "Success",
      data: {
        user
      }
    })
  }

  static async findAllUsers(req, res,) {
    const users = await User.find()
    if (!users) throw new NotFoundError('No users found')
      res.status(200).json({
      message: "Users found",
      status: "Success",
      users
      
    })
  }

}
