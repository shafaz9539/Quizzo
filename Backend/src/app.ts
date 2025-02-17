import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import quizRoutes from './routes/quizRoutes';
import { connnectToDatabase } from './config/database';

const app = express();
dotenv.config();

connnectToDatabase(); 

app.use(cors({
    credentials: true,
}));

app.use(express.json());
app.use('/auth/api/v1', authRoutes);
app.use('/auth/api/v1', quizRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});