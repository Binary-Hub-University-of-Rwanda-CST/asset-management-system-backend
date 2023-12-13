import express from "express";
import { loginUser, currentUserLogin } from "../../controllers/login";
import loginValdation from "../../validations/loginValidation";
import registValdation from "../../validations/registValidation";
import { registUser } from "../../controllers/registUser";

const routes = express.Router();

routes.post("/login", loginValdation, loginUser);
routes.post("/session/login", currentUserLogin);
routes.post("/regist", registValdation, registUser);

export default routes;