import express from 'express';
import { UserController } from '../../controllers';
import auth from '../../middleware/auth';
import validate from '../../middleware/validate';
import validation from '../../middleware/validation';
import { authValidation } from '../../validations';

const routes = express.Router();

routes.post('/login', validate(authValidation.login), UserController.loginUser);
routes.post('/current', auth(), UserController.currentUserLogin);
routes.post(
  '/register',
  validate(authValidation.registration),
  UserController.registerUser
);
routes.post("/resetPassword", validation(authValidation.emailVerification), UserController.resetPassword);
routes.post("/verify-email/:email", UserController.emailVerification);
routes.post("/updatePassword/:token", validation(authValidation.updatePassword), UserController.updatePassword);

export default routes;
