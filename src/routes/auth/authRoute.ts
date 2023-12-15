import express from 'express';
import { UserController } from '../../controllers';
import auth from '../../middleware/auth';
import validate from '../../middleware/validate';
import { authValidation } from '../../validations';

const routes = express.Router();

routes.post('/login', validate(authValidation.login), UserController.loginUser);
routes.post('/current', auth(), UserController.currentUserLogin);
routes.post(
  '/register',
  auth(),
  validate(authValidation.registration),
  UserController.registerUser
);
routes.post("/resetPassword", validate(authValidation.emailVerification), UserController.resetPassword);
routes.post("/verify-email/:email", UserController.emailVerification);
routes.post("/updatePassword/:token", validate(authValidation.updatePassword), UserController.updatePassword);

export default routes;
