import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './router/router';
import { validate } from './middleware/validation';
import { createUser, loginUser } from './controller/user.controller';
import { authGuard } from './utils/authUtils';
import { body } from 'express-validator';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello from server' });
});

app.use('/api/v1', authGuard, router);
app.post(
  '/user',
  [body('username').exists(), body('password').exists()],
  validate,
  createUser
);
app.post(
  '/login',
  [body('username').exists(), body('password').exists()],
  validate,
  loginUser
);

app.use((err, req, res, next) => {
  if (err.type == 'auth') {
    res.status(401).json({ message: 'Invalid Username or Password' });
  } else if (err.type == 'input') {
    res.status(400).json({ message: `Bad Request, ${err.message}` });
  } else {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default app;
