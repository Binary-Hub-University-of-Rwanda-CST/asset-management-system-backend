import express, { Request, Response } from 'express';
import Joi from 'joi';
import changePassword from '../services/changePassword'

const router = express.Router();

// Middleware for parsing JSON in the request body
router.use(express.json());

// Define the Joi schema for the change password request body
const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
  userEmail: Joi.string().email().required(),
});

// Change password endpoint
router.post('/change-password', async (req: Request, res: Response) => {
  // Validate request body against the schema
  const { error, value } = changePasswordSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  if(await changePassword(value.userEmail ,value.newPassword))
  {
      res.json({ message: 'Password changed successfully' });
  }
  else
  {
    res.json({ message: 'Password not Changed' });
  }
});

export default router;