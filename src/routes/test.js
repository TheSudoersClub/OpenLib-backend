import express from "express"
import mongoose from "mongoose";
const router = express.Router()

mongoose.connect("mongodb://localhost:27017/openlib");

const bookNameSchema = mongoose.Schema({
    name: String
});

const bookModel = mongoose.model("books", bookNameSchema);

router.get("/", async (req, res) => {
    try {
        const books = await bookModel.find();
        console.log(books);
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

export default router