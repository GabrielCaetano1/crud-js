import express from 'express';
import dotenv from 'dotenv';
import userRoute from './app/routes/userRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/user', userRoute);

const PORTA = process.env.PORTA

app.listen(PORTA, () => {
    console.log('O servidor está rodando na porta: http://localhost:3000');
});