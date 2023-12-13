import mongoose from "mongoose";
import { config } from 'dotenv'
config({
    path: "data/config.env"
});
export const connectDB = (() => {
    mongoose
        .connect(process.env.MONGODB_URL, {
            dbName: "lost_found_backend",
        })
        .then(() => {
            console.log("Database is Connected");
        })
        .catch((e) => console.log(e));
})