import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const userSchema = Joi.object({
  names: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  gender: Joi.string().required(),
  nid: Joi.string().required(),
  martial_status: Joi.string().required(),
  nationality: Joi.string().required(),
  img: Joi.string().allow(null),
  password: Joi.string().min(6).required(),
  code: Joi.string().allow(null),
});

const registValdation = async (req:Request, res:Response, next:NextFunction) => {
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: `Invalid User Data! ${error.details[0].message}`
      });
    }
    next();
  };
  export default registValdation;