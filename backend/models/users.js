import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    imgUrl: {
        type: String,
        required: true,
    }
});
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    images: {
        type: [imageSchema],
    }
});

const User = mongoose.model("User", userSchema);

export { User };
