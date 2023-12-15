import { Request, Response } from 'express';
import { TokenService, UserService } from '../services';
import catchAsync from '../utils/catchAsync';
import prisma from '../client';
import httpStatus from 'http-status';
import { isPasswordMatch } from '../utils/encryption';
import { User } from '@prisma/client';
import exclude from '../utils/exclude';
import { encryptPassword } from '../utils/encryption';
import { TokenType } from '@prisma/client';

export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const existUser = await prisma.user.findFirst({
    where: { email: req.body.email },
  });

  if (!existUser) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: 'Invalid Credentials' });
  }

  if (!(await isPasswordMatch(req.body.password, existUser.password))) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: 'Invalid Credentials' });
  }
  const accessToken = await TokenService.generateAuthTokens(existUser);

  res.status(200).json({
    message: 'Login Successful',
    token: accessToken,
    user: exclude(existUser, ['password', 'createdAt', 'updatedAt']),
  });
});

export const currentUserLogin = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user as User;

    const existUser = await prisma.user.findFirst({
      where: { id: user.id },
    });

    res.status(200).json({
      message: 'Welcome back',
      data: existUser
        ? exclude(existUser, ['password', 'createdAt', 'updatedAt'])
        : null,
    });
  }
);
export const registerUser = catchAsync(async (req: Request, res: Response) => {
  res.status(201).json(await UserService.registerUser(req.body));
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {

  try {
    const email = req.body.email;
    if (await UserService.resetPassword(email)) {
      res.status(200).json({ message: "Reset password email has been sent to " + email })
    } else
    res.status(400).json({ message: `Email ${email} was not found` })
  } catch (error) {
    res.status(500).json({ message: "Server Error", error })
  }

});

const emailVerification = catchAsync(async (req: Request, res: Response) => {

  try {
    const userEmail = req.params.email;
    const { userCode } = req.body;
    const token = await UserService.findUserCode(userEmail, userCode);
    const tokenId = await prisma.resetPasswordTokens.findFirst({
      where: {
        tokenUserEmail: userEmail,
      }
    })

    if (token) {
      const resetPassToken = await TokenService.generateResetPasswordToken(userEmail);
      res.status(200).json({ message: "Email verification is successful, please update your password", token: resetPassToken });
      await prisma.resetPasswordTokens.delete({
        where: {
          id: tokenId?.id
        }
      })
    } else
      res.status(401).json({ message: "Unauthorized" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
});

const updatePassword = catchAsync(async (req: Request, res: Response) => {

  try {

    const token = req.params.token;
    const userData = TokenService.verifyToken(token, TokenType.RESET_PASSWORD);
    const user = await UserService.findUserById((await userData).userId)
    const { newPassword } = req.body;
    const hashedPassword = await encryptPassword(newPassword);
    const isPasswordChanged = (user?.email) ? await UserService.changePassword(user?.email, hashedPassword) : false;
    if (isPasswordChanged) {
      res.status(200).json({ message: 'Password changed successfully' });
    }
    else {
      console.log(userData);

      res.status(400).json({ message: 'Password not Changed' });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
});




export default { loginUser, currentUserLogin, registerUser, resetPassword, emailVerification, updatePassword };
