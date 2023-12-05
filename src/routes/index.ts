import express from "express";
import  loginUser  from "./auth/loginRoute";

const router = express.Router();

router.use("/auth", loginUser);

export default router;