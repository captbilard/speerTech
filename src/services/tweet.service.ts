import prisma from '../../prisma/db';
import { Prisma } from '@prisma/client';

export const findAll = async () => {
  try {
    const tweets = await prisma.tweet.findMany();
    return { tweets };
  } catch (e) {
    throw e;
  }
};

export const findOne = async (tweetId) => {
  try {
    const tweet = await prisma.tweet.findUnique({
      where: {
        id: tweetId
      }
    });
    return { tweet };
  } catch (e) {
    throw e;
  }
};

export const create = async (payload) => {
  try {
    const { message, userId } = payload;
    const tweet = await prisma.tweet.create({
      data: {
        message,
        userId
      }
    });
    return { tweet };
  } catch (e) {
    throw e;
  }
};

export const update = async (payload) => {
  try {
    const { message, userId, tweetId } = payload;
    const updatedTweet = await prisma.tweet.update({
      where: {
        id_userId: {
          id: tweetId,
          userId
        }
      },
      data: {
        message
      }
    });
    return { updatedTweet };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2025') {
        e.message = 'record not found';
      }
    }
    throw e;
  }
};

export const removeTweet = async (payload) => {
  try {
    const { tweetId, userId } = payload;
    const deletedTweet = await prisma.tweet.delete({
      where: {
        id_userId: {
          id: tweetId,
          userId
        }
      }
    });
    return { deletedTweet };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2025') {
        e.message = 'Record does not exist';
      }
    }
    throw e;
    throw e;
  }
};
