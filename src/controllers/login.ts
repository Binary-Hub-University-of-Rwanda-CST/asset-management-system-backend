import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { generateToken } from "../services/generateToken";
import verifyToken from "../services/verifyToken";

const prisma = new PrismaClient();

interface jwtPayload {
  id: number
  email: string
}

const userData = {

}

export const loginUser = async (req: Request, res: Response) => {

  try {

    const { email, password } = req.body;

    const existUser = await prisma.user.findFirst({ where: { email: email } });
    if (!existUser) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, existUser.password);

    if (!passwordCompare) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = generateToken(existUser);

    res.status(200).json({ message: "Login Successful", token, user: userData });

  }
  catch (error)
  {
    return res.status(500).json({ "msg": error});
  }
};

export const currentUserLogin = async (req: Request, res: Response) => {

  try {

    const { password } = req.body;
    const oldToken = req.header("Authorization") as string;
    const isUserLogin = verifyToken(oldToken.split(' ')[1]) as jwtPayload;

    const existUser = await prisma.user.findFirst({ where: { email: isUserLogin.email } });

    if (existUser !== null) {

      const passwordCompare = await bcrypt.compare(password, existUser.password);

      if (!passwordCompare) {
        return res.status(401).json({ message: "Invalid Password" });
      }

      const token = generateToken(existUser);

      res.status(200).json({ message: "Welcome back", token });

    } else {
      res.status(400).json({ message: "User not found" });
    }

  } catch (error) {
    return res.status(500).json({ error });
  }
};