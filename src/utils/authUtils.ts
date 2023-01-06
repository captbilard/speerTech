import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createJWT = (user) => {
  const { id, username } = user;
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET);

  return token;
};

export const comparePassword = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

export const authGuard = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).send('Authorization Error');
    return;
  }

  const [, token] = bearer.split(' ');
  if (!token) {
    req.status(401).send('Authorization Error');
    return;
  }

  // check the token sent
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send('Invalid Token');
    return;
  }
};
