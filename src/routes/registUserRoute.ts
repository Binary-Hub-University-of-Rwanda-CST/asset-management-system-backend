import express from 'express';
import Joi from 'joi';
import User from '../models/User';
import { registerUser } from '../services/registUser';

const registUserRoute = express.Router();

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

registUserRoute.post('/register', async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) 
    {
        return res.status(401).json({message: `Invalid user details: ${error.details[0].message}`});
    }

    try {
        const newUser = await registerUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

export default registUserRoute;