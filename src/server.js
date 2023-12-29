import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;

// connect to database
mongoose.connect("mongodb://localhost:27017/openlib", { useNewUrlParser: true, useUnifiedTopology: true });

// route imports
import test from "./routes/test.js"
import cover from "./routes/cover-image.js"
import addBook from "./routes/add-book.js"


// routs
app.use("/test", test)

app.use("/cover", cover)

app.use("/add-book", addBook)

app.listen(PORT, () => {
    console.log("Server listening on http://localhost:3000");
});
