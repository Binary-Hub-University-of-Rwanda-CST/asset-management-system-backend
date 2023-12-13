import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { generateToken } from "../services/generateToken";
import verifyToken from "../services/verifyToken";
import { registerUser } from "../services/registUser";

const prisma = new PrismaClient();

interface jwtPayload {
  id: number
  email: string
}

export const registUser = async (req: Request, res: Response) => {

    try
    {
        const newUser = await registerUser(req.body);
        res.status(201).json(newUser);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send('Error registering user');
    }
};