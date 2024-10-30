const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
require('dotenv').config();
const userRouter = require("./routes/userRoute");
const projectRouter = require("./routes/projectRoute");
const taskRouter = require("./routes/taskRoute");
const teamRouter = require("./routes/teamRoute");

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
app.use("/api/task", taskRouter)
app.use("/api/team", teamRouter)

app.get("/", (req, res) => {
    res.send("API working");
})


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})
