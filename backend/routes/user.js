import { User } from '../models/users.js';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import { config } from 'dotenv'
config({
    path: "data/config.env"
});

const signup = (async (req, res) => {
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email }, "-password");
    } catch (err) {
        console.log(err);
    }
    if (existingUser) {
        return res.status(202).json({ message: "User already exist! LogIn Instead" });
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
    const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: "70s" });
    res.cookie(String(user._id), token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 50),
        httpOnly: true,
        sameSite: 'none',
        secure: true
    });
    res.status(200).json({ message: "Successfully SignUp", user: user });
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
        return res.status(201).json({ message: "User not found. Signup Please" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(201).json({ message: "Invalid Password" });
    }

    if (req.cookies[`${existingUser._id}`]) {
        res.clearCookie(`${existingUser._id}`);
        res.cookie(`${existingUser._id}`, "", { maxAge: 0 });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT, { expiresIn: "70s" });
    res.cookie(String(existingUser._id), token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 50),
        httpOnly: true,
        sameSite: 'none',
        secure: true
    });
    delete existingUser.password;
    return res.status(200).json({ message: "Successfully LogedIn", user: existingUser });
});

const verifyToken = async (req, res, next) => {
    const cookies = req.headers.cookie;
    if (!cookies) {
        return res.status(400).json({ message: "Couldn't find token while verifying" });
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
const getUser = async (req, res) => {
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
        return res.status(400).json({ message: "Couldn't find token while refreshing" });
    }
    const prevToken = cookies.split("=")[1];
    jwt.verify(String(prevToken), process.env.JWT, (err, user) => {
        if (err) {
            return res.status(400).json({ message: "Authentification Failed" });
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";

        const token = jwt.sign({ id: user.id }, process.env.JWT, { expiresIn: "70s" });
        res.cookie(String(user.id), token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 50),
            httpOnly: true,
            sameSite: 'none',
            secure: true
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
const addImages = async (req, res) => {
    const cookies = req.headers.cookie;
    const { myFile } = req.body;

    if (!cookies) {
        return res.status(400).json({ message: "Couldn't find token" });
    }
    const prevToken = cookies.split("=")[1];
    jwt.verify(String(prevToken), process.env.JWT, async (err, user1) => {
        if (err) {
            return res.status(400).json({ message: "Authentification Failed" });
        }
        try {
            await User.updateOne(
                { _id: user1.id },
                { $push: { images: { imgUrl: myFile } } }
            );
        } catch {
            return res.status(400).json({ message: "File Size is too Large" });
        }
        const user = await User.findById(user1.id);
        return res.status(200).json({ message: "Image is added to your Account", user: user });
    });
}
const deleteImages = async (req, res) => {
    const cookies = req.headers.cookie;
    const { imageId } = req.body;
    if (!cookies) {
        return res.status(400).json({ message: "Couldn't find token" });
    }
    const prevToken = cookies.split("=")[1];
    let Id;
    jwt.verify(String(prevToken), process.env.JWT, (err, user) => {
        if (err) {
            return res.status(400).json({ message: "Authentification Failed" });
        } else {
            Id = user.id;
        }
    });
    if (!Id) {
        return res.status(400).json({ message: "Authentification Failed" });
    }
    await User.updateOne(
        { _id: Id },
        { $pull: { images: { _id: imageId } } }
    );
    const U = await User.findOne({ _id: Id });
    return res.status(200).json({ message: "Image is removed from your Account", user: U });
};

export { signup, login, verifyToken, getUser, refreshToken, logout, deleteImages, addImages }