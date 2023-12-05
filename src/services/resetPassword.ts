import { PrismaClient } from '@prisma/client';
import * as nodemailer from 'nodemailer';
require('dotenv').config();

const prisma = new PrismaClient();

interface User {
  email: string;
}

async function resetPassword(user: User): Promise<boolean> {
  try {
    const existingUser = await findUserByEmail(user.email);

    if (!existingUser) {
      // User with the provided email doesn't exist
      return false;
    }

    // Generate a reset token
    const resetToken: string = generateToken();

    // Simulate storing the reset token in the user's record in the database
    // Replace this with your actual logic to store the reset token
    storeResetToken(existingUser, resetToken);

    // Send the reset email
    await sendResetEmail(existingUser.email, resetToken);

    // Password reset initiated successfully
    return true;
  } catch (error: any) {
    console.error(`Error in resetPassword: ${error.message}`);
    return false;
  }
}

const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user || null;
  }
  catch (error : any) {
    console.error(`Error in findUserByEmail: ${error.message}`);
    return null;
  }
};

function storeResetToken(user: User, token: string): void {
  const tokenUserEmail = user.email
  prisma.resetPasswordTokens.create({
    data: {
      token,
      tokenUserEmail
    }
  })
}

async function sendResetEmail(email: string, token: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // replace with your email
      pass: process.env.EMAIL_PASSWORD, // replace with your email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Password Reset',
    text: `You requested a password reset. Click the link to reset your password: http://your-app.com/reset-password/${token}`,
  };

  await transporter.sendMail(mailOptions);
}

function generateToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export default resetPassword;
