import { Router } from 'express';
import {
  createTweet,
  deleteTweet,
  getAllTweet,
  getOneTweet,
  updateTweet
} from '../controller/tweet.controller';
import { body } from 'express-validator';
import { validate } from '../middleware/validation';

const router = Router();

// Read Tweet
router.get('/tweet', getAllTweet);
router.get('/tweet/:id', getOneTweet);

// Create Tweet
router.post('/tweet', body('message').exists(), validate, createTweet);

// Update Tweet
router.put('/tweet/:id', body('message').exists(), validate, updateTweet);

// Delete Tweet
router.delete('/tweet/:id', deleteTweet);

export default router;
