import Joi from "joi"
import JoiMongoId from "joi-objectid"
const myJoiObjectId = JoiMongoId(Joi)

//Joi.objectId = require('joi-objectid')

export const createMovieValidator = Joi.object({
  creator: myJoiObjectId().required(),
  title: Joi.string().required(),
  genre: Joi.string().required(),
  description: Joi.string().max(255),
  language: Joi.string().max(10),
  release_year: Joi.number().integer().min(4),
 // dateCreated: Joi.date(),
  }).strict()


export const updateMovieValidator = Joi.object({
  description: Joi.string().optional().max(255),
  }).strict()