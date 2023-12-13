import { Request, Response } from 'express';
import { TokenService, UserService } from '../services';
import catchAsync from '../utils/catchAsync';
import prisma from '../client';
import httpStatus from 'http-status';
import { isPasswordMatch } from '../utils/encryption';
import { User } from '@prisma/client';
import exclude from '../utils/exclude';

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

export default { loginUser, currentUserLogin, registerUser };
