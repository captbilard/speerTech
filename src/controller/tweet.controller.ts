import {
  create,
  findAll,
  findOne,
  removeTweet,
  update
} from '../services/tweet.service';

export const getAllTweet = async (req, res, next) => {
  try {
    const response = await findAll();
    res.status(200).json({ data: response.tweets });
  } catch (e) {
    next(e);
  }
};

export const getOneTweet = async (req, res, next) => {
  try {
    const response = await findOne(req.params.id);
    if (response.tweet == null) {
      return res
        .status(404)
        .json({ message: `Tweet with id: ${req.params.id} not found` });
    }
    res.status(200).json({ data: response.tweet });
  } catch (e) {
    next(e);
  }
};

export const createTweet = async (req, res, next) => {
  try {
    const payload = {
      message: req.body.message,
      userId: req.user.id
    };
    const response = await create(payload);
    res.status(200).json({ data: response.tweet });
  } catch (e) {
    next(e);
  }
};

export const updateTweet = async (req, res, next) => {
  try {
    const payload = {
      message: req.body.message,
      userId: req.user.id,
      tweetId: req.params.id
    };
    const response = await update(payload);
    res.status(200).json({ data: response.updatedTweet });
  } catch (e) {
    next(e);
  }
};

export const deleteTweet = async (req, res, next) => {
  try {
    const payload = { tweetId: req.params.id, userId: req.user.id };
    const response = await removeTweet(payload);
    res.status(200).json({ data: response.deletedTweet.id });
  } catch (e) {
    next(e);
  }
};
