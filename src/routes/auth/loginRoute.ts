import express from "express";
import { loginUser, currentUserLogin } from "../../controllers/login";
import loginValdation from "../../validations/loginValidation";

const routes = express.Router();

routes.post("/login", loginValdation, loginUser);
routes.post("/session/login", currentUserLogin);

export default routes;