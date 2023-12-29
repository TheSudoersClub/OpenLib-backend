import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    owner_id: String, 
    ISBN: String,
    title: String,
    author: String,
    description: String,
    category: String, 
    price: Number,
    cover_image: String,
    listed_timestamp: String
});
 
const Book = mongoose.model("books", bookSchema);

export default Book;