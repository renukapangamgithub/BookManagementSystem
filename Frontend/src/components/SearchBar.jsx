import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ setSearch }) => {
  return (
    <div className="relative w-full mb-3">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
      <input
        type="text"
        placeholder="Search by title or author..."
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition text-sm"
      />
    </div>
  );
};

export default SearchBar;