import { PrismaClient } from '@prisma/client';
import User from '../models/User';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const registerUser = async (userData: User): Promise<User> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

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
      password: hashedPassword,
      code: userData.code,
    },
  });

  return createdUser;
};
