import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function changePassword(userEmail: string, newPassword: string): Promise<boolean | null> {
  try {
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
        password: newPassword as string
      },
    });

    // Password change successful
    return true;
  } catch (error: any) {
    console.error(`Error in changePassword: ${error.message}`);
    return false; // or handle the error accordingly
  }
}

export default changePassword;