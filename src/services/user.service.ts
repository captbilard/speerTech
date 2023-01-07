import { Prisma } from '@prisma/client';
import prisma from '../../prisma/db';
import { comparePassword, createJWT, hashPassword } from '../utils/authUtils';

export const create = async (username, password) => {
  try {
    const hash = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hash
      }
    });

    const token = createJWT(newUser);
    return { token };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        e.message = 'Username already exist';
      }
    }
    throw e;
  }
};

export const signIn = async (username, password) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    });
    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      throw new Error('Invalid Username or Password');
    }

    const token = createJWT(user);
    return { token };
  } catch (e) {
    throw e;
  }
};
