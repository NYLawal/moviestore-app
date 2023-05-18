import dotenv from 'dotenv'
import User from "../models/user-model.js"
import { createUserValidator, loginUserValidator } from "../validators/user-validator.js"
import { BadUserRequestError, NotFoundError } from "../utils/errors.js"
import { mongoIdValidator } from "../validators/mongoId-validator.js"
import {generateToken} from "../utils/jwt-utils.js"
import bcrypt from "bcrypt"

dotenv.config()

export default class UserController {
  
      static async createUser(req, res) {
      // Joi validation
      const { error, value } = createUserValidator.validate(req.body)
      if (error) throw error
      const emailExists = await User.find({ email: req.body.email })
      if (emailExists.length > 0) throw new BadUserRequestError("An account with this email already exists.")
      const usernameExists = await User.find({ username: req.body.username })
      if (usernameExists.length > 0) throw new BadUserRequestError("An account with this username already exists.")
      const saltRounds = Number(process.env.BCRYPT_SALT_ROUND)
      const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
      }
      const newUser = await User.create(user)
      res.status(200).json({
        message: "User created successfully",
        status: "Success",
        data:{
          user: newUser,
          access_token: generateToken(newUser)
        }
      })
   }

  static async findUser(req, res,) {
    const { id } = req.query
    const { error } = mongoIdValidator.validate(req.query)
    if (error) throw new BadUserRequestError("Please pass in a valid mongoId")
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

  static async loginUser(req, res,) {
    const { error } = loginUserValidator.validate(req.body)
    if (error) throw error
    if (!req.body?.username && !req.body?.email) throw new BadUserRequestError("Username or email is required for login.")
    const user = await User.findOne({
      $or: [
        {
          email: req.body?.email,
        },{
          username: req.body?.username,
        }
      ]
    })
    if(!user) throw new BadUserRequestError("Username/email does not exist")
    const hash = bcrypt.compareSync(req.body.password, user.password)
    if(!hash) throw new BadUserRequestError("Incorrect login details, input the correct email and password")
    res.status(200).json({
      message: "User found successfully",
      status: "Success",
      data: {
        user,
        access_token: generateToken(user)
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
