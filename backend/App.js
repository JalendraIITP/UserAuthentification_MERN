import express from 'express'
import cors from 'cors'
import { signup, login, verifyToken, getUser, refreshToken, logout } from './routes/user.js'
import { connectDB } from './data/database.js';
import cookieParser from 'cookie-parser';

import { config } from 'dotenv'
config({
    path: "data/config.env"
});

connectDB();

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());

app.post('/login', login);
app.post('/signup', signup);
app.get('/welcome', verifyToken, getUser);
app.get('/refresh', refreshToken, verifyToken, getUser);
app.post('/logout', verifyToken, logout);

app.listen(process.env.PORT, () => {
    console.log("Server is working");
});