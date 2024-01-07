import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import booksRouter from "./routes/booksRouter.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// middlewares
const corsOptions = {origin: process.env.FRONTEND_URL};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
app.use("/api/auth", authRouter);
app.use("/api/books", booksRouter);

// error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
