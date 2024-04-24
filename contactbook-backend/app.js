const express = require("express");
const cors = require("cors");
const booksRouter = require("./app/routes/book.route");
const publishersRouter = require("./app/routes/publisher.route");
const staffsRouter = require("./app/routes/staff.route");
const readersRouter = require("./app/routes/reader.route");
const rentsRouter = require("./app/routes/rent.route");
const ApiError = require("./app/api-error");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/books", booksRouter);
app.use("/api/publishers", publishersRouter)
app.use("/api/staffs", staffsRouter)
app.use("/api/readers", readersRouter)
app.use("/api/rents", rentsRouter)

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

app.get("/", (req, res)=> {
    res.json({ message: "Welcome to contact book application."})
});

module.exports = app;