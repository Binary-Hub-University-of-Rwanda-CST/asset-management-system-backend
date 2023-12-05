import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const loginValdation = async (req:Request, res:Response, next:NextFunction) => {
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message:"Invalid credentials"
      });
    }
    next();
  };
  export default loginValdation;