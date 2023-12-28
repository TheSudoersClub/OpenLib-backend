import mongoose from "mongoose";

const bookNameSchema = mongoose.Schema({
    name: String
});

const Book = mongoose.model("books", bookNameSchema);

export default Book;