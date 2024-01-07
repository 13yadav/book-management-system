import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { BookSchema } from "../validators/index.js";
import { Book } from "../db/index.js";

const router = Router();

router.use(authMiddleware);

router.post("/publish", async (req, res) => {
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
});

router.get("/search", async (req, res) => {
  const searchQuery = req.query.title;
  const books = await Book.find({ title: { $regex: new RegExp(searchQuery, 'i') } });

  res.status(200).json({
    books: books,
    searchQuery
  });
});

router.put("/unpublish/:bookId", async (req, res) => {
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
});

router.get("/user", async (req, res) => {
  const createdBy = req.user._id;
  const userBooks = await Book.find({ createdBy });
  res.status(200).json({
    books: userBooks,
  });
});

router.get("/published", async (req, res) => {
  const publishedBooks = await Book.find({ published: true });
  res.status(200).json({
    books: publishedBooks,
  });
});

export default router;
