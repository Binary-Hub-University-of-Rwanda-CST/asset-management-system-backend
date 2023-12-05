import express from "express";
import dotenv from "dotenv";
import passport from './services/passport-config';
import allRouter from "./routes";
import { PrismaClient } from "@prisma/client";

const cors = require('cors');

dotenv.config();
const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;

const connectDB = async () => {
  await prisma.$connect();
  console.log("DB Connected Successfull......");
};

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', allRouter);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

startServer();