import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    owner_id: String, 
    name: String,
    author: String,
    price: Number,
    category: String, 
    listed_timestamp: String
});
 
const Book = mongoose.model("books", bookSchema);

export default Book;