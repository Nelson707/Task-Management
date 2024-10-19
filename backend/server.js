const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
require('dotenv').config();
const userRouter = require("./routes/userRoute");
const projectRouter = require("./routes/projectRoute");

// app config
const app = express();
const port = 4000;

// middlewares
app.use(cors());
app.use(express.json());

// DB Connection
connectDB();


// API endpoints
app.use("/api/user", userRouter)
app.use("/api/project", projectRouter)

app.get("/", (req, res) => {
    res.send("API working");
})


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})
