import express from 'express'
import cors from 'cors'
import { signup, login, verifyToken, getUser, refreshToken, logout, deleteImages, addImages } from './routes/user.js'
import { connectDB } from './data/database.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { config } from 'dotenv'
config({
    path: "data/config.env"
});

connectDB();

import multer from 'multer'
const upload = multer({
    limits: {
        fieldSize: 18 * 1024 * 1024,
    },
});

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin:["http://localhost:3000"],
    method:["POST","GET"],
    credentials:true
}));
app.use(cookieParser());
app.get('/', async (req, res) => {
    res.send("Your API is Connected");
});
app.post('/login', login);
app.post('/signup', signup);
app.get('/getuser', verifyToken, getUser);
app.get('/refresh', refreshToken, verifyToken, getUser);
app.post('/logout', verifyToken, logout);
app.post('/deleteimage', deleteImages);
app.post('/addimage', upload.single('myFile'), verifyToken, addImages);
app.listen(process.env.PORT);
