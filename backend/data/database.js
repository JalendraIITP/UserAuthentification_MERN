import mongoose from "mongoose";
import { config } from 'dotenv'
config({
    path: "data/config.env"
});
export const connectDB = (() => {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("Connected");
    }).catch(console.log("Not Connected"));
})