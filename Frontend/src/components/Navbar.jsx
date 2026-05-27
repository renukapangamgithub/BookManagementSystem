import React from "react";
import { FaBookOpen } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="w-full bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-2">
        <FaBookOpen className="text-indigo-600 text-2xl" />
        <h1 className="text-xl font-bold text-gray-800">Book Manager</h1>
      </div>
      <span className="text-sm text-gray-400">Your personal library</span>
    </div>
  );
};

export default Navbar;