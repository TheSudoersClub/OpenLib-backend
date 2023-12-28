import express from "express";
const app = express();

// route imports
import test from "./routes/test.js"


// routs
app.use("/test", test)


app.listen(3000, () => {
    console.log("Server listening on http://localhost:3000");
});
