const express = require("express");
const dotenv = require("dotenv").config();
const colors=require("colors")
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require('./config/db')
const port = process.env.PORT || 8000;


connectDB()


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/users", require("./routes/UserRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
