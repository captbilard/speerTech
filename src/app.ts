import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello from server' });
});

export default app;
