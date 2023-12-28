import express from 'express';
import { UserController } from '../../controllers';
import auth from '../../middleware/auth';
import validation from '../../middleware/validation';
import { authValidation } from '../../validations';

const routes = express.Router();

routes.post('/login', validation(authValidation.login), UserController.loginUser);
routes.post('/current', auth(), UserController.currentUserLogin);
routes.post('/register', validation(authValidation.registration), UserController.registerUser);
routes.post("/resetPassword", validation(authValidation.emailVerification), UserController.resetPassword);
routes.post("/verify-email/:email", UserController.emailVerification);
routes.post("/updatePassword/:token", validation(authValidation.updatePassword), UserController.updatePassword);

export default routes;
