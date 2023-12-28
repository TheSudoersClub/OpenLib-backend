import express from "express";
import Book from "../models/books.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;