import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import routes from './routes/index';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB.authenticate();

app.use('/api', routes);

// Handle 404
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Not Found' });
});

export default app;
