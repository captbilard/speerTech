import { Prisma } from '@prisma/client';
import prisma from '../../prisma/db';

export const getAllTweet = async () => {
  try {
    const tweets = await prisma.tweet.findMany();
    return { data: tweets };
  } catch (e) {
    throw e;
  }
};

export const getOneTweet = async (tweetId) => {
  try {
    const tweet = await prisma.tweet.findUnique({
      where: {
        id: tweetId
      }
    });
    return { data: tweet };
  } catch (e) {
    throw e;
  }
};

export const createTweet = async (payload) => {
  try {
    const { message, userId } = payload;
    const tweet = await prisma.tweet.create({
      data: {
        message,
        userId
      }
    });
    return { data: tweet };
  } catch (e) {
    throw e;
  }
};

export const updateTweet = async (payload) => {
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
    return { data: updatedTweet };
  } catch (e) {
    throw e;
  }
};

export const deleteTweet = async (payload) => {
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
    return { data: deletedTweet.id };
  } catch (e) {
    throw e;
  }
};
