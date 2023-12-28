import express from "express";
import mongoose from "mongoose";

const app = express();

mongoose.connect("mongodb://localhost:27017/openlib");

const bookNameSchema = mongoose.Schema({
    name: String
});

const bookModel = mongoose.model("books", bookNameSchema);

app.get("/test", async (req, res) => {
    try {
        const books = await bookModel.find();
        console.log(books);
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/", async (req, res) => {
    try {
        const books = await bookModel.find({}, { name: 1, _id: 0 }); // Project only the "name" field
        console.log(books);
        res.send("hello world");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


app.listen(3000, () => {
    console.log("Server listening on http://localhost:3000");
});
