import React from "react";
import { FiBookmark, FiChevronDown } from "react-icons/fi";

const GENRES = ["Fiction", "Non-Fiction", "Tech", "Mystery", "Fantasy", "Science Fiction", "Biography", "Self-Help"];

const FilterBar = ({ genre, setGenre }) => {
  return (
    <div className="relative w-full">
      <FiBookmark className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="w-full pl-9 pr-9 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition text-sm text-gray-700 appearance-none cursor-pointer"
      >
        <option value="">All Genres</option>
        {GENRES.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
      <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
    </div>
  );
};

export default FilterBar;