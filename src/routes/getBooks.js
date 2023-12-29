import express from "express";
import Book from "../models/book.js";

const router = express.Router();

const allBooks = async () => {
    // Use Mongoose aggregate to group books by category
    const result = await Book.aggregate([{
            $group: {
                _id: "$category",
                books: {
                    $push: "$$ROOT"
                }
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
    await result.forEach(item => {
        formattedResult[item.category] = item.books;
    });

    return formattedResult
}
router.get("/", async (req, res) => {
    try {
        // Determine which query parameter to use ("title" or "isbn")
        const queryParameter = req.query.title ? "title" : req.query.isbn ? "isbn" : null;

        // Check if a valid parameter is provided
        if (!queryParameter) {
            const books = await allBooks()
            res.json(books)
            return;
        }


        // Get the query value
        const queryValue = req.query[queryParameter];

        // Use Mongoose find to filter books based on the specified value
        const books = await Book.find({
            [queryParameter]: queryValue
        });

        res.json({
            queryParameter,
            result: books
        });
    } catch (error) {
        console.error('Error handling GET request:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;