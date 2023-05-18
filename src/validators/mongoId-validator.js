import Joi from "joi"
import JoiMongoId from "joi-objectid"
Joi.myJoiObjectId = JoiMongoId(Joi)


export const mongoIdValidator = Joi.object({
  id: Joi.myJoiObjectId()
}).strict()