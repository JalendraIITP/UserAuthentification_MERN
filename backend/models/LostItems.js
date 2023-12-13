import mongoose from "mongoose";
const ItemsSchema = new mongoose.Schema({
    myFile: String
});

export const LostItems = mongoose.model("LostItems", ItemsSchema);