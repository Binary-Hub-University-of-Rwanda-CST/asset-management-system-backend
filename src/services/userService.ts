import { User } from '@prisma/client';
import prisma from '../client';
import { encryptPassword } from '../utils/encryption';

const registerUser = async (userData: User): Promise<User> => {
  const createdUser = await prisma.user.create({
    data: {
      names: userData.names,
      phone: userData.phone,
      email: userData.email,
      gender: userData.gender,
      nid: userData.nid,
      martial_status: userData.martial_status,
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

function storeResetToken(user: User, token: string): void {
  const tokenUserEmail = user.email;
  prisma.resetPasswordTokens.create({
    data: {
      token,
      tokenUserEmail,
    },
  });
}

export default {
  registerUser,
  changePassword,
  findUserByEmail,
  storeResetToken,
};
