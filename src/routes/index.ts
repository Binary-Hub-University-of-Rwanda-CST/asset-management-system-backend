import express from "express";
import  loginUser  from "./auth/authRoute";

const router = express.Router();

router.use("/auth", loginUser);

export default router;