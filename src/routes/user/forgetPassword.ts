import express, { Request, Response } from 'express';
import Joi from 'joi';
import resetPassword from '../../services/resetPassword'

const router = express.Router();

interface User {
  email: string;
}

// Middleware for parsing JSON in the request body
router.use(express.json());

// Define the Joi schema for the forgot password request body
const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

// Forgot password endpoint
router.post('/forgot-password', async (req: Request, res: Response) => {
  // Validate request body against the schema
  const { error, value } = forgotPasswordSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const user: User = 
  {
    email: value
  }
  if(await resetPassword(user))
  {
    res.status(200).json({message: "Reset password has been sent to " + user.email})
  }

});

export default router;