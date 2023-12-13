import { User } from '../models/users.js';
import bcrypt from 'bcrypt';
import { FoundItems } from '../models/FoundItems.js'
import { LostItems } from '../models/LostItems.js'
import jwt from 'jsonwebtoken';

import { config } from 'dotenv'
config({
    path: "data/config.env"
});

const signup = (async (req, res) => {
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        console.log(err);
    }
    if (existingUser) {
        return res.status(400).json({ message: "User already exist! LogIn Instead" });
    }
    const hassedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        name, email, password: hassedPassword
    });
    try {
        await user.save();
    } catch (err) {
        console.log(err);
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: "35s" });
    res.cookie(String(user._id), token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly: true,
        sameSite: 'lax'
    });
    res.status(200).json({ message: "Successfully LogedIn", user: user, token });
});

const login = (async (req, res) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        console.log(err);
    }
    if (!existingUser) {
        return res.status(400).json({ message: "User not found. Signup Please" });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid Password" });
    }

    if (req.cookies[`${existingUser._id}`]) {
        req.cookies[`${existingUser._id}`] = "";
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT, { expiresIn: "35s" });
    res.cookie(String(existingUser._id), token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly: true,
        sameSite: 'lax'
    });
    return res.status(200).json({ message: "Successfully LogedIn", user: existingUser, token });
});

const verifyToken = async (req, res, next) => {
    const cookies = req.headers.cookie;
    if (!cookies) {
        return res.status(400).json({ message: "Couldn't find token" });
    }
    const token = cookies.split("=")[1];
    jwt.verify(String(token), process.env.JWT, (err, user) => {
        if (err) {
            return res.status(400).json({ message: "Invalid Token" });
        }
        req.id = user.id;
    });
    next();
};
const getUser = async (req, res, next) => {
    const userId = req.id;
    let user;
    try {
        user = await User.findById(userId, "-password");
    } catch (err) {
        return new Error(err);
    }
    if (!user) {
        return res.status(400).json({ message: "User not Found" });
    }
    return res.status(200).json({ user });
};
const refreshToken = async (req, res, next) => {
    const cookies = req.headers.cookie;
    if (!cookies) {
        return res.status(400).json({ message: "Couldn't find token" });
    }
    const prevToken = cookies.split("=")[1];
    jwt.verify(String(prevToken), process.env.JWT, (err, user) => {
        if (err) {
            return res.status(400).json({ message: "Authentification Failed" });
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";

        const token = jwt.sign({ id: user.id }, process.env.JWT, { expiresIn: "35s" });
        console.log('Regenerated Token\n', token);
        res.cookie(String(user.id), token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 30),
            httpOnly: true,
            sameSite: 'lax'
        });
        req.id = user.id;
    });
    next();
};
const logout = async (req, res) => {
    const cookies = req.headers.cookie;
    if (!cookies) {
        return res.status(400).json({ message: "Couldn't find token" });
    }
    const prevToken = cookies.split("=")[1];
    jwt.verify(String(prevToken), process.env.JWT, (err, user) => {
        if (err) {
            return res.status(400).json({ message: "Authentification Failed" });
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";
        return res.status(200).json({ message: "Successfully Logged Out...!" });
    });
};
/* userRoute.post('/Fupload', async (req, res) => {
    const bdy = req.body.myFile;
    try {
        const newImage = new FoundItems({
            myFile: bdy
        })
        newImage.save();
        res.status(201).json({ msg: "New image Uploaded...!" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
})
userRoute.post('/Lupload', async (req, res) => {
    const bdy = req.body.myFile;
    try {
        const newImage = new LostItems({
            myFile: bdy
        })
        newImage.save();
        res.status(201).json({ msg: "New image Uploaded...!" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}) */

export { signup, login, verifyToken, getUser, refreshToken, logout }