import React, { useState } from "react";
import { useBooks } from "../hooks/useBooks";

import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import BookForm from "../components/BookForm";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Loader from "../components/Loader";
import SuccessModal from "../components/SuccessModal";

import { FiBookOpen } from "react-icons/fi";

const Home = () => {
  const {
    books,
    loading,
    error,
    addBook,
    editBook,
    removeBook,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useBooks();

  const [selectedBook, setSelectedBook] = useState(null);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  // Success Modal State
  const [successType, setSuccessType] = useState(null);

  // Filtered Books
  const filteredBooks = books
    .filter(
      (b) =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((b) => (genre ? b.genre === genre : true));

  // Add / Update Book
  const handleSubmit = (formData) => {
    if (selectedBook) {
      editBook(selectedBook._id, formData, setSuccessType);
    } else {
      addBook(formData, setSuccessType);
    }

    setSelectedBook(null);
  };

  // Delete Book
  const handleDelete = (id) => {
    removeBook(id, setSuccessType);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Global Error */}
        {error && (
          <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl mb-4 border border-red-200">
            ⚠️ {error}
          </div>
        )}

        {/* Book Form */}
        <BookForm
          onSubmit={handleSubmit}
          selectedBook={selectedBook}
          onCancel={() => setSelectedBook(null)}
        />

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1">
            <SearchBar setSearch={setSearch} />
          </div>

          <div className="sm:w-56">
            <FilterBar genre={genre} setGenre={setGenre} />
          </div>
        </div>

        {/* Count */}
        {!loading && (
          <p className="text-sm text-gray-400 mb-4">
            Showing{" "}
            <span className="font-medium text-gray-600">
              {filteredBooks.length}
            </span>{" "}
            book{filteredBooks.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Content */}
        {loading ? (
          <Loader />
        ) : filteredBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <FiBookOpen className="text-5xl mb-3 text-gray-300" />
            <p className="text-sm">
              {search || genre
                ? "No books match your filters"
                : "No books found. Add one above!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBooks.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onEdit={setSelectedBook}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
            {/* Prev */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition
      ${
        currentPage === 1
          ? "bg-gray-100 text-gray-300 cursor-not-allowed"
          : "bg-white border border-gray-200 hover:bg-gray-50"
      }`}
            >
              Prev
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl text-sm font-medium transition
          ${
            currentPage === page
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-white border border-gray-200 hover:bg-gray-50"
          }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Next */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition
      ${
        currentPage === totalPages
          ? "bg-gray-100 text-gray-300 cursor-not-allowed"
          : "bg-white border border-gray-200 hover:bg-gray-50"
      }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Success Modal */}
      <SuccessModal type={successType} onClose={() => setSuccessType(null)} />
    </div>
  );
};

export default Home;
