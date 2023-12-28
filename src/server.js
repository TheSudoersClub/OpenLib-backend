import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;

// connect to database
mongoose.connect("mongodb://localhost:27017/openlib", { useNewUrlParser: true, useUnifiedTopology: true });

// route imports
import test from "./routes/test.js"


// routs
app.use("/test", test)


app.listen(PORT, () => {
    console.log("Server listening on http://localhost:3000");
});
