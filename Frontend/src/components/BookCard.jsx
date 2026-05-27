import React from "react";
import { FiEdit2, FiTrash2, FiCalendar, FiUser, FiTag } from "react-icons/fi";

const GENRE_COLORS = {
  Fiction:            "bg-blue-50 text-blue-600",
  "Non-Fiction":      "bg-green-50 text-green-600",
  Tech:               "bg-purple-50 text-purple-600",
  Mystery:            "bg-yellow-50 text-yellow-600",
  Fantasy:            "bg-pink-50 text-pink-600",
  "Science Fiction":  "bg-cyan-50 text-cyan-600",
  Biography:          "bg-orange-50 text-orange-600",
  "Self-Help":        "bg-teal-50 text-teal-600",
};

const BookCard = ({ book, onEdit, onDelete }) => {
  const badgeClass = GENRE_COLORS[book.genre] || "bg-gray-100 text-gray-600";

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col gap-3">
      {/* Title + Badge */}
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-base font-semibold text-gray-800 leading-snug">{book.title}</h2>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${badgeClass}`}>
          {book.genre}
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1.5 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <FiUser className="text-gray-400 shrink-0" />
          <span>{book.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiTag className="text-gray-400 shrink-0" />
          <span>{book.genre}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiCalendar className="text-gray-400 shrink-0" />
          <span>{book.year}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(book)}
          className="flex items-center gap-1.5 flex-1 justify-center bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-sm font-medium px-3 py-2 rounded-xl transition"
        >
          <FiEdit2 className="text-base" />
          Edit
        </button>
        <button
          onClick={() => onDelete(book._id)}
          className="flex items-center gap-1.5 flex-1 justify-center bg-red-50 hover:bg-red-100 text-red-500 text-sm font-medium px-3 py-2 rounded-xl transition"
        >
          <FiTrash2 className="text-base" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookCard;