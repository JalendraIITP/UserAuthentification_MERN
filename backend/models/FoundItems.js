import mongoose from "mongoose";
const ItemsSchema = new mongoose.Schema({
    myFile: String
});

export const FoundItems = mongoose.model("FoundItems", ItemsSchema);