import Joi from 'joi'

export const createUserValidator = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  .required()
  .messages({
    'string.pattern.base': 'Not a valid format for an email address',
  }),
  password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/)
  .required()
  .messages({
    'string.pattern.base': 'Password must have at least 8 characters and must include a number, an alphanumeric and an uppercase letter',
  }),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
}).strict()


export const loginUserValidator = Joi.object({
  username:Joi.string().optional(),
  email:Joi.string().optional(),
  password: Joi.string().required()
}).strict()
