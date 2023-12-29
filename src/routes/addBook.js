import express from "express";
import Book from "../models/book.js";

const router = express.Router();

router.use(express.json())
router.post("/", async (req, res) => {
    try {
        // Ensure all required fields are present in the request body
        const requiredFields = ["owner_id", "ISBN", "title", "author", "description", "category", "price", "cover_image", "listed_timestamp"];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({
                    error: `Missing required field: ${field}`
                });
            }
        }

        const {
            owner_id,
            ISBN,
            title,
            author,
            description,
            category,
            price,
            cover_image,
            listed_timestamp
        } = req.body;

        // Create a new book instance
        const newBook = new Book({
            owner_id,
            ISBN,
            title,
            author,
            description,
            category,
            price,
            cover_image,
            listed_timestamp
        });

        // Save the book to the database
        const savedBook = await newBook.save();

        res.status(201).json({
            stat: savedBook
        });
    } catch (error) {
        console.error('Error handling POST request:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;