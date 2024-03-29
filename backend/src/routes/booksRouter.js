import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { BookSchema } from "../validators/index.js";
import { Book } from "../db/index.js";
import asyncHandler from 'express-async-handler';

const router = Router();

router.use(authMiddleware);

router.post("/publish", asyncHandler(async (req, res) => {
  const validator = BookSchema.safeParse(req.body);

  if (!validator.success) {
    return res.status(400).json(validator.error.flatten());
  }

  const { title, description } = validator.data;

  const newBook = await Book.create({
    title: title,
    description: description,
    createdBy: req.user._id,
  });

  res.status(201).json({
    message: "Book published successfully",
    book: newBook,
  });
}));

router.get("/search", asyncHandler(async (req, res) => {
  const searchQuery = req.query.title;
  const books = await Book.find({
    title: { $regex: new RegExp(searchQuery, "i") },
  }).sort({ createdAt: -1 });

  res.status(200).json({
    books: books,
    searchQuery,
  });
}));

router.put("/unpublish/:bookId", asyncHandler(async (req, res) => {
  const bookId = req.params.bookId;
  const updatedBook = await Book.findByIdAndUpdate(
    bookId,
    { published: false },
    { new: true }
  );

  res.status(200).json({
    message: "Book unpublished successfully",
    book: updatedBook,
  });
}));

router.get("/user", asyncHandler(async (req, res) => {
  const createdBy = req.user._id;
  const userBooks = await Book.find({ createdBy })
    .populate("createdBy", "name")
    .sort({ createdAt: -1 });
  res.status(200).json({
    books: userBooks,
  });
}));

router.get("/published", asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 4;
  const totalBooks = await Book.countDocuments({ published: true });
  const totalPages = Math.ceil(totalBooks / pageSize);
  const skip = (page - 1) * pageSize;

  const publishedBooks = await Book.find({ published: true })
    .populate("createdBy", "name")
    .skip(skip)
    .limit(pageSize)
    .sort({ createdAt: -1 });

  res.status(200).json({
    books: publishedBooks,
    totalPages: totalPages,
    currentPage: page,
  });
}));

export default router;
