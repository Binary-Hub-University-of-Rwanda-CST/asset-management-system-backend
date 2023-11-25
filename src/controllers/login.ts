import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { generateToken } from "../services/generateToken";

const prisma = new PrismaClient();


export const LoginUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: "Invalid Inputs" });
      }
  
      const existUser = await prisma.user.findFirst({ where: { email: email } });
      if (!existUser) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }
  
      const passwordExist = await bcrypt.compare(password, existUser.password);
      if (!passwordExist) {
        return res.status(401).json({ message: "Invalid Password" });
      }
  
      const token = generateToken(existUser);
  
      res.status(200).json({ message: "Login Successful", token });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };