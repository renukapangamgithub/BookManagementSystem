import { useEffect, useState } from "react";

import {
  fetchBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../services/bookApi";

export const useBooks = () => {

  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);


  const loadBooks = async () => {

    try {

      setLoading(true);

      const data = await fetchBooks(currentPage);

      setBooks(data.books);

      setTotalPages(data.totalPages);

    } catch (err) {

      setError("Failed to fetch books");

    } finally {

      setLoading(false);
    }
  };

  // LOAD
  useEffect(() => {
    loadBooks();
  }, [currentPage]);

  // ADD BOOK
  const addBook = async (bookData, setSuccessType) => {

    try {

      await createBook(bookData);

      loadBooks();

      setSuccessType("add");

    } catch (err) {

      setError("Failed to add book");
    }
  };

  // UPDATE BOOK
  const editBook = async (id, bookData, setSuccessType) => {

    try {

      await updateBook(id, bookData);

      loadBooks();

      setSuccessType("update");

    } catch (err) {

      setError("Failed to update book");
    }
  };

  // DELETE BOOK
  const removeBook = async (id, setSuccessType) => {

    try {

      await deleteBook(id);

      loadBooks();

      setSuccessType("delete");

    } catch (err) {

      setError("Failed to delete book");
    }
  };

  return {
    books,
    loading,
    error,

    addBook,
    editBook,
    removeBook,

    currentPage,
    setCurrentPage,

    totalPages,
  };
};