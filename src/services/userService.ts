import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUser(email: string, name: string, password: string) {
  return prisma.user.create({
    data: {
      email,
      name,
      password
    },
  });
}

async function getAllUsers() {
  return prisma.user.findMany();
}

// Remember to close the Prisma Client when done.
// afterAll(() => {
//   prisma.$disconnect();
// });

export { createUser, getAllUsers };