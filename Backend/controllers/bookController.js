import Book from "../models/Book.js";

export const getAllBooks = async (req, res) => {
  try {

    // Query Params
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;

    // Skip Logic
    const skip = (page - 1) * limit;

    // Fetch Books
    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Total Count
    const totalBooks = await Book.countDocuments();

    res.status(200).json({
      books,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      totalBooks,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, author, genre, year } = req.body;
    if (!title || !author || !genre || !year) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const book = await Book.create({ title, author, genre, year });
    return res.status(201).json(book);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    await book.deleteOne();
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};