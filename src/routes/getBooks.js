import express from "express";
import Book from "../models/book.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        // Use Mongoose aggregate to group books by category
        const result = await Book.aggregate([
            {
                $group: {
                    _id: "$category",
                    books: { $push: "$$ROOT" }
                }
            },
            {
                $project: {
                    category: "$_id",
                    books: 1,
                    _id: 0
                }
            }
        ]);

        // Convert the result to the desired format
        const formattedResult = {};
        result.forEach(item => {
            formattedResult[item.category] = item.books;
        });

        res.json(formattedResult);
    } catch (error) {
        console.error('Error handling GET request:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
