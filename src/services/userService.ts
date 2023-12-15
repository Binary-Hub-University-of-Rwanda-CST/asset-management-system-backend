import prisma from '../client';
import * as nodemailer from 'nodemailer';
import { User } from '@prisma/client';
import { encryptPassword } from '../utils/encryption';

interface Token {
  id: number;
  token: string;
}

const registerUser = async (userData: User): Promise<User> => {
  const createdUser = await prisma.user.create({
    data: {
      names: userData.names,
      phone: userData.phone,
      email: userData.email,
      gender: userData.gender,
      nid: userData.nid,
      marital_status: userData.marital_status,
      nationality: userData.nationality,
      img: userData.img,
      password: await encryptPassword(userData.password),
      code: userData.code,
    },
  });
  return createdUser;
};
const changePassword = async (
  userEmail: string,
  newPassword: string
): Promise<boolean | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail, // Fix variable name here
    },
  });

  if (!user) {
    // User with the provided email doesn't exist
    return null;
  }

  // Update the user's password in the database
  await prisma.user.update({
    where: {
      email: userEmail,
    },
    data: {
      password: newPassword as string,
    },
  });

  // Password change successful
  return true;
};
const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
};

const findUserById = async (id: number): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

function storeResetToken(user: User, token: string): void {
  const tokenUserEmail = user.email;
  prisma.resetPasswordTokens.create({
    data: {
      token,
      tokenUserEmail,
    },
  });
}

const resetPassword = async (email: string): Promise<boolean> => {
  try {
    const existingUser = await findUserByEmail(email);
    const codeExist = await isCodeExist(email);
    if (!existingUser) {
      return false;
    }

    const resetCode: string = generateCode();

    if (codeExist) {
      await prisma.resetPasswordTokens.delete({
        where: {
          id: codeExist.id
        }
      })
      storeResetCode(existingUser, resetCode);
    } else {
      storeResetCode(existingUser, resetCode);
    }

    await sendResetEmail(existingUser.email, resetCode);
    return true;
  } catch (error: any) {
    console.error(`Error in resetPassword: ${error.message}`);
    return false;
  }
}

const storeResetCode = async (user: User, token: string): Promise<void> => {
  const tokenUserEmail = user.email
  const newPaswword = await prisma.resetPasswordTokens.create({
    data: {
      token,
      tokenUserEmail
    }
  })
}

const sendResetEmail = async (email: string, token: string): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Password Reset',
    html: `<p>Hi<br />
    Please enter the 6-digit code below on the email verification page:<h2> ${token} </h2> Remember, beware of scams and keep this one-time verification code confidential.<br />
    Thanks, </p>`,
  };

  await transporter.sendMail(mailOptions);
}

const generateCode = (): string => {
  let verifCode = '';
  for (let i = 0; i < 6; i++) {
    const randomNumber = Math.floor(Math.random() * 10);
    verifCode += String(randomNumber);
  }
  return verifCode;
  ;
}

const findUserCode = async (email: string, code: string): Promise<Token | null> => {
  try {
    const useCode = await prisma.resetPasswordTokens.findFirst({
      where: {
        tokenUserEmail: email,
      },
    });

    if (useCode?.token === code)
      return useCode;
    else
      return null;

  }
  catch (error: any) {
    console.error(`token not found: ${error.message}`);
    return null;
  }
};

const isCodeExist = async (email: string): Promise<Token | null> => {
  try {
    const useCode = await prisma.resetPasswordTokens.findFirst({
      where: {
        tokenUserEmail: email,
      },
    });

    if (useCode)
      return useCode;
    else
      return null;

  }
  catch (error: any) {
    console.error(` Server Error: ${error.message}`);
    return null;
  }
};

export default {
  registerUser,
  changePassword,
  findUserByEmail,
  findUserById,
  storeResetToken,
  findUserCode,
  resetPassword
};
